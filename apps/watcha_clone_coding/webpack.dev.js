// webpack.dev.js
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development', // 개발 모드 설정
  devtool: 'eval-cheap-module-source-map', // 빠른 빌드와 디버깅을 위한 소스맵 설정
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // 정적 파일을 제공할 디렉토리
    },
    open: true, // 개발 서버 시작 시 브라우저 자동 열기
    host: 'localhost', // 호스트 설정
    port: 3000, // 포트 번호 설정 (필요 시 추가)
    hot: true, // 핫 모듈 교체 활성화
    historyApiFallback: true, // 히스토리 API를 사용하는 SPA에 유용
    proxy: {
      '/api': {
        target: 'http://api.example.com',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
    client: {
      overlay: false, // 오버레이 비활성화
    },
    https: true, // HTTPS 사용
  },
});
