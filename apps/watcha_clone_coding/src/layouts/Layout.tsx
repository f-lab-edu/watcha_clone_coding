import Footer from '@/components/Footer';
import Header from '@/components/Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="layout">
      <Header />
      <main className="main">
        <div className="main-content">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
