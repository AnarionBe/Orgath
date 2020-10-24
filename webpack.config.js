const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const Dotenv = require('dotenv-webpack');

module.exports = {
	entry: ['./src/index.js'],
	output: {
			path: __dirname + '/docs',
			publicPath: '/',
			filename: 'bundle.js'
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader"
					}
				]
			},
			{
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
			},
			{
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader'
        ],
			},
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			filename: "index.html"
		}),
		new Dotenv()
	],
	devServer: {
		contentBase: path.join(__dirname, "./docs"),
		watchContentBase: true,
		historyApiFallback: true,
		inline: true,
		open: false,
		hot: true,
		disableHostCheck: true,
		port: 8888,
	},
	node: { fs: 'empty' },
};
