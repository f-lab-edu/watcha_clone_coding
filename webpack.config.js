const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: "./src/index.tsx", // 엔트리 포인트 설정
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js", // 번들된 파일의 이름
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"], // import 시 확장자를 생략할 수 있게 해줍니다.
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/, // .js 또는 .jsx 확장자를 가진 파일에 대해
          exclude: /node_modules/,
          use: [
            // Babel Loader 설정
            {
              loader: "babel-loader",
              options: {
                presets: [
                  "@babel/preset-env",
                  "@babel/preset-react", // React 지원
                ],
                plugins: [
                  // 개발 환경에서만 React Refresh 플러그인 적용
                  process.env.NODE_ENV !== "production" && require.resolve("react-refresh/babel"),
                ].filter(Boolean),
              },
            },
          ],
        },
        {
          test: /\.css$/, // .css 파일에 대해
          use: [process.env.NODE_ENV !== "production" ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader"], // 로더는 배열의 역순으로 적용됩니다.
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/i, // 이미지 파일 대상
          type: "asset/resource", // 개별 파일로 출력
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i, // 폰트 파일 대상
          type: "asset/resource",
        },
      ],
    },
    devtool: isProduction ? "hidden-source-map" : "eval-cheap-module-source-map", //디버깅을 용이하게 합니다.
    devServer: {
      static: {
        directory: path.join(__dirname, "public"), // 정적 파일을 제공할 디렉토리
      },
      port: 3000, // 서버 포트 번호
      open: true, // 서버 시작 시 브라우저 자동 열기
      hot: true, // 핫 모듈 교체 활성화
      historyApiFallback: true, // 히스토리 API를 사용하는 SPA에 유용
      liveReload: true,
      proxy: {
        "/api": {
          target: "http://api.example.com",
          changeOrigin: true,
          pathRewrite: { "^/api": "" },
        },
      },
      client: {
        overlay: false, // 오버레이 비활성화
      },
      https: true, // HTTPS 사용
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
    mode: "development", // 개발 모드 설정
  };
};
