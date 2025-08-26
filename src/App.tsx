import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Layout from "./layouts/Layout";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";
import SearchPage from "./pages/SearchPage";

import "./styles/App.css";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<ListPage />} />
            <Route path="/movie/:id" element={<DetailPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
