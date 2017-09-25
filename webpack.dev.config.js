const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');

module.exports = merge(baseConfig, {
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"development"',
			}
		}),
	],
	devtool: 'cheap-module-source-map',
	devServer: {
		hot: true,
		inline: true,
		port: 3000,
		publicPath: "/",
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
	},
});
