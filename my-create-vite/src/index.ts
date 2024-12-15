import minimist from "minimist";
import chalk from 'chalk'
import prompts from "prompts";
import fs from 'node:fs'
import path from "node:path";
import { fileURLToPath } from "node:url";

const argv = minimist<{
    template?: string;
    help?: boolean;
}>(process.argv.slice(2), {
    alias: { h: "help", t: "template" },
    string: ["_"]
});
const cwd = process.cwd()
const helpMessage = `\
Usage: create-vite [OPTION]... [DIRECTORY]

Create a new Vite project in JavaScript or TypeScript.
With no arguments, start the CLI in interactive mode.

Options:
  -t, --template NAME        use a specific template

Available templates:
${chalk.yellow('vanilla-ts     vanilla')}
${chalk.green('vue-ts         vue')}
${chalk.cyan('react-ts       react')}
${chalk.cyan('react-swc-ts   react-swc')}
${chalk.magenta('preact-ts      preact')}
${chalk.redBright('lit-ts         lit')}
${chalk.red('svelte-ts      svelte')}
${chalk.blue('solid-ts       solid')}
${chalk.blueBright('qwik-ts        qwik')}`

type ColorFunc = (str: string | number) => string
type Framework = {
    name: string
    display: string
    color: ColorFunc
    /** variants 数组里就是这个 framework 对应的那个数组 */
    variants: FrameworkVariant[]
}
type FrameworkVariant = {
    name: string
    display: string
    color: ColorFunc
    customCommand?: string
}

const FRAMEWORKS: Framework[] = [
    {
        name: 'vanilla',
        display: 'Vanilla',
        color: chalk.yellow,
        variants: [
            {
                name: 'vanilla-ts',
                display: 'TypeScript',
                color: chalk.blue,
            },
            {
                name: 'vanilla',
                display: 'JavaScript',
                color: chalk.yellow,
            },
        ],
    },
    {
        name: 'vue',
        display: 'Vue',
        color: chalk.green,
        variants: [
            {
                name: 'vue-ts',
                display: 'TypeScript',
                color: chalk.blue,
            },
            {
                name: 'vue',
                display: 'JavaScript',
                color: chalk.yellow,
            },
            {
                name: 'custom-create-vue',
                display: 'Customize with create-vue ↗',
                color: chalk.green,
                customCommand: 'npm create vue@latest TARGET_DIR',
            },
            {
                name: 'custom-nuxt',
                display: 'Nuxt ↗',
                color: chalk.greenBright,
                customCommand: 'npm exec nuxi init TARGET_DIR',
            },
        ],
    },
    {
        name: 'react',
        display: 'React',
        color: chalk.cyan,
        variants: [
            {
                name: 'react-ts',
                display: 'TypeScript',
                color: chalk.blue,
            },
            {
                name: 'react-swc-ts',
                display: 'TypeScript + SWC',
                color: chalk.blue,
            },
            {
                name: 'react',
                display: 'JavaScript',
                color: chalk.yellow,
            },
            {
                name: 'react-swc',
                display: 'JavaScript + SWC',
                color: chalk.yellow,
            },
            {
                name: 'custom-react-router',
                display: 'React Router v7 ↗',
                color: chalk.cyan,
                customCommand: 'npm create react-router@latest TARGET_DIR',
            },
        ],
    },
    {
        name: 'preact',
        display: 'Preact',
        color: chalk.magenta,
        variants: [
            {
                name: 'preact-ts',
                display: 'TypeScript',
                color: chalk.blue,
            },
            {
                name: 'preact',
                display: 'JavaScript',
                color: chalk.yellow,
            },
            {
                name: 'custom-create-preact',
                display: 'Customize with create-preact ↗',
                color: chalk.magenta,
                customCommand: 'npm create preact@latest TARGET_DIR',
            },
        ],
    },
    {
        name: 'lit',
        display: 'Lit',
        color: chalk.redBright,
        variants: [
            {
                name: 'lit-ts',
                display: 'TypeScript',
                color: chalk.blue,
            },
            {
                name: 'lit',
                display: 'JavaScript',
                color: chalk.yellow,
            },
        ],
    },
    {
        name: 'svelte',
        display: 'Svelte',
        color: chalk.red,
        variants: [
            {
                name: 'svelte-ts',
                display: 'TypeScript',
                color: chalk.blue,
            },
            {
                name: 'svelte',
                display: 'JavaScript',
                color: chalk.yellow,
            },
            {
                name: 'custom-svelte-kit',
                display: 'SvelteKit ↗',
                color: chalk.red,
                customCommand: 'npm exec sv create TARGET_DIR',
            },
        ],
    },
    {
        name: 'solid',
        display: 'Solid',
        color: chalk.blue,
        variants: [
            {
                name: 'solid-ts',
                display: 'TypeScript',
                color: chalk.blue,
            },
            {
                name: 'solid',
                display: 'JavaScript',
                color: chalk.yellow,
            },
        ],
    },
    {
        name: 'qwik',
        display: 'Qwik',
        color: chalk.blueBright,
        variants: [
            {
                name: 'qwik-ts',
                display: 'TypeScript',
                color: chalk.blueBright,
            },
            {
                name: 'qwik',
                display: 'JavaScript',
                color: chalk.yellow,
            },
            {
                name: 'custom-qwik-city',
                display: 'QwikCity ↗',
                color: chalk.blueBright,
                customCommand: 'npm create qwik@latest basic TARGET_DIR',
            },
        ],
    },
    {
        name: 'angular',
        display: 'Angular',
        color: chalk.red,
        variants: [
            {
                name: 'custom-angular',
                display: 'Angular ↗',
                color: chalk.red,
                customCommand: 'npm exec @angular/cli@latest new TARGET_DIR',
            },
            {
                name: 'custom-analog',
                display: 'Analog ↗',
                color: chalk.yellow,
                customCommand: 'npm create analog@latest TARGET_DIR',
            },
        ],
    },
    {
        name: 'others',
        display: 'Others',
        color: chalk.reset,
        variants: [
            {
                name: 'create-vite-extra',
                display: 'create-vite-extra ↗',
                color: chalk.reset,
                customCommand: 'npm create vite-extra@latest TARGET_DIR',
            },
            {
                name: 'create-electron-vite',
                display: 'create-electron-vite ↗',
                color: chalk.reset,
                customCommand: 'npm create electron-vite@latest TARGET_DIR',
            },
        ],
    },
]

const TEMPLATES = FRAMEWORKS.map((f) => f.variants.map((v) => v.name)).reduce(
    (a, b) => a.concat(b),
    [],
)
const defaultTargetDir = 'vite-project'
function formatTargetDir(targetDir: string | undefined) {
    return targetDir?.trim().replace(/\/+$/g, '')
}
/**
 * 根据 template 拼接要读取的 template 目录
 * @param param0 
 * @returns 
 */
function buildTemplateDir({
    root,
    result,
    targetDir,
    argTemplate,
}: {
    root: string;  
    result: any;  
    targetDir?: string;  
    argTemplate: string;  
}) {
    const { framework, variant } = result


    let template: string = variant || argTemplate

    console.log(`\nScaffolding project in ${root}...`)

    const templateDir = path.resolve(
        fileURLToPath(import.meta.url),
        '../template',
        `template-${template}`,
    )

    console.log('templateDir', templateDir)
    // console.log(import.meta.url)
    // fileURLToPath的作用就是去掉前面的 file:///
    // console.log(fileURLToPath(import.meta.url))
    return templateDir;
}
async function init() {
    const argTargetDir = formatTargetDir(argv._[0])
    const argTemplate = argv.template || argv.t
    const help = argv.help;
    if (help) {
        console.log(helpMessage)
        return
    }
    let targetDir = argTargetDir || defaultTargetDir;

    let result: prompts.Answers<
        'projectName'
    >

    try {
        result = await prompts(
            [
                {
                    // 如果参数传入了 projectName，那自然就不用提问了，这时候就设置 type 为 null
                    type: argTargetDir ? null : 'text',
                    name: 'projectName',
                    // chalk.reset 是重置颜色的意思，不受之前设置的颜色的影响
                    message: chalk.reset('Project name:'),
                    // initial 是初始值
                    initial: defaultTargetDir,
                    onState: (state) => {
                        // onState 是输入的值变化的时候，对输入的目录也做一下格式化，也就是 aaa/ 变成 aaa，或者用默认的目录
                        targetDir = formatTargetDir(state.value) || defaultTargetDir
                    }
                },
                {
                    // 根据输入的参数是否在 template 数组里来决定显不显示
                    type:
                        argTemplate && TEMPLATES.includes(argTemplate) ? null : 'select',
                    name: 'framework',
                    message: chalk.reset('Select a framework:'),
                    initial: 0,
                    choices: FRAMEWORKS.map((framework) => {
                        const frameworkColor = framework.color
                        return {
                            title: frameworkColor(framework.display || framework.name),
                            value: framework,
                        }
                    }),
                },
                {
                    type: (framework: Framework) =>
                        framework && framework.variants ? 'select' : null,
                    name: 'variant',
                    message: chalk.reset('Select a variant:'),
                    choices: (framework: Framework) =>
                        framework.variants.map((variant) => {
                            const variantColor = variant.color
                            return {
                                title: variantColor(variant.display || variant.name),
                                value: variant.name,
                            }
                        }),
                },

            ],
            {
                onCancel: () => {
                    throw new Error(chalk.red('✖') + ' Operation cancelled')
                },
            },
        )
        console.log('result', result)
    } catch (error) {
        console.error('error', error)
        return
    }
    const root = path.join(cwd, targetDir)
    const templateDir = buildTemplateDir({
        root,
        result,
        targetDir,
        argTemplate
    });
    console.log('templateDir', templateDir)
    const renameFiles: Record<string, any> = {
        _gitignore: '.gitignore',
    }
    
    const write = (file: string, content?: string) => {
        // write 方法如果传入了 content，就是用 fs.writeFileSync 写入文件。
        const targetPath = path.join(root, renameFiles[file] ?? file)
        if (content) {
            fs.writeFileSync(targetPath, content)
        } else {
            // 用 fs.stateSync 拿到这个路径是文件还是目录，如果是目录，就先递归创建这个目标目录，然后依次复制源目录下的文件。
            copy(path.join(templateDir, file), targetPath)
        }
    }
    
    /**
     * fs 模版有 copyFileSync 的方法，但没有 copyDir 的方法，所以我们要自己实现目录的复制。
     * @param srcDir 
     * @param destDir 
     */
    function copyDir(srcDir: string, destDir: string) {
        fs.mkdirSync(destDir, { recursive: true })
        for (const file of fs.readdirSync(srcDir)) {
          const srcFile = path.resolve(srcDir, file)
          const destFile = path.resolve(destDir, file)
          copy(srcFile, destFile)
        }
    }
    
    function copy(src: string, dest: string) {
        const stat = fs.statSync(src)
        // 如果是目录，就先递归创建这个目标目录，然后依次复制源目录下的文件
        if (stat.isDirectory()) {
            copyDir(src, dest)
        } else {
            fs.copyFileSync(src, dest)
        }
    }

    // 如果目标目录不存在，就用 mkdirSync 创建
    if (!fs.existsSync(root)) {
        fs.mkdirSync(root, { recursive: true })
    }
    
    // 用 readdirSync 读取模版目录下的文件，依次写入目标目录
    const files = fs.readdirSync(templateDir)
    console.log('files', files)
    for (const file of files) {
        write(file)
    }
    
    // path.relative 是拿到从 a 目录到 b 目录的相对路径
    const cdProjectName = path.relative(process.cwd(), root)
        console.log(`\nDone. Now run:\n`)
    if (root !== process.cwd()) {
        console.log(
            `  cd ${
            cdProjectName.includes(' ') ? `"${cdProjectName}"` : cdProjectName
            }`,
        )
    }
    console.log(`  npm install`)
    console.log(`  npm run dev`)
    console.log()
    
}
init().catch(e => {
    console.error(e);
})
