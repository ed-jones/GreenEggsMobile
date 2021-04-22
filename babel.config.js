module.exports = function (api) {
  api.cache(true);
  return {
    parser: "@typescript-eslint/parser",
    presets: ["babel-preset-expo"],
    plugins: [
      "inline-dotenv",
      [
        "module-resolver",
        {
          alias: {
            "@greeneggs": "./src",
          },
        },
      ],
    ],
  };
};
