/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Books from '@/component/Books';
import {  useGetWishListQuery } from '@/redux/api/apiSlice';
import { useAppSelector } from '@/redux/hook'; 

export default function Wishlist() {
    const {user} = useAppSelector(state=>state.user);

    const { data, isLoading } = useGetWishListQuery(user.email); 
    console.log('first data in wish list ', data);

  return (
    <div>
         <h2 className='text-2xl text-center font-bold'>Wish List</h2>
        <br />
        {
            isLoading ? <div className='text-center'>
                <span className="loading loading-spinner loading-lg"></span>
            </div> : data &&
        <Books bookDetail={data} />
        }
    </div>
  )
}
