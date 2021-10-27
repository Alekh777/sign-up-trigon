# Sign Up and Login Page
A User authentication website. To try it, visit [Sign Up | Login Website](https://signup-user-auth.herokuapp.com/signup). It has following features:
 - Stores the user data in MySQL database using sequelize as ORM. (Sqlite for Heroku deployment)
 - The login information is stored in client's browser as cookies so client doesn't need to login again after closing the tab/window.
 - Only the id of the user is stored on client's browser, no passwords or username is stored (for security reasons).
 - It also features animated SVG.

## Packages required
```shell
npm i express mysql2 sequelize express-session hbs sqlite3
```

## Technologies used
 - Node.js
 - Express.js
 - MySQL (Database)
 - Sequelize (ORM)
 - Express Session (for Cookies)
 - Handlebars (hbs, template engine)

## Database Setup
```shell
mysql -u root -p
```
```shell
create database user_auth;

create user myuser identified with mysql_native_password by 'mypass';

grant all privileges on user_auth.* to myuser;

flush privileges;
```

## Folder Structure
### Frontend
```shell
public
├───css                             # CSS files for frontend
│   ├───profile.css
│   └───signup-login-style.css
│
├───img                             # Folder to store images
│   ├───logo.svg
│   └───signup.svg
│
└───js                              # JS files for frontend
```
### Backend
```shell
sign-up-trigon
├───server.js                       # server.js file to serve the files/folders
│
├───db.js                           # Contains model of the database
│
└───views                           # Handlebars files for different pages
    ├───login.hbs
    ├───profile.hbs
    └───signup.hbs
```