import { Outlet } from 'react-router-dom';

import '@/styles/Layout.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <main className="main">
        <div className="main-content">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
