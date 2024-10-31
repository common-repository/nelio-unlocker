/* eslint-disable */
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

const config = {
	...defaultConfig,
	module: {
		rules: [
			{
				test: /.svg$/,
				issuer: /\.tsx$/,
				use: 'react-svg-loader',
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		alias: {
			'@nelio-unlocker/components': path.resolve( __dirname, './src/components' ),
			'@nelio-unlocker/data': path.resolve( __dirname, './src/data' ),
			'@nelio-unlocker/hooks': path.resolve( __dirname, './src/hooks' ),
			'@nelio-unlocker/types': path.resolve( __dirname, './src/types' ),
		},
		extensions: [ '.tsx', '.ts', '.js' ],
	},
};

module.exports = [
	{
		...config,
		entry: './src/importer/index.tsx',
		output: {
			filename: 'importer.js',
			path: path.resolve( __dirname, 'dist' ),
			library: 'NelioUnlocker',
			libraryTarget: 'umd',
		},
	},
];
