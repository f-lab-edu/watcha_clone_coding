import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Layout from "@/layouts/Layout";

import "@/styles/App.css";
import Status from "./components/Status";

// 코드 스플리팅을 위한 lazy 로딩
const ListPage = lazy(() => import("@/pages/ListPage"));
const DetailPage = lazy(() => import("@/pages/DetailPage"));
const SearchPage = lazy(() => import("@/pages/SearchPage"));

const queryClient = new QueryClient();

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
