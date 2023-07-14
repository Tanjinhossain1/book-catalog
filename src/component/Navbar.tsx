import { auth } from '@/libs/firebase';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setUser } from '@/redux/sliceReducers/userSliceReducer';
import { signOut } from 'firebase/auth';
import {Link} from 'react-router-dom'
 
export default function TopNavBar() {
    const { user } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const handleLogout =  () => { 
       signOut(auth).then(() => {
        console.log('first')
        dispatch(setUser(null));
      }).catch((err: any)=>{
        console.log(err)
      })
    }; 

  return (
    <div> 
        <div className="navbar bg-purple-500">
  <div className="flex-1">
    <a className="btn btn-ghost normal-case text-2xl text-white">Book Catalog</a>
  </div>
  <div className="flex-none text-white text-4xl">
    <ul className="menu menu-horizontal mr-6 px-1">
     <div>
        {
            user.email ? 
            <button onClick={handleLogout} className='ml-4 text-xl'>LogOut</button> : 
            <> <Link className='ml-4 text-xl' to={"/login"}>Login</Link>
            <Link className='ml-4 text-xl' to={"/signUp"}>SignUp</Link></>
        }  
     </div> 
    </ul>
  </div>
</div>
    </div>
  )
}
