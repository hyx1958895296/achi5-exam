const {
    defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    devServer: {
        //当你配置完，需要重启项目
        proxy: {
            '/api': {
                target: 'http://192.168.0.110:7001', //服务器端的域名地址
                ws: true, //ws:websocket
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
        }
    }
})