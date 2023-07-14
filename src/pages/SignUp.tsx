/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import TopNavBar from "@/component/Navbar";
import { useAppDispatch } from "@/redux/hook";
import { userCreate } from "@/redux/sliceReducers/userSliceReducer";
import {Link} from "react-router-dom"

 
export default function SignUp() {
    const dispatch = useAppDispatch()
    const SubmitForm = (event: any) =>{
        event?.preventDefault()
        const email = event.target.email.value;
        const password = event.target.password.value;
        const confirmPassword = event.target.confirmPassword.value;
         
    dispatch(userCreate({email: email,password: password}))
    }
  return (
   <>
   <TopNavBar />
    <div className="bg-purple-100">
         <div className="relative flex flex-col justify-center h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-purple-500  rounded-md shadow-md lg:max-w-xl">
            <h1 className="text-3xl font-semibold text-center text-white">DaisyUI</h1>
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
                    <label className="label">
                        <span className="text-base label-text text-white">Confirm Password</span>
                    </label>
                    <input type="password" name="confirmPassword" placeholder="Confirm Password"
                        className="w-full input input-bordered input-primary" />
                </div>
                <div>
                    <button type="submit" className="btn btn-block btn-primary">Sign Up</button>
                </div>
                <span className="text-white">Already have an account?
                    <Link to="/login" className=" text-white underline ml-1">Login</Link></span>
            </form>
        </div>
    </div>
    </div>
   </>
  )
}
