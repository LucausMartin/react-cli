const { program } = require('commander');
const chalk = require('chalk');
const { getVersion, createProject } = require('./utils');
const inquirer = require('inquirer');
const ora = require('ora');

program.name('lucaus-react-cli').usage('<command> [options]');

program.option('-v, --version', 'output the version number', getVersion)

const spinner = ora('creating project...')

program
      .command('create')
      .description('create a new React project')
      .action((appName) => {
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'AppName',
              message: 'Enter the name of your React project:',
              default: 'my-react-app'
            },
            {
              type: 'confirm',
              name: 'React-Router',
              message: 'Do you want to use React Router?',
              default: true
            },
            {
              type: 'confirm',
              name: 'TypeScript',
              message: 'Do you want to use TypeScript?',
              default: true
            },
            {
              type: 'confirm',
              name: 'Redux',
              message: 'Do you want to use Redux?',
              default: true
            },
            {
              type: 'confirm',
              name: 'Less',
              message: 'Do you want to use Less?',
              default: true
            },
            {
              type: 'confirm',
              name: 'Commitlint',
              message: 'Do you want to use Commitlint?',
              default: true
            },
            {
              type: 'confirm',
              name: 'Login-Module',
              message: 'Do you want to add Login-module?',
              default: true
            },
          ])
          .then((answers) => {
            const createRes = createProject(answers);
            if (!createRes) {
              console.log(chalk.redBright('Create failed'));
            }
            // spinner.start();
            // setTimeout(() => {
            //   spinner.succeed('React project created successfully!');
            //   spinner.fail('Create failed');
            // }, 2000);
          })
          .catch((error) => {
            console.log(error);
            console.log(chalk.redBright('Creating a new React fail'));
          });
      });
 
program.parse(process.argv);