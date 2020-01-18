const fs = require('fs')

const pdf = require('html-pdf')

const inquirer = require('inquirer')

const axios = require('axios')

const gitAPI = "https://api.github.com/users/"

let html = fs.readFileSync('./index.html', 'utf-8')

let options = { format: 'Letter' }

const colors = {

  blue: '#0066ff',

  pink: '#ff66ff',

  green: '#66ff33',

}

const generateHTML = (options) => {

  `

  <!DOCTYPE html>

  <html lang="en" dir="ltr">

    <head>

      <meta charset="utf-8">

      <title></title>

    </head>

    <body>

      <h1>I'm a PDF!</h1>

      <p>username</p>

      <p>${options.login}</p>

      <p>stars</p>

      <p>${options.numStars}</p>

    </body>

  </html>

  `

}

inquirer.prompt([

  {

    'name': 'username',

    'type': 'input',

    'message': 'What is your GitHub user name?'

  },

  {

    'name': 'color',

    'type': 'list',

    'message': "what is your favorite color?",

    'choices': [

      'blue', 'pink', 'green'

    ]

  }

]).then(answers=>{

  axios.get(`${gitAPI}${answers.username}`)

    .then(res => {

      axios.get(`${gitAPI}${answers.username}/starred`).then(

        starRes => {

          let userData = res.data

          userData.numStars = starRes.data.length

          pdf.create(generateHTML(userData), options).toFile('./profile.pdf', function(err, res) {

            if (err) return console.log(err)

            console.log(res)

          })

        }

      )

    })

})