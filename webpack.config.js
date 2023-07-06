import path from "path"

module.exports = {
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		modules: ['node_modules', 'src'],
		extensions: ['.tsx', '.ts', '.js'],
	},
	devServer: {
		static: {
			directory: path.join(__dirname, "public")
		},
		compress: true,
		port: 3000,
	},
};