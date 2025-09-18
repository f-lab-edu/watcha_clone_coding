import { Outlet } from 'react-router-dom';

import '@/styles/Layout.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
