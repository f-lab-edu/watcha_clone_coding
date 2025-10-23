/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Single-Page Application (SPA) 출력.
    distDir: './dist', // 빌드 출력 디렉터리를 `./dist/`로 변경합니다.
    transpilePackages: ['@watcha/carousel'], // 트랜스파일링할 패키지 목록
    images: {
      unoptimized: true, // 정적 export 시 이미지 최적화 비활성화
    },
    webpack: (config) => {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });
      return config;
    }
  }
   
  export default nextConfig