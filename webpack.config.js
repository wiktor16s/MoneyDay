const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	devtool: "inline-sourcemap",
	entry: __dirname + '/src/js/main.js',
	output: {
		path: __dirname + '/dist/',
		publicPath: '/',
		filename: 'js/main.js'
	},
	optimization:{
        minimize: false, 
    },
	devServer: {
		inline: true,
		port: 3000
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['@babel/preset-env']
				}
			},
			{
				test: /\.css$/,
				loader: "style-loader!css-loader"
			}
		]
	},
	plugins: [
    new CopyWebpackPlugin([
      { from: 'src/index.html', to: 'index.html' },
    ])
  ]
}
