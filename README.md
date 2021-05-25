## 易知微前端组 CLI 工具

### 安装

`npm i -g ezv-cli`

### 使用

| ~        | 命令           | 缩写    |
| -------- | -------------- | ------- |
| 打包项目 | **ezv build**  | `ezv b` |
| 初始项目 | **ezv create** | `ezv c` |
| 构建项目 | **ezv dev**    | `ezv d` |
| 查看帮助 | **ezv help**   | `ezv h` |

#### 参数说明：

`--mode: ezv dev --mode dev 或 ezv build --mode dev `
环境配置，如，此时设置 mode 为 dev,若项目根目录创建了 config/ezv.dev.config.js,那么启用对应环境的额外项目配置.
`--host: ezv dev --host 1.1.1.1`
指定 host
`--port: ezv dev --port 1234`
指定端口
`--report: ezv dev --report 1 或 ezv build --report 1`
当使用 --report 1 时，并且根目录 config/ezv.config.js 配置了 analyze,会启用对应打包分析配置

#### 自定义配置

可以通过在项目根目录创建 config/ezv.config.js 进行额外配置。
eg:

```js
module.exports = {
  // 环境变量 可以通过 process.env 读取
  define: {
    NAME: 'xiaoming',
  },
  // 请求代理
  proxy: {
    '/api': {
      target: 'http://aaa.bbb.com/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  // 路径别名
  alias: {
    Components: 'src/components',
    Utils: 'src/components',
  },
  // 打包分析配置
  analyze: {
    analyzerMode: 'server',
    analyzerPort: 8888,
    openAnalyzer: true,
    // generate stats file while ANALYZE_DUMP exist
    generateStatsFile: false,
    statsFilename: 'stats.json',
    logLevel: 'info',
    defaultSizes: 'parsed', // stat  // gzip
  },
  // 额外的webpack配置，将会被 webpack.merge 合并到默认配置中
  configureWebpack: {
    // externals: {
    //   react: 'React',
    // },
  },
};
```
