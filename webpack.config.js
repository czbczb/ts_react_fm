const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = env => {
    const isDev = env == 'development';
    return {
        mode: 'development',
        //入口文件的路径
        entry: "./src/index.tsx",
        output: {
            //打包的输出路径
            path: path.resolve(__dirname, "dist"),
            filename: "[name].bundle.js"
        },
        // 添加需要解析的文件格式
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json'],
            alias: {
                '@':'./src'
              },
        },
        plugins: [
            new CleanWebpackPlugin(['dist']),
            new HtmlWebpackPlugin({
                title: 'ts_react_fm',
                template: './index.html',
            })
        ],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: [
                        path.resolve(__dirname, 'src')
                    ],
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                },
                {
                    test: /\.tsx?$/,
                    use: ['ts-loader']
                }
            ]
        },
        devServer: {
            host: '0.0.0.0',
            contentBase: path.resolve(__dirname, "dist"),
            inline:true,
            port: 8081,
            hot: true
        },
        // 启用sourceMap
        devtool: "source-map"
    }

}