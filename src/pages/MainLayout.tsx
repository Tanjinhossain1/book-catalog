import TopNavBar from '@/component/Navbar';
import { Outlet } from 'react-router-dom'; 

export default function MainLayout() {
  return (
    <div>
      <TopNavBar />
      <div className="pt-8">
        <Outlet />
      </div>
    </div>
  );
}
