import { select, input, confirm } from '@inquirer/prompts';
import { NpmPackage } from '@james-cli/utils';
import ora from 'ora';
import path from 'node:path';
import os from 'node:os';
import fse from 'fs-extra';
import { glob } from 'glob';
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
    // 复制文件
    fse.copySync(templatePath, targetPath);

    // delete
    spinner.stop();
    // const res = await import(path.join(templatePath, 'index.js'));
    // await res.default(projectName);
    // 如果该目录不为空，询问是否清空
   
    const renderData: Record<string, any> = { projectName };
    const deleteFiles: string[] = [];
    // 读取 questions.json，根据询问结果来设置 renderData 和 deleteFiles。
    const questionConfigPath = path.join(pkg.npmFilePath, 'questions.json');

    if (fse.existsSync(questionConfigPath)) {
        const questionConfig = fse.readJSONSync(questionConfigPath);
        for (const key in questionConfig) {
            const question = questionConfig[key];
            const res = await confirm({
                message: '是否启用 ' + key,
            })
            renderData[key] = res;  
            if (!res) {
                deleteFiles.push(...question.files);
            } 
        }
    }

    const files = await glob('**', {
        cwd: targetPath,
        nodir: true,
        ignore: 'node_modules/**'
    })
    for (const file of files) {
        const filePath = path.join(targetPath, file);
        const renderResult = await ejs.renderFile(filePath, {
            projectName,
            // 用这些数据渲染
            ...renderData
        })
        fse.writeFileSync(filePath, renderResult);
    }

    // 如果没开启eslint的话，就删除对应的文件
    deleteFiles.forEach(deleteFile => {
        fse.removeSync(path.join(targetPath, deleteFile));
    })
    console.log(`【${projectName}】项目创建成功: ${targetPath}`);
}

// create();

export default create;
