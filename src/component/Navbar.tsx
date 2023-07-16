import { auth } from '@/libs/firebase';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setUser } from '@/redux/sliceReducers/userSliceReducer';
import { signOut } from 'firebase/auth';
import {Link} from 'react-router-dom';
import {toast} from "react-toastify";
 
export default function TopNavBar() {
    const { user } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const handleLogout =  () => { 
       signOut(auth).then(() => { 
        dispatch(setUser(null));
        toast.success('Log Out Success Full!', {
            position: "top-right",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            }); 
      }).catch((err: any)=>{
        console.log(err)
      })
    }; 

  return (
    <div> 
        <div className="navbar bg-purple-500">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost normal-case text-2xl text-white">Book Catalog</Link>
  </div>
  <div className="flex-none text-white text-4xl">
    <ul className="menu menu-horizontal mr-6 px-1">
     <div>
       <Link className='ml-4 text-xl' to={"/"}>Home</Link>
       <Link className='ml-4 text-xl' to={"/wishlist"}>Wish List</Link>
       <Link className='ml-4 text-xl' to={"/allBooks"}>All Books</Link>
        {
            user.email ? 
            <>
            <Link to={"/addNewBook"} className='ml-4 text-xl'>Add New Books</Link> 
            <button onClick={handleLogout} className='ml-4 text-xl'>LogOut</button> 
            </>
            : 
            <> <Link className='ml-4 text-xl' to={"/login"}>Login</Link>
            <Link className='ml-4 text-xl' to={"/signUp"}>SignUp</Link>
            </>
        }  
     </div> 
    </ul>
  </div>
</div>
    </div>
  )
}
