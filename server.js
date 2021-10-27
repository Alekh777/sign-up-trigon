const express = require('express')
const session = require('express-session')
const app = express();
const {db, Users} = require('./db')
const PORT = process.env.PORT || 2424

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'asldfjkl2535jbjh235'
}))

app.use('/public', express.static(__dirname + '/public'));

app.set('view engine', 'hbs')
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (req, res)=>{
    if(!req.session.userId)
        return res.redirect('/signup')
    res.redirect('/profile')
})

app.get('/signup', (req, res)=>{
    if(req.session.userId)
        return res.redirect('/profile')
    res.render('signup.hbs')
})

app.post('/signup', async (req, res)=>{
    const User = await Users.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        contact: req.body.contact
    })

    res.status(201).send(`<div style="height: calc(100vh - 16px); display: flex; justify-content: center; align-item: center; font-size: 30px;">
    <p>User ${req.body.name} created, <a href="/login">login</a> to go to your profile</p>
    </div>`)
})

app.get('/login', (req, res)=>{
    if(!req.session.userId)
        return res.render('login.hbs')
    res.redirect('/profile')
})

app.post('/login', async (req, res)=>{
    const User = await Users.findOne({where: {email: req.body.email}})
    if(!User){
        return res.status(404).render('login.hbs', {error: 'Email is incorrect'})
    }
    
    if(User.password !== req.body.password){
        return res.status(404).render('login.hbs', {error: 'Incorrect password'})
    }

    req.session.userId = User.id;
    res.redirect('/profile')
})

app.get('/profile', async (req, res)=>{
    if(!req.session.userId){
        return res.redirect('/login')
    }
    const User = await Users.findByPk(req.session.userId)
    res.render('profile.hbs', {User})
})

app.get('/logout', (req, res)=>{
    req.session.userId = null
    res.redirect('/login')
})

db.sync()
    .then(()=>{
        app.listen(PORT, ()=>{
            console.log(`Server started at http://localhost:${PORT}`)
        })
    })
    .catch((err)=>{
        console.error(err)
    })