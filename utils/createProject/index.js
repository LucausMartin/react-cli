const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { RESPOSITORY_MAP, STR_CONCAT_ORDER, STR_CONCAT_ORDER_MAP } = require('../../constants');

// 创建项目前的校验
const beforeCreateProject = (options) => {
  console.log('createProject', options);
  const PWD = process.cwd();
  // 判断本地目录是否存在即将创建的项目名称
  if (fs.existsSync(path.join(PWD, options.AppName))) {
    console.log(chalk.redBright('The project already exists!'));
    return false;
  }

  // 因为项目登录模块依赖于redux，所以如果选择了登录模块，但是没有选择redux，则需要提示用户
  if (options['Login-Module'] && !options['Redux']) {
    console.log(chalk.redBright('The login module depends on redux, please select redux!'));
    return false;
  }

  // 根据字符串拼接数组循环拼接字符串
  let repository = '';
  STR_CONCAT_ORDER.forEach((item) => {
    if (options[item]) {
      repository += STR_CONCAT_ORDER_MAP[item]
    }
  });
  console.log('repository', repository);

  // 判断是否存在该项目模板
  if (!RESPOSITORY_MAP.hasOwnProperty(repository)) {
    console.log(chalk.yellowBright('Sorry, the project template does not exist.\n' + 'We are working hard to add more templates.'));
    return false;
  }

  return RESPOSITORY_MAP[repository];
}

// 创建项目
const createProject = (options) => {
  if (!beforeCreateProject(options)) {
    return false;
  }

  // 创建项目
  console.log('create project');
  return true;
}

exports.createProject = createProject;