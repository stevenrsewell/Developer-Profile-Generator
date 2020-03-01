const fs = require("fs");
const inquirer = require("inquirer");

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
 
}

function init() {

init();
