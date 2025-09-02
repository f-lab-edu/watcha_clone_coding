// webpack.common.js

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/index.tsx", // 엔트리 파일 설정
  output: {
    path: path.resolve(__dirname, "dist"), // 출력 디렉토리
    filename: "bundle.js", // 번들 파일 이름
    clean: true, // 빌드 시 기존 파일 제거 (Webpack 5 기능)
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
    },
    extensions: [".tsx", ".ts", ".jsx", ".js"], // 확장자 생략 가능하도록 설정
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // .ts 또는 .tsx 확장자 파일 처리
        use: "babel-loader", // Babel 로더 사용
        exclude: /node_modules/, // node_modules 제외
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i, // 이미지 파일 처리
        type: "asset", // 파일을 개별 파일로 내보냄
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/i, // 폰트 파일 처리
        type: "asset",
      },
      {
        test: /\.css$/, // .css 파일에 대해
        use: [process.env.NODE_ENV !== "production" ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader"], // 로더는 배열의 역순으로 적용됩니다.
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // 템플릿 파일 경로
      filename: "index.html", // 생성될 HTML 파일 이름
      inject: "body", // 스크립트를 body 태그 끝에 삽입
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new Dotenv({
      path: `./.env.${process.env.NODE_ENV}`, // 환경별 .env 파일 경로
    }),
    ...(process.env.NODE_ENV === "production"
      ? [new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" })]
      : []),
    process.env.NODE_ENV !== "production" && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
};
