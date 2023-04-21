const path = require('path');
// const webpack = require('webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webAppDir = __dirname;
const rootDir = path.resolve(webAppDir, '.');
const srcDir = path.resolve(rootDir, 'src');
const buildDir = path.join(webAppDir, 'build');

const makeConfig = (env) => {
	env = env || {};
	process_env = process.env || {};

	let isDevelopment = process_env.NODE_ENV === 'development';

	const plugins = [
		new CleanWebpackPlugin({ verbose: true }),
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
		// new MiniCssExtractPlugin({
		// 	// filename: isDevelopment ? '[name].css' : '[name].min.css', // TODO service worker
		// 	filename: isDevelopment ? '[name].css' : '[name].[contenthash].css', // hash
		// }),
	];

	return {
		mode: isDevelopment ? 'development' : 'production',
		context: rootDir,
		devtool: isDevelopment ? 'eval-source-map' : false,
		entry: {
			main: { import: './src/index.tsx', dependOn: ['core'] },
			core: [ 'react', 'react-dom' ],
		},
		output: {
			path: buildDir,
			// filename: 'main.min.js', // TODO service worker
			filename: '[name].[chunkhash].js',
			sourceMapFilename: 'sourcemaps/[name].[chunkhash].map.js',
			publicPath: '/',
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx|ts|tsx)$/, 
					include: rootDir,
					exclude: [/node_modules/, /\.test\.ts/],
					use: {
						loader: 'ts-loader',
					},
				},
				{
					test: /\.css$/,
					use: ['style-loader', 'css-loader']
				},
				{
					test: /\.module\.scss$/,
					use: [
						isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
								url: false,
								modules: true,
								sourceMap: isDevelopment
							}
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: isDevelopment,
								// includePaths: [path.join(__dirname, 'styles')],
								// additionalData: '@import "src/styles/index.scss";', // todo enable when using
							}
						}
					]
				},
				{
					test: /\.scss$/,
					exclude: /\.module.(scss)$/,
					use: [
						isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
						'css-loader',
						{
							loader: 'sass-loader',
							options: {
								sourceMap: isDevelopment,
							}
						}
					]
				}
			],
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js', '.json'],
			alias: {
				'@app': path.join(srcDir, 'app'),
				'@api': path.join(srcDir, 'api'),
				'@components': path.join(srcDir, 'components'),
				'@containers': path.join(srcDir, 'containers'),
				'@helpers': path.join(srcDir, 'app/helpers'),
				'@hooks': path.join(srcDir, 'hooks'),
				'@services': path.join(srcDir, 'services'),
				'@store': path.join(srcDir, 'store'),
			},
		},
		plugins: plugins,
		performance: {
			hints: false,
			maxEntrypointSize: 512000,
			maxAssetSize: 512000
		},
		devServer: {
			port: 3000,
			// contentBase: buildDir,
			compress: false,
			historyApiFallback: true,
			hot: true, // TODO update service worker manager make permanent reloading
			// liveReload: false
		},
		watchOptions: {
			ignored: [buildDir, 'node_modules'],
			aggregateTimeout: 1000,
		},
	}
};

module.exports = makeConfig;
