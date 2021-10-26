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
    res.render('signup.hbs')
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