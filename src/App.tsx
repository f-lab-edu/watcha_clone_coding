import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import Layout from "./layouts/Layout";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";
import SearchPage from "./pages/SearchPage";

import "./styles/App.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ListPage />} />
          <Route path="/movie/:id" element={<DetailPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
