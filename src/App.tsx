import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import './App.css'  
import { useAppDispatch } from './redux/hook'
import { setLoading, setUser } from './redux/sliceReducers/userSliceReducer';
import { auth } from './libs/firebase'; 
import MainLayout from './pages/MainLayout';

function App() { 

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.email));
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    });
  }, [dispatch]);
  
  return (
    <div>  
   <MainLayout />
    </div>
  )
}

export default App
