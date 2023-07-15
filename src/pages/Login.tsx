/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {useEffect} from "react";
import TopNavBar from "@/component/Navbar";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { loginUser } from "@/redux/sliceReducers/userSliceReducer";
import {Link,useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

 
export default function Login() {
    const dispatch = useAppDispatch();  
  const { user, isLoading } = useAppSelector((state) => state.user); 
  const {error} = useAppSelector(state=>state.user);

  const navigate = useNavigate(); 

    useEffect(() => {
        if(error){
            if(error === "Firebase: Error (auth/user-not-found)."){
                toast.error('First Create Account. This User Not Found', {
                    position: "top-right",
                    autoClose: 10000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    }); 
        }else if(error === "Firebase: Error (auth/wrong-password)."){
            toast.error('Your Password Is Incorrect', {
                position: "top-right",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                }); 
        }
     }
    }, [error])
    


  useEffect(() => {
    if (user.email && !isLoading) {
      navigate("/");
    }
  }, [user.email, isLoading]);

    const SubmitForm = (event: any) =>{ 
        event?.preventDefault()
        const email = event.target.email.value;
        const password = event.target.password.value; 
         
    dispatch(loginUser({email: email,password: password}))
    }
  return (
   <>
   <TopNavBar />
    <div className="bg-purple-100">
         <div className="relative flex flex-col justify-center h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-purple-500  rounded-md shadow-md lg:max-w-xl">
            <h1 className="text-3xl font-semibold text-center text-white">LOGIN</h1>
            <form onSubmit={SubmitForm} className="space-y-4 "> 
                <div>
                    <label className="label">
                        <span className="text-base label-text text-white">Email</span>
                    </label>
                    <input type="text" name="email" placeholder="Email Address" className="w-full input input-bordered input-primary" />
                </div>
                <div>
                    <label className="label">
                        <span className="text-base label-text text-white">Password</span>
                    </label>
                    <input type="password" name="password" placeholder="Enter Password"
                        className="w-full input input-bordered input-primary" />
                </div> 
                <div>
                    <button type="submit" className="btn btn-block btn-primary">Login</button>
                </div>
                <span className="text-white">Create an account?
                    <Link to="/signUp" className=" text-white underline ml-1">SignUp</Link></span>
            </form>
        </div>
    </div>
    </div>
   </>
  )
}
