// webpack.common.js

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.ts', // 엔트리 파일 설정
  output: {
    path: path.resolve(__dirname, 'dist'), // 출력 디렉토리
    filename: 'bundle.js', // 번들 파일 이름
    clean: true, // 빌드 시 기존 파일 제거 (Webpack 5 기능)
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // .ts 또는 .tsx 확장자 파일 처리
        use: 'babel-loader', // Babel 로더 사용
        exclude: /node_modules/, // node_modules 제외
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i, // 이미지 파일 처리
        type: 'asset/resource', // 파일을 개별 파일로 내보냄
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/i, // 폰트 파일 처리
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'], // 확장자 생략 가능하도록 설정
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // 템플릿 파일 경로
      filename: 'index.html', // 생성될 파일 이름
    }),
    new Dotenv({
      path: `./.env.${process.env.APP_PHASE || 'local'}`, // .env 파일 경로 설정
    }),
  ],
};