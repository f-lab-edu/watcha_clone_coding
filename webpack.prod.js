// webpack.prod.js

const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production", // 프로덕션 모드 설정
  devtool: false, // 소스맵 비활성화
});
