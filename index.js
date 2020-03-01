const fs = require("fs");
const inquirer = require("inquirer");
const path = require("path");
const open = require("open");
const convertFactory = require("electron-html-to");
const api = require("./api");
const generateHTML = require("./generateHTML");

const questions = [
    {
        type: "input", name: "github", message: "What is your GitHub username?"
    },
    
    {
        type: "list", name: "color", message: "What is your favorite color?", 
        choices: ["Green", "Blue", "Pink", "Red"]
    }
];

function writeToFile(fileName, data) {
    return fs.writeFileSync(path.join(process.cwd(), fileName), data);
}

function init() {
    inquirer.prompt(questions).then(({ github, color }) => {
    console.log("Displaying...");

    api
    .getUsername(github)
    .then(response =>
        api.getStars(github).then(stars => {
            console.log(response.data)
            return generateHTML({
                stars,
                color,
                ...response.data
            });
        })
    )
init();
