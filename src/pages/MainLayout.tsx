import Footer from '@/component/Footer';
import TopNavBar from '@/component/Navbar';
import { Outlet } from 'react-router-dom'; 

export default function MainLayout() {
  return (
    <div>
      <TopNavBar />
      <div className="">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
