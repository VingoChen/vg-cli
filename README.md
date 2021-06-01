## 前端脚手架 CLI 工具

### 安装

`npm i -g vingo-cli`

### 使用

| ~        | 命令          | 缩写   |
| -------- | ------------- | ------ |
| 打包项目 | **vg build**  | `vg b` |
| 初始项目 | **vg create** | `vg c` |
| 构建项目 | **vg dev**    | `vg d` |
| 查看帮助 | **vg help**   | `vg h` |

#### 指定端口/host：

```js
  vg dev --port 1234
  vg dev --host 1.1.1.1
```

#### 打包分析

```js
  vg dev --report 1
```

当使用 --report 1 时，并且根目录 config/vg.config.js 配置了 analyze,会启用对应打包分析配置

#### 自定义配置

可以通过在项目根目录创建 config/vg.config.js 进行额外配置。

默认读取 vg.config.js 的配置，若需要多环境的配置,请通过 mode 命令指定,将会读取对应的配置文件：

```js
  vg dev --mode A  // config/vg.A.config
  vg dev --mode B  // config/vg.B.config
```

eg:

```js
module.exports = {
	// 环境变量配置，同时在typings下声明 declare const NAME = "xiaoming"，即可访问。
	define: {
		NAME: "xiaoming",
	},
	// 请求代理
	proxy: {
		"/api": {
			target: "http://aaa.bbb.com/",
			changeOrigin: true,
			pathRewrite: { "^/api": "" },
		},
	},
	// 路径别名
	alias: {
		Components: "src/components",
		Utils: "src/components",
	},
	// 打包分析配置
	analyze: {
		analyzerMode: "server",
		analyzerPort: 8888,
		openAnalyzer: true,
		// generate stats file while ANALYZE_DUMP exist
		generateStatsFile: false,
		statsFilename: "stats.json",
		logLevel: "info",
		defaultSizes: "parsed", // stat  // gzip
	},
	// 额外的webpack配置，将会被 webpack.merge 合并到默认配置中
	configureWebpack: {
		// externals: {
		//   react: 'React',
		// },
	},
};
```

### 模版传送门

https://github.com/VingoChen/react-template
