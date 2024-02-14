import Header from './Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Header />
      <main className='px-28 py-12'>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
