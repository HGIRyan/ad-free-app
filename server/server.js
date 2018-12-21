// REQUIREMENTS
require('dotenv').config()
const express = require('express')
const session = require('express-session')
const bcrypt = require('bcryptjs')
const massive = require('massive')
const axios = require('axios')

const app = express();
app.use(express.json())
app.use(express.static(__dirname + './../build'))
let { SERVER_PORT, CONNECTION_STRING, SECRET, DEV, JWT_1 } = process.env;

// SETUP
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}))

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    // LISTEN
    app.listen(SERVER_PORT, () => {
        console.log(`Listening on port: ${SERVER_PORT}`)
    })
})

// ============================================================================================
// ============================================================================================

// SIGNUP OR REGISTER
app.post('/auth/register', async (req, res) => {
    let { email, username, password, autoRenew, renewalPeriod, isDev, developer } = req.body;
    // console.log(email, username, password, autoRenew, renewalPeriod, isDev, developer)
    let db = req.app.get('db')
    let userFound = await db.check_user([email, username])
    if (userFound[0]) {
        return res.status(200).send({ loggedIn: false, message: 'Email or UserName Already Exists' })
    }
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt)
    // CREATING USER ACCOUNT
    let createdUser = await db.create_user([username, email, hash, autoRenew, renewalPeriod, isDev])
    let user = createdUser[0]
    // console.log('User', user)
    // CREATING DEV  
    if (isDev) {
        let createdDev = await db.create_dev([developer, user.user_id])
        // console.log(createdDev)
        let dev = createdDev[0]
        req.session.dev = { developer: dev.developer_name, dev_details: dev.developer_details, dev_id: dev.developer_id }
        // console.log('Dev', dev)

    }
    req.session.user = { id: user.user_id, email: user.user_email, username: user.user_username, autoRenew: user.user_autorenewal, renewalPeriod: user.user_renewalperiod, isDev: user.user_isdev }
    // console.log(req.session.user)
    // console.log(req.session.dev)
    let sessionUser = req.session.user
    let sessionDev = req.session.dev
    // console.log(isDev)
    res.status(200).send({ loggedIn: true, message: 'Login Successful', sessionUser, sessionDev, userFound })

})




// LOGIN
app.post('/auth/login', async (req, res) => {
    let { username, password } = req.body;
    let db = req.app.get('db');
    let userFound = await db.check_login_user([username]);
    if (!userFound[0]) {
        return res.status(200).send({ loggedIn: false, message: 'Username Doesnt Exist, Create New Account' });
    }
    let result = bcrypt.compareSync(password, userFound[0].user_hash_value)
    if (result) {
        // USERINFO
        let userInfo = await db.get_user_info([username])
        let user = userInfo[0]
        // console.log(user.user_isdev)
        req.session.user = { id: user.user_id, email: user.user_email, username: user.user_username, autoRenew: user.user_autorenewal, renewalPeriod: user.user_renewalperiod, isDev: user.user_isdev }
        if (user.user_isdev === true) {
            // console.log('Got Here')
            let devInfo = await db.check_dev([user.user_id])
            let dev = devInfo[0]
            // console.log(dev)
            req.session.dev = { developer: dev.developer_name, dev_details: dev.developer_details, dev_id: dev.developer_id }
        }
        let sessionUser = req.session.user
        let sessionDev = req.session.dev
        // console.log(sessionUser)
        // console.log(sessionDev)
        return res.status(200).send({ loggedIn: true, message: 'Login Successful', sessionUser, sessionDev, userFound })
    } else {
        return res.status(401).send({ message: 'Incorrect Password', loggedIn: false })
    }
}
)




app.get('/api/user-data', (req, res) => {
    if (req.session.user) {
        res.status(200).send(req.session.user)
    } else {
        res.status(401).send('Please Log In To View Account Info')
    }
})
app.get('/api/dev-data', (req, res) => {
    if (req.session.user) {
        let sessionUser = req.session.user
        let sessionDev = req.session.dev
        res.status(200).send({ sessionUser, sessionDev })
    } else {
        res.status(401).send('Please Log In To View Account Info')
    }
})

// LOGOUT
app.get('/logout', (req, res) => {
    console.log('Logged Out')
    req.session.destroy();
    res.redirect('http://localhost:3410/')
})


// ============================================================================================
// ============================================================================================
// Getting Dev Apps
app.get('/dev/get-devapps/:dev_id', async (req, res) => {
    let { dev_id } = req.params
    console.log(dev_id)
    let db = req.app.get('db')
    let getDevApp = await db.get_devapps([dev_id])
    // console.log(getDevApp)
    // let DevApp = getDevApp[0]
    res.status(200).send(getDevApp)
})







// ============================================================================================
// ADD AN APP MANUALLY
app.post('/dev/addapp', async (req, res) => {
    let { dev_id, appName, app_description, current_rating, iconImg, img1, img2, img3, img4, img5, img6, tags, appId, appLink } = req.body
    let db = req.app.get('db')
    console.log({ dev_id, appName, app_description, current_rating, iconImg, img1, img2, img3, img4, img5, img6, tags, appId })
    let createApp = await db.create_app([dev_id, appName, app_description, current_rating, iconImg, img1, img2, img3, img4, img5, img6, tags, appLink, appId])
    let app = createApp[0]
    res.status(200).send({ app, message: 'App Successfully Added' })
})


// ===============================
// ===============================
// GET FROM API
// ===============================
// ===============================
app.post('/dev/getapp', (req, res) => {
    let { appId } = req.body
    let db = req.app.get('db')
    console.log(appId)
    console.log(JWT_1)
    axios({
        method: 'get',
        url: `https://api.apptweak.com/ios/applications/${appId}.json`,
        headers: { 'X-Apptweak-Key': JWT_1 }
    }).then(response => {
        res.status(200).send(response.data, console.log(resp.data))
    })
})
