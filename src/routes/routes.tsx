import { createBrowserRouter } from 'react-router-dom';
import App from '../App'; 
import Home from '../pages/Home';
import NotFound from '../pages/notFound';


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
    // {
    //   path: '/login',
    //   element: <Login />,
    // },
    // {
    //   path: '/signup',
    //   element: <Signup />,
    // },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);
  
  export default router;
  