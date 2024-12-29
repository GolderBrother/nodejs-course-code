import { select, input, confirm } from '@inquirer/prompts';
import { NpmPackage } from '@james-cli/utils';
import ora from 'ora';
import path from 'node:path';
import os from 'node:os';
import fse from 'fs-extra';
import glob from 'glob';
import ejs from 'ejs';
function sleep(timeout: number) {
    return new Promise((resolve => {
        setTimeout(resolve, timeout);
    }));
}
async function create() {
    // console.log('create 命令执行中...')  
    
    const projectTemplate = await select({
        message: '请选择项目模版',
        choices: [
          {
            name: 'react 项目',
            value: '@james-cli/template-react-ts'
          },
          {
            name: 'vue 项目',
            value: '@james-cli/template-vue-ts'
          }
        ],
    });

    // 为保证 projectName 不能为空，用 while 循环来问
    let projectName = '';
    while(!projectName) {
        projectName = await input({
            message: '请输入项目名称',
            default: 'my-project'
        })
    }
    const targetPath = path.join(process.cwd(), projectName);
    console.log(`fse.existsSync(targetPath)`, fse.existsSync(targetPath))
    if (fse.existsSync(targetPath)) {
        const empty = await confirm({
            message: '该目录不为空，是否清空?',
        });
        if (empty) {
            fse.emptyDirSync(targetPath);
        } else {
            console.log('取消创建项目');
            process.exit(0);
        }
    }
    console.log('projectTemplate', projectTemplate);
    console.log('projectName', projectName);

    const files = await glob('**', {
        cwd: targetPath,
        nodir: true,
        ignore: 'node_modules/**'
    })
    for (const file of files) {
        const filePath = path.join(targetPath, file);
        const renderResult = await ejs.renderFile(filePath, {
            projectName
        })
        fse.writeFileSync(filePath, renderResult);
    }

    const pkg = new NpmPackage({
        name: projectTemplate,
        targetPath: path.join(os.homedir(), '.james-cli-template')
    });

    // 如果这个包安装过，就 update 更新版本，否则 install 安装这个版本。
    if(await pkg.exists()) {
        const spinner = ora('更新模版中...').start();
        await pkg.update();
        await sleep(1000);
        spinner.stop();
    } else {
        const spinner = ora('下载模版中...').start();
        await pkg.install();
        await sleep(1000);
        spinner.stop();
    }
    // TODO 看到这里：然后我们把下载好的模版复制到目标目录：——12-22
    // http://116.198.230.195/book/671a06ce86f18b36b75f0d91

    const spinner = ora('创建项目中...').start();
    // await sleep(1000);
    const templatePath = path.join(pkg.npmFilePath, 'template');
    // const res = await import(path.join(templatePath, 'index.js'));
    // await res.default(projectName);
    // 如果该目录不为空，询问是否清空
   
    fse.copySync(templatePath, targetPath);
    spinner.stop();


}

create();

export default create;
