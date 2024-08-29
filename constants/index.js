// 仓库对照表
const RESPOSITORY_MAP = {
  'webroutertsreduxlesscommitlint': 'https://github.com/LucausMartin/react-temlate-basic.git',
  'webroutertsreduxlesscommitlintlogin': 'https://github.com/LucausMartin/react-temlate-with-login.git',
  'servercommitlintlogin': 'https://github.com/LucausMartin/react-temlate-with-login-server.git',
}

// 字符串拼接顺序数组
const STR_CONCAT_ORDER = [
  'React-Router',
  'TypeScript',
  'Redux',
  'Less',
  'Commitlint',
  'Login-Module',
]

// 字符串拼接顺序对照表
const STR_CONCAT_ORDER_MAP = {
  'React-Router': 'router',
  'TypeScript': 'ts',
  'Redux': 'redux',
  'Less': 'less',
  'Commitlint': 'commitlint',
  'Login-Module': 'login',
}

const PWD = process.cwd();

exports.RESPOSITORY_MAP = RESPOSITORY_MAP;
exports.STR_CONCAT_ORDER = STR_CONCAT_ORDER;
exports.STR_CONCAT_ORDER_MAP = STR_CONCAT_ORDER_MAP;
exports.PWD = PWD;