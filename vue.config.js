const path = require('path')
function resolve(dir) {
	return path.join(__dirname, '.', dir)
}
const CompressionPlugin = require('compression-webpack-plugin');
module.exports = {
	// outputDir: 'dist', // build输出目录
	assetsDir: "static",
	// assetsDir: "dist", // 静态资源目录(js, css, img)
	// lintOnSave: false, // 是否开启eslint
	devServer: {
		open: true, // 是否自动弹出浏览器界面
		host: 'localhost', 
		port: 8080,
		https: false, // 是否使用https协议
		hotOnly: false, // 是否开启热更新
		proxy: {
			"/http_api": {
        target: "http://localhost:6919/v1",
				// target: "http://7.151.16.99:6919/v1/",
        // target: process.env.NODE_ENV === 'production' ? '' : '',// "http://localhost:6919/v1", //"http://192.168.1.20:80/v1/",
				changeOrigin: true,
				pathRewrite: {
					'^/http_api': ''
				}
			},
      "/socket_api": {
        target: "ws://localhost:6919/v1",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/socket_api': ''
        }
      }
		}
	},
	chainWebpack: (config) => {   
		// config.plugin('compression').use(
		// 	new CompressionPlugin(
		// 		{
		// 			filename: info => {
		// 				return `${info.path}.gz${info.query}`
		// 			},
		// 			algorithm: 'gzip',
		// 			threshold: 10240,
		// 			test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
		// 			minRatio: 0.8,
		// 			deleteOriginalAssets: true
		// 		}
		// 	)
		// ) 
		config.plugin("html").tap(args => {
			args[0].title = "Jump Trading Monitor"
			return args
		})
		// 添加svg文件      
		config.module
				.rule('svg')
				.exclude.add(resolve('src/icons'))
				.end()
		config.module
				.rule('icons')
				.test(/\.svg$/)
				.include.add(resolve('src/icons'))
				.end()
				.use('svg-sprite-loader')
				.loader('svg-sprite-loader')
				.options({
						symbolId: 'icon-[name]'
				})
				.end()
	
		// 编译某些npm包里的es6代码
		config.module
				.rule('vxe')
				.test(/\.js$/)
				.include
				.add(resolve('node_modules/vxe-table'))
				.add(resolve('node_modules/vxe-table-plugin-antd'))
				.end()
				.use()
				.loader('babel-loader')
				.end()
	
	}
}
