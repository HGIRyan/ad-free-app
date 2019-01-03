// REQUIREMENTS
require('dotenv').config()
const express = require('express')
const session = require('express-session')
const bcrypt = require('bcryptjs')
const massive = require('massive')
const axios = require('axios')
const apiTests = require('./controllers/apiTest')

const app = express();
app.use(express.json())
app.use(express.static(__dirname + './../build'))
let { SERVER_PORT, CONNECTION_STRING, SECRET, JWT_1 } = process.env;

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
        req.session.user = { user_id: user.user_id, email: user.user_email, username: user.user_username, autoRenew: user.user_autorenewal, renewalPeriod: user.user_renewalperiod, isDev: user.user_isdev }
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
    // console.log(req.session.user)
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
    // console.log(dev_id)
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
    // console.log({ dev_id, appName, app_description, current_rating, iconImg, img1, img2, img3, img4, img5, img6, tags, appId })
    let createApp = await db.create_app([dev_id, appName, app_description, current_rating, iconImg, img1, img2, img3, img4, img5, img6, tags, appLink, appId])
    let app = createApp[0]
    res.status(200).send({ app, message: 'App Successfully Added' })
})


// ===============================
// ===============================
// Description - 
// Input - appId 1
// Output - resp.data
// Send to Front
// ===============================
// ===============================
app.post('/dev/getapp', (req, res) => {
    let { appId } = req.body
    let db = req.app.get('db')
    // console.log(appId)
    // console.log(JWT_1)
    axios({
        method: 'get',
        url: `https://api.apptweak.com/applications/${appId}.json?country=us&language=us&device=iphone`,
        // JWT is the APPTWEAK Key
        headers: { 'X-Apptweak-Key': JWT_1 }
    }).then(resp => {
        res.status(200).send(resp.data)
        // console.log(resp.data.content)
    })
    // .catch(err => {
    //     res.status(400).send(console.log('ERROR:::',  err.resp.data))}
    // )
})

// app.get('/api/apitest',apiTests.apiTest)









// ===============================
// ===============================
// USER STUFF

app.get('/user/search/:searchchar', async (req, res) => {
    let { searchchar } = req.params
    // console.log(searchchar)
    let db = req.app.get('db')
    let getApp = await db.search_apps([searchchar])
    // console.log(getApp)
    res.status(200).send(getApp)
})

// ===============================
// GET GAMES
// ===============================
// GET NEWAPP1 & NEWAPP2

// NEWAPP1
app.get('/user/games/newapp1/:newapp1', async (req, res) => {
    let { newapp1 } = req.params
    console.log(newapp1);
    // console.log('Payton')
    let db = req.app.get('db')
    let getApp1 = await db.get_newApp([newapp1])
    let getApp = getApp1[0]
    res.status(200).send(getApp)
})
// NEWAPP2

app.get('/user/games/newapp2/:newapp2', async (req, res) => {
    let { newapp2 } = req.params
    // console.log(newapp2);
    let db = req.app.get('db')
    let getApp2 = await db.get_newApp([newapp2])
    let getApp = getApp2[0]
    res.status(200).send(getApp)
})

// NEW UPDATE 1
app.get('/user/games/newupdate1/:newupdate1', async (req, res) => {
    let { newupdate1 } = req.params
    // console.log(newupdate1);
    let db = req.app.get('db')
    let getApp2 = await db.get_newApp([newupdate1])
    let getApp = getApp2[0]
    res.status(200).send(getApp)
})

// NEW UPDATE 2
app.get('/user/games/newupdate2/:newupdate2', async (req, res) => {
    let { newupdate2 } = req.params
    // console.log(newupdate2);
    let db = req.app.get('db')
    let getApp2 = await db.get_newApp([newupdate2])
    let getApp = getApp2[0]
    res.status(200).send(getApp)
})


// Slide 3 Suggested Games

app.get('/user/games/tags/:tags', async (req, res) => {
    let { tags } = req.params;
    // console.log('hslijahdkjweliueb')
    // console.log(tags)
    let db = req.app.get('db');
    let getGame = await db.get_3Game([tags])
    res.status(200).send(getGame)
})




// ===============================
// ===============================
// DEV STUFF



// ===============================
// UPDATE DEV INFO

// USERNAME
app.put('/dev/updateinfo/username', async (req, res) => {
    let { user_id, username } = req.body;
    // console.log(user_id, username)
    let db = req.app.get('db');
    await db.update_userName([user_id, username])
    res.sendStatus(200)
})
// EMAIL
app.put('/dev/updateinfo/email', async (req, res) => {
    let { user_id, email } = req.body;
    // console.log(user_id, email)
    let db = req.app.get('db');
    await db.update_userEmail([user_id, email])
    res.sendStatus(200)
})
// DEV Company Name
app.put('/dev/updateinfo/developer', async (req, res) => {
    let { user_id, developer } = req.body;
    // console.log(user_id, developer)
    let db = req.app.get('db');
    await db.update_devName([user_id, developer])
    res.sendStatus(200)
})




// ===============================
// ===============================
// Increments for Apps
// Expected 
//     Input - app_id
//      Output - none
// HARDCODED DISPLAY APPS
app.post(`/user/view/1`, async (req, res) => {
    let { newapps1 } = req.body
    let db = req.app.get('db')
    // console.log(newapps1)
    await db.incrementView([newapps1])
    res.sendStatus(200)
})
app.post(`/user/view/2`, async (req, res) => {
    let { newapps2 } = req.body
    let db = req.app.get('db')
    // console.log(newapps2)
    await db.incrementView([newapps2])
    res.sendStatus(200)
})
app.post(`/user/view/3`, async (req, res) => {
    let { newupdates1 } = req.body
    let db = req.app.get('db')
    // console.log(newupdates1)
    await db.incrementView([newupdates1])
    res.sendStatus(200)
})
app.post(`/user/view/4`, async (req, res) => {
    let { newupdates2 } = req.body
    let db = req.app.get('db')
    // console.log(newupdates2)
    await db.incrementView([newupdates2])
    res.sendStatus(200)
})
// DOWNLOAD COUNT HARDCODE
app.post(`/user/download/1`, async (req, res) => {
    let { appid } = req.body;
    let db = req.app.get('db');
    // console.log(appid);
    await db.incrementDownload([appid])
    res.sendStatus(200)
})
app.post(`/user/download/2`, async (req, res) => {
    let { appid } = req.body;
    let db = req.app.get('db');
    // console.log(appid);
    await db.incrementDownload([appid])
    res.sendStatus(200)
})
app.post(`/user/download/3`, async (req, res) => {
    let { appid } = req.body;
    let db = req.app.get('db');
    // console.log(appid);
    await db.incrementDownload([appid])
    res.sendStatus(200)
})
app.post(`/user/download/4`, async (req, res) => {
    let { appid } = req.body;
    let db = req.app.get('db');
    // console.log(appid);
    await db.incrementDownload([appid])
    res.sendStatus(200)
})

// NON HARDCODED DOWNLOAD/VIEW COUNTS
// VIEW COUNTER
// Expected
// Input - appid
// Output - none

// VIEW COUNT
app.post(`/user/view/dynamic`, async (req, res) => {
    let { appid } = req.body;
    let db = req.app.get('db');
    console.log(req.body)
    await db.incrementView([appid])
    res.sendStatus(200)
})
// DOWNLOADCOUNT
app.post(`/user/download/dynamic`, async (req, res) => {
    let { appid } = req.body;
    let db = req.app.get('db');
    // console.log(req.body)
    await db.incrementDownload([appid])
    console.log('Download Increment')
    res.sendStatus(200)
})
