const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const DIST_DIR = path.resolve(__dirname, "dist");
const distPath = path.join(DIST_DIR, "team.html");

const render = require("./src/page-template.js");

const teamMembers = [];

// This array will be used to check the potential duplicate id newly entered by user
const idArray = [];

// Inform user of usage
console.log(
  "\nWelcome to the team generator!\nUse `npm run reset` to reset the dist/ folder\n"
);

const isAnswerProvided = (answer) => {
  if (answer !== "") {
    return true;
  }
  return "Please enter at least one character.";
};

function appMenu() {
 
  function createManager() {
    console.log("Please build your team 👥");
    inquirer
      .prompt([
        {
          type: "input",
          name: "managerName",
          message: "What is the team manager's name?",
          validate: isAnswerProvided,
        },

        {
          type: "input",
          name: "managerID",
          message: `What is the team manager's id.`,
          validate: isAnswerProvided,
        },
        {
          type: "input",
          name: "managerEmail",
          message: `what is the manager's email.`,
          validate: isAnswerProvided,
        },
        {
          type: "input",
          name: "managerOfficeNumber",
          message: `what is the manager's office number`,
          validate: isAnswerProvided
        }
      ])

      .then((answers) => {
        const manager = new Manager(
          answers.managerName,
          answers.managerId,
          answers.managerEmail,
          answers.managerOfficeNumber
        );
        teamMembers.push(manager);
        idArray.push(answers.managerId);
        createTeam();
      });
  }

  function createTeam() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "memberChoice",
          message: "Which type of team member would you like to add?",
          choices: [
            "Engineer",
            "Intern",
            "I don't want to add any more team members",
          ],
        },
      ])
      .then((userChoice) => {
        switch (userChoice.memberChoice) {
          case "Engineer":
            addEngineer();
            break;
          case "Intern":
            addIntern();
            break;
          default:
            buildTeam();
        }
      });
  }

  function addEngineer() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "engineerName",
          message: "What is the team engineer's name?",
          validate: isAnswerProvided,
        },

        {
          type: "input",
          name: "engineerID",
          message: `What is the team engineer's id.`,
          validate: isAnswerProvided,
        },
        {
          type: "input",
          name: "engineerEmail",
          message: `what is the engineer's email.`,
          validate: isAnswerProvided,
        },
        {
          type: "input",
          name: "engineerGithub",
          message: `what is the engineer's GitHub username`,
          validate: isAnswerProvided
        }
      ])
      .then((answers) => {
        const engineer = new Engineer(
          answers.engineerName,
          answers.engineerId,
          answers.engineerEmail,
          answers.engineerGithub
        );
        teamMembers.push(engineer);
        idArray.push(answers.engineerId);
        createTeam();
      });
  }

  function addIntern() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "internName",
          message: "What is the team intern's name?",
          validate: isAnswerProvided,
        },

        {
          type: "input",
          name: "internID",
          message: `What is the team intern's id.`,
          validate: isAnswerProvided,
        },
        {
          type: "input",
          name: "internEmail",
          message: `what is the intern's email.`,
          validate: isAnswerProvided,
        },
        {
          type: "input",
          name: "internSchool",
          message: `what is the intern's school`,
          validate: isAnswerProvided
        }
      ])
      .then((answers) => {
        const intern = new Intern(
          answers.internName,
          answers.internId,
          answers.internEmail,
          answers.internSchool
        );
        teamMembers.push(intern);
        idArray.push(answers.internId);
        createTeam();
      });
      
  }

  function buildTeam() {
    // Creates the output directory if the dist path doesn't exist
    if (!fs.existsSync(DIST_DIR)) {
      fs.mkdirSync(DIST_DIR);
    }
    fs.writeFileSync(distPath, render(teamMembers), "utf-8");
  }

  createManager();
}

appMenu();
