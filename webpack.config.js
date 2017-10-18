const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");

module.exports = {
    entry: __dirname + "/src/index.tsx",
    output: {
        path: __dirname,
        filename: "bundle.js",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".css"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
            },
            {
                test: /\.css$/,
                loader: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
        }),
        new HtmlWebpackPlugin({
            inlineSource: ".(js|css)$",
            template: __dirname + "/index.ejs",
        }),
        new HtmlWebpackInlineSourcePlugin(),
    ],
};
