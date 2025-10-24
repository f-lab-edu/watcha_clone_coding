/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export', // Single-Page Application (SPA) 출력. -> SSR 적용을 위해 비활성화
    output: 'standalone', // 독립 실행형 출력 모든 의존성 번들링
    distDir: './dist', // 빌드 출력 디렉터리를 `./dist/`로 변경합니다.
    transpilePackages: ['@watcha/carousel'], // 트랜스파일링할 패키지 목록
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'image.tmdb.org',
          pathname: '/t/p/**',
        },
      ],
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