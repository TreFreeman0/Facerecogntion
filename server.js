const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')
// const { response } = require('express')

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client:'pg',
    connection: {
        host: '127.0.0.1',
        user: 'trevonfreeman',
        password: '',
        database: 'face-recogintion',

    }
});

 db.select('*').from('users').then(data => {
    console.log(data);
 })

const app = express();


app.use(bodyParser.json());
app.use(cors())


const database = {
    users:[
        {
            id: "123",
            name:'Tre',
            email: 'tretre@gmail.com',
            password: 'mma',
            entries: 0,
            joined: new Date().toDateString
        },
        {
            id: "124",
            name:'Anne',
            email: 'anne@gmail.com',
            password: 'bon',
            entries: 0,
            joined: new Date().toDateString
        }
    ],
    login: [
        {
            id:'987',
            hash:'',
            email:'joesands@gmail.com'
        }
    ]
}

app.get('/',(req,res) => {res.send(database.users)})

app.post('/signin',  signin.handleSignin(db,bcrypt))

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req,res) => {profile.handleProfileGet(req,res,db)} )

app.put('/image', (req,res) => {image.handleImage(req,res,db)})
app.post('/imageurl', (req,res) => {image.handleAPIcall(req,res)})

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
//   });
  
  // Load hash from your password DB.
//   bcrypt.compare("bacon", hash, function(err, res) {
//       // res == true
//   });
//   bcrypt.compare("veggies", hash, function(err, res) {
//       // res = false
//   });

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port 3000 ${process.env.PORT}`)
})


/*
/ -->res = this is working 
/signIn --> Post = success/fail
/register --> Post = user
/profile/:userId --> Get = user
/image --> Put --> user


*/