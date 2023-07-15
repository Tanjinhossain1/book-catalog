import { useAppSelector } from '@/redux/hook';
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface IProps {
  children: ReactNode;
}
export default function PrivateRoute({ children }: IProps) {
  const { user, isLoading } = useAppSelector((state) => state.user);
  const { pathname } = useLocation();

  if (isLoading) {
    return <div className='text-center'>
    <span className="loading loading-spinner loading-lg"></span></div>;
  }
  if (!user.email && !isLoading) {
    return <Navigate to="/login" state={{ path: pathname }} />;
  }
  return children;
}
