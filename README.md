# Windows 下支持自动更新的 Electron 应用脚手架

## 使用

1. 下载应用

	```bash
	# 工作目录下，比如 d/workspace
	git clone https://github.com/ganyouyin/electron-autoupdate-scaffold.git
	npm i
	```

2. 运行应用

	```bash
	cd electron-autoupdate-scaffold
	npm start
	```

3. 打包应用

	```bash
	# 在 electron-autoupdate-scaffold 目录下
	npm run build
	```

	执行后会在控制台输入打包进度的日志：
	
	```bash
	npm run build

	> electron-autoupdate-scaffold@0.0.1 build D:\honey\electron-autoupdate-scaffold
	> electron-builder -w

  	• electron-builder version=20.15.0
  	• loaded configuration file=package.json ("build" field)
  	• writing effective config file=dist\electron-builder-effective-config.yaml
  	• no native production dependencies
	• packaging platform=win32 arch=x64 electron=2.0.1 appOutDir=dist\win-unpacked
	• default Electron icon is used reason=application icon is not set
	• building target=nsis file=dist\electron-autoupdate-scaffold Setup 0.0.1.exe archs=x64 oneClick=true
	• building block map blockMapFile=dist\electron-autoupdate-scaffold Setup 0.0.1.exe.blockmap
	```

	第一次运行会比较慢，运行结束后会在当前目录下新增一个 dist 文件夹，dist 的目录结构如下：

	```bash
	|- dist
	  |- win-unpacked
	  |- electron-autoupdate-scaffold Setup.exe
	  |- electron-autoupdate-scaffold Setup.exe.blockmap
	  |- electron-builder-effective-config.yaml
	  |- latest.yml
	```

	win-unpacked 下是可执行文件。

4. 运行自动更新后台

	```bash
	# 工作目录下，比如 d/workspace
	git clone https://github.com/ganyouyin/electron-autoupdate-server.git
	npm i
	npm start
	```

	将之前打包出来的 dist 目录下的 4 个文件（除了 win-unpacked）拷贝到这边的 packages/win32 下（需要手动新建目录 packages/win32）。

5. 测试自动更新
	- 进入 electron-autoupdate-scaffold/dist/win-unpacked 找到可执行文件，双击运行，看到打开窗口的控制台中依次输出：

		```
		checking-for-update
		update-not-available
		```

	- 进入 electron-autoupdate-scaffold，打开 package.json，把版本号改小，重新打包后再次进入 dist/win-unpacked 目录，运行 exe，看到打开窗口的控制台中依次输出：

		```
		checking-for-update
		update-available
		```
		并且出现弹窗提示「现在更新？」。

## 基于脚手架开发

该脚手架的自动更新实现基于 electron-builder，需要了解更多功能的请点[这里](https://github.com/electron-userland/electron-builder)。

从 github 下载后文件夹目录如下：

```bash
|- electron-autoupdate-scaffold
  |- main.js
  |- src
    |- index.html
  |- package.json
  |- package-lock.json
  |- README.md
  |- .gitignore
```

其中 main.js 为主进程文件，src 中为渲染进程文件。

## 支持

任何使用问题请戳[这里](https://github.com/ganyouyin/electron-autoupdate-scaffold/issues)。