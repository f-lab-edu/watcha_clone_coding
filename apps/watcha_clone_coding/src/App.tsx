import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Layout from '@/layouts/Layout';

import '@/styles/App.css';
import Status from './components/Status';

// 코드 스플리팅을 위한 lazy 로딩
const ListPage = lazy(() => import('@/pages/ListPage'));
const DetailPage = lazy(() => import('@/pages/DetailPage'));
const SearchPage = lazy(() => import('@/pages/SearchPage'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5분간 데이터를 fresh로 간주
      gcTime: 10 * 60 * 1000, // 10분간 캐시 유지
      retry: 2, // 실패 시 2번 재시도
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // 지수 백오프
      refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 리페치 비활성화
      refetchOnReconnect: true, // 네트워크 재연결 시 리페치
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<Status.Loading />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<ListPage />} />
              <Route path="/movie/:id" element={<DetailPage />} />
              <Route path="/search" element={<SearchPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
