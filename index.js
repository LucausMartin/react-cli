const { program } = require('commander');
const chalk = require('chalk');
const { getVersion, createProject } = require('./utils');
const inquirer = require('inquirer');
const ora = require('ora');

// 设置命令行工具的名称和用法
program.name('lucaus-react-cli').usage('<command> [options]');

// 设置版本号
program.option('-v, --version', 'output the version number', getVersion);

// 设置 Loading 内容
const spinner = ora('creating project...' + '\n');

// 设置 create 命令的执行
program
      .command('create')
      .description('create a new React project\n    -w, --web: create a web project\n    -s, --server: create a server project\n')
      .option('-w, --web', 'create a web project')
      .option('-s, --server', 'create a server project')
      .action((cmd) => {
        console.log(cmd);
        // 只能选择一个参数
        if (cmd.web && cmd.server) {
          console.error(chalk.redBright('Error: You can only use one of the options -w or -s, not both.'));
          process.exit(1); // 退出程序，状态码 1 表示错误
        }
        if (cmd.web) {
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
            .then(async (answers) => {
              // 开始 loading
              console.log('\n');
              spinner.start();
  
              // 获取创建结果
              const createRes = await createProject(answers, 'web');
  
              if (!createRes) {
                // 失败提示
                console.log('\n');
                console.log('\n');
                spinner.fail(' ' + 'Create failed');  
                return;
              } else {
                // 成功提示
                console.log('\n');
                console.log('\n');
                spinner.succeed(' ' + 'React project created successfully!');
                // 提示用户下一步操作
                console.log('\n');
                console.log(chalk.greenBright(`cd ${answers.AppName}`));
                console.log(chalk.greenBright('pnpm install'));
                console.log(chalk.greenBright('pnpm dev'));
                console.log('\n');
              }
            })
            .catch((error) => {
              // 错误提示
              console.log('\n');
              console.log('\n');
              console.log(chalk.redBright('Creating a new React fail\n'));
              console.log( chalk.redBright('The reason is: '), error);
            });
        }
        if (cmd.server) {
          inquirer
            .prompt([
              {
                type: 'input',
                name: 'AppName',
                message: 'Enter the name of your Nest project:',
                default: 'my-nest-server'
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
            .then(async (answers) => {
              // 开始 loading
              console.log('\n');
              spinner.start();
  
              // 获取创建结果
              const createRes = await createProject(answers, 'server');
  
              if (!createRes) {
                // 失败提示
                console.log('\n');
                console.log('\n');
                spinner.fail(' ' + 'Create failed');  
                return;
              } else {
                // 成功提示
                console.log('\n');
                console.log('\n');
                spinner.succeed(' ' + 'React project created successfully!');
                // 提示用户下一步操作
                console.log('\n');
                console.log(chalk.greenBright(`cd ${answers.AppName}`));
                console.log(chalk.greenBright('pnpm install'));
                console.log(chalk.greenBright('pnpm dev'));
                console.log('\n');
              }
            })
            .catch((error) => {
              // 错误提示
              console.log('\n');
              console.log('\n');
              console.log(chalk.redBright('Creating a new React fail\n'));
              console.log( chalk.redBright('The reason is: '), error);
            });
        }
      });

// 解析命令行参数
program.parse(process.argv);