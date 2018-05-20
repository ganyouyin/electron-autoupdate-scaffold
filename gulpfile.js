let gulp = require('gulp');
let packager = require('electron-packager');
let winstaller = require('electron-winstaller');

let platform = 'win32';
let arch = 'ia32';
let dir = 'app';
let name = `myapp-win32-${arch}`;
let out = 'dist/package';
let appDirectory = `${out}/${name}`;
let outputDirectory = `dist/installer/${name}`;
let icon = 'favicon.ico';
let loadingGif = 'loading.gif';

let isDirExist = (path) => {
    return new Promise((resolve) => {
        fs.readdir(path, (err) => resolve(!err));
    });
};

let generatePackage = () => {
    return new Promise((resolve, reject) => {
        packager({
            dir,
            platform,
            arch,
            out,
            icon,
            // 桌面快捷方式名称以及开始菜单文件夹名称
            'version-string': {
                CompanyName: 'MyCompany Inc.',
                ProductName: 'myapp'
            }
        }, (err) => err ? reject(err) : resolve());
    });
};

let generateInstaller = () => {
    return winstaller
        .createWindowsInstaller({
            appDirectory,
            outputDirectory,
            loadingGif,
            authors: 'ganyouyin',
            exe: 'myapp.exe',
            title: 'My APP',
            iconUrl: `${__dirname}/${iconPath}`,
            setupIcon: icon,
            setupExe: 'Setup.exe',
            noMsi: true
        });
};

gulp.task('generate-package', () => generatePackage());

gulp.task('generate-installer', () => {
    let step = 1;

    return Promise.resolve()
        .then(() => console.log(`${step++}、检查目录 ${appDirectory} 是否存在`))
        .then(() => isDirExist(appDirectory))
        .then((exist) => {
            if (exist) {
                return console.log(`  目录 ${appDirectory} 已存在`);
            }
            console.log(`  目录 ${appDirectory} 不存在`)

            return Promise.resolve()
                .then(() => console.log(`${step++}、开始打包生成目录 ${appDirectory}`))
                .then(() => generatePackage())
                .then(() => console.log(`  打包生成目录完成`));
        })
        .then(() => console.log(`${step++}、开始生成安装包`))
        .then(() => generateInstaller())
        .then(() => console.log(`  已经在 ${outputDirectory} 生成安装包`))
        .catch((err) => console.error(err));
});