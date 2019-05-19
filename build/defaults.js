const rules = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: ["babel-loader"]
  },
  {
    test: /\.css$/,
    use: ["style-loader", "css-loader"]
  },
  {
    test: /\.scss$/,
    use: [
      "style-loader", // creates style nodes from JS strings
      "css-loader?modules&importLoaders=true&localIdentName=[name]__[local]___[hash:base64:5]", // translates CSS into CommonJS
      "sass-loader" // compiles Sass to CSS, using Node Sass by default
    ]
  },
  { test: /\.svg$/, use: "svg-inline-loader" }
];

const withSystemHooks = process.env.SYSTEM_HOOKS === JSON.stringify(true);

module.exports = {
  rules,
  withSystemHooks
};
