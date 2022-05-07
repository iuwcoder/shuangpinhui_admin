module.exports = {
  lintOnSave: false, // 关闭eslint校验工具
  configureWebpack: {
		resolve: {
			alias: {
				// 路径别名
				'assets': '@/assets',
				'api': '@/api',
				'components': '@/components',
				'utils': '@/utils',
				'views': '@/views',
				'store': '@/store'
			}
		}
	},

	// 代理跨域
	devServer: {
		proxy: {
			'/api': {
				target: 'http://gmall-h5-api.atguigu.cn'
			}
		}
	},
	productionSourceMap: false,
}