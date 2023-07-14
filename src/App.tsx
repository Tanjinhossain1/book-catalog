import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import './App.css' 
import Home from './pages/Home' 
import { useAppDispatch } from './redux/hook'
import { setLoading, setUser } from './redux/sliceReducers/userSliceReducer';
import { auth } from './libs/firebase';

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
    <>  
    <Home />
    </>
  )
}

export default App
