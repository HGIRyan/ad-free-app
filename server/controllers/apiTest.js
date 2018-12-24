const axios = require('axios')

module.exports = {

    apiTest: (req,res,next)=>{
        console.log('running apitest')
        axios({
            method: 'get',
            url: `https://api.apptweak.com/applications/529479190.json?country=us&language=us&device=iphone`,
            headers: { 'X-Apptweak-Key': 'KEY' }
        }).then(response => {
            res.status(200).send(response.data)
        })
        .catch(err => {
            res.status(400).send(console.log('ERROR:::',err))}
        )
    }
}

