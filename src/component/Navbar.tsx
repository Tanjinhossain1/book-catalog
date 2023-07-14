import {Link} from 'react-router-dom'

interface NavigateRouteType{
    name: string;
    path: string;
}
export default function TopNavBar() {
    const navigationRoute:NavigateRouteType[] = [
        {
            name: "Login",
            path: "/login"
        },
        {
            name: "SignUp",
            path: "/signUp"
        },
    ]
  return (
    <div> 
        <div className="navbar bg-purple-500">
  <div className="flex-1">
    <a className="btn btn-ghost normal-case text-2xl text-white">Book Catalog</a>
  </div>
  <div className="flex-none text-white text-4xl">
    <ul className="menu menu-horizontal px-1">
     <div >
     {
            navigationRoute.map((navigate: NavigateRouteType)=>{
                return <Link className='ml-4 text-xl' to={navigate.path}>{navigate.name}</Link>
            })
           }
     </div> 
    </ul>
  </div>
</div>
    </div>
  )
}
