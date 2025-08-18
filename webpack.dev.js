// webpack.dev.js

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development', // 개발 모드 설정
  devtool: 'eval-cheap-module-source-map', // 빠른 빌드와 디버깅을 위한 소스맵 설정
  devServer: {
    open: true, // 개발 서버 시작 시 브라우저 자동 열기
    host: 'localhost', // 호스트 설정
    port: 3000, // 포트 번호 설정 (필요 시 추가)
    hot: true, // 핫 모듈 교체 활성화
  },
});