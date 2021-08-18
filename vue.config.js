const CompressionWebpackPlugin = require('compression-webpack-plugin');

// devServer配置查看 https://cli.vuejs.org/config/#devserver
const devServer = {
    host: '0.0.0.0',
    proxy: {
        '^/testgroup': {
            target: 'http://127.0.0.1:8081',
            // target: 'http://10.0.10.5:8081',
            changeOrigin: true
        }
    }
}

let workers = require('os').cpus().length;

if (typeof workers !== 'number') {
    workers = 1;
}

module.exports = {
    devServer:devServer,
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            //GZIP压缩
            return {
                plugins: [new CompressionWebpackPlugin({
                    test: /\.(js|css|svg)(\?.*)?$/i, //需要压缩的文件正则
                    threshold: 4096, //文件大小大于这个值时启用压缩
                    deleteOriginalAssets: false //压缩后是否删除原文件
                })]
            };
        }
    },
    chainWebpack: config => {
        // see TerserPlugin compress options document:
        // https://github.com/terser/terser#compress-options
        if (process.env.NODE_ENV === 'production') {
            config.optimization.minimizer('terser').tap((args) => {
                args[0].terserOptions.parallel = workers > 1; // 开启多线程
                args[0].terserOptions.cache = true;
                if (process.env.VUE_APP_SERVER === 'prodServer') {
                    args[0].terserOptions.compress.drop_console = true;
                    args[0].terserOptions.compress.pure_funcs = ['console.log'];
                    args[0].terserOptions.compress.drop_debugger = true;
                }
                return args
            })
        }
        // 去除默认配置中import后缀自动检测中多余的文件后缀
        config.resolve.extensions.clear().add('.vue').add('.ts').add('.js');
        // 为vue开启thread-loader
        config.module.rule('vue').use('thread-loader').loader('thread-loader').options({
            workers: workers
        }).after('cache-loader');
        // 为ant-design修改less-loader配置
        config.module.rule('less').oneOf('normal').use('less-loader').options({
            sourceMap: false,
            javascriptEnabled: true
        });
        config.module.rule('less').oneOf('normal-modules').use('less-loader').options({
            sourceMap: false,
            javascriptEnabled: true
        });
    }
}
