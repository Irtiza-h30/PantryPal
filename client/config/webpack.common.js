const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    main: path.resolve(__dirname, "../src", "index.js"),
  },
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|ico)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: [{ loader: "babel-loader" }],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader", // compiles Less to CSS
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-url-loader",
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      root: __dirname,
      src: path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.API": JSON.stringify(
        process.env.API || "http://localhost:4000"
      ),
    }),
  ],
};
