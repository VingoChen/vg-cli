import symbol from 'log-symbols';
import chalk from 'chalk';
import ora from 'ora';
import {
  notExistFold,
  prompt,
  downloadTemplate,
  updateJsonFile,
  loadCmd,
} from './util';
const API =
  'direct:http://gitlab.prod.dtstack.cn/zhishui/easy-cli-template.git';

const create = async (ProjectName) => {
  // 项目名不能为空
  if (ProjectName === undefined) {
    console.log(symbol.error, chalk.red('创建项目的时候，请输入项目名'));
  } else {
    // 如果文件名不存在则继续执行,否则退出
    notExistFold(ProjectName).then(() => {
      // 用户询问交互

      prompt().then((answer) => {
        const loading = ora('template loading...');
        loading.start('template loading...');
        downloadTemplate(ProjectName, API).then(
          () => {
            loading.succeed('template load success');
            // 下载完成后,根据用户输入更新配置文件
            const fileName = `${ProjectName}/package.json`;
            answer.name = ProjectName;
            updateJsonFile(fileName, answer).then(async () => {
              console.log(symbol.success, 'package.json update success');
              await loadCmd(
                `cd ${ProjectName} && npm install`,
                'download dependencies',
              );
              console.log('\r');
              console.log(
                chalk.green(`cd ${ProjectName} && npm run start to run`),
              );
            });
          },
          () => {
            loading.fail('template load faild');
          },
        );
      });
    });
  }
};

module.exports = create;
