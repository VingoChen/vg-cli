import fs from 'fs';
import symbol from 'log-symbols';
import chalk from 'chalk';
import inquirer from 'inquirer';
import downloadGit from 'download-git-repo';
import ora from 'ora';

const util = require('util');
const exec = util.promisify(require('child_process').exec);

// 文件是否存在
const notExistFold = async (name) => {
  return new Promise((resolve) => {
    if (fs.existsSync(name)) {
      console.log(
        symbol.error,
        chalk.red('文件夹名已被占用，请更换名字重新创建'),
      );
    } else {
      resolve();
    }
  });
};

// 询问用户
const promptList = [
  {
    type: 'input',
    name: 'description',
    message: 'Please enter the project description: ',
  },
  {
    type: 'input',
    name: 'author',
    message: 'Please enter the author name: ',
  },
];

const prompt = () => {
  return new Promise((resolve) => {
    inquirer.prompt(promptList).then((answer) => {
      resolve(answer);
    });
  });
};

// 项目模板远程下载
const downloadTemplate = async (ProjectName, api) => {
  return new Promise((resolve, reject) => {
    downloadGit(api, ProjectName, { clone: true }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

// 更新json配置文件
const updateJsonFile = (fileName, obj) => {
  return new Promise((resolve) => {
    if (fs.existsSync(fileName)) {
      const data = fs.readFileSync(fileName).toString();
      let json = JSON.parse(data);
      Object.keys(obj).forEach((key) => {
        json[key] = obj[key];
      });
      fs.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');
      resolve();
    }
  });
};

// 命令行命令执行
const loadCmd = (cmd, text) => {
  let loading = ora();
  loading.start(`excute ${text} ....`);
  return exec(cmd).then(() => {
    loading.succeed(`${text} success`);
  });
};

module.exports = {
  notExistFold,
  prompt,
  downloadTemplate,
  updateJsonFile,
  loadCmd,
};
