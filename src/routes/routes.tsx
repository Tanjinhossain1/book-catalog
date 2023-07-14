import { createBrowserRouter } from 'react-router-dom';
import App from '../App'; 
import Home from '../pages/Home'; 
import SignUp from '@/pages/SignUp';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';


const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        // {
        //   path: '/allBooks',
        //   element: <Products />,
        // }, 
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/signUp',
      element: <SignUp />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);
  
  export default router;
  