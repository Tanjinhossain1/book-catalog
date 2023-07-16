import { createBrowserRouter } from 'react-router-dom';
import App from '../App'; 
import Home from '../pages/Home'; 
import SignUp from '@/pages/SignUp';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import AllBooks from '@/pages/AllBooks';
import AddNewBooks from '@/pages/AddNewBooks';
import PrivateRoute from './PrivateRoute';
import BookDetail from '@/pages/BookDetail';
import EditBook from '@/pages/EditBook';


const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
         path: '/allBooks',
         element: <AllBooks />,
       }, 
       {
        path: '/EditBook/:id',
        element: <EditBook /> ,
      },  
       {
        path: '/BookDetail/:id',
        element: <BookDetail /> ,
      },  
       {
        path: '/addNewBooks',
        element: <PrivateRoute><AddNewBooks /></PrivateRoute> ,
      },  
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
  