module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: ["last 2 versions", "> 5% in KR"],
        },
        useBuiltIns: "usage",
        corejs: {
          version: 2,
        },
      },
    ],
  ],
};
