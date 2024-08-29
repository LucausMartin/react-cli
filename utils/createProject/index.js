const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const { RESPOSITORY_MAP, STR_CONCAT_ORDER, STR_CONCAT_ORDER_MAP, PWD } = require('../../constants');
const gitClone = require('git-clone');

/**
 * @description 创建项目前的校验
 * @param {AppName, React-Router, TypeScript, Redux, Less, Commitlint, Login-Module} options 
 * @returns 
 */
const beforeCreateProject = (options, type) => {
  // 判断本地目录是否存在即将创建的项目名称
  if (fs.existsSync(path.join(PWD, options.AppName))) {
    console.log(chalk.redBright('\n'+ 'The project already exists!'));
    return false;
  }

  if (type === 'web') {
    // 因为项目登录模块依赖于redux，所以如果选择了登录模块，但是没有选择redux，则需要提示用户
    if (options['Login-Module'] && !options['Redux']) {
      console.log(chalk.redBright('The login module depends on redux, please select redux!'));
      return false;
    }
  }


  // 根据字符串拼接数组循环拼接字符串
  let repository = '';
  STR_CONCAT_ORDER.forEach((item) => {
    if (options[item]) {
      repository += STR_CONCAT_ORDER_MAP[item]
    }
  });

  if (type === 'web') {
    repository = 'web' + repository;
  }
  if (type === 'server') {
    repository = 'server' + repository;
  }

  // 判断是否存在该项目模板
  if (!RESPOSITORY_MAP.hasOwnProperty(repository)) {
    console.log(chalk.yellowBright('Sorry, the project template does not exist.\n' + 'We are working hard to add more templates.'));
    return false;
  }

  return RESPOSITORY_MAP[repository];
}

/**
 * @description 创建项目
 * @param {AppName, React-Router, TypeScript, Redux, Less, Commitlint, Login-Module} options
 * @returns {boolean}
 */
const createProject = async (options, type) => {
  // 校验并获取仓库地址
  const respository = beforeCreateProject(options, type);

  // 如果校验失败，则返回false
  if (!respository) {
    return false;
  }

  try {
    await new Promise((resolve, reject) => {
      // 克隆模板
      gitClone(respository, path.join(PWD, options.AppName), {checkout: 'master'}, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    )});

    // 删除.git文件防止修改模板仓库
    fs.remove(path.join(PWD, options.AppName, '.git'));

    // 修改package.json中的name
    const packageJsonPath = path.join(PWD, options.AppName, 'package.json');
    const packageJson = require(packageJsonPath);
    packageJson.name = options.AppName;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    return true;
  } catch (error) {
    // 克隆失败，删除已经创建的目录
    fs.remove(path.join(PWD, options.AppName));

    console.log(chalk.redBright('Failed to clone repo ' + respository + ': ' + error.message.trim()));

    return false;
  }

}

exports.createProject = createProject;