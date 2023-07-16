/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Books from '@/component/Books';
import {  useGetAddToReadQuery } from '@/redux/api/apiSlice';
import { useAppSelector } from '@/redux/hook'; 

export default function ReadIn() {
    const {user} = useAppSelector(state=>state.user);

    const { data, isLoading } = useGetAddToReadQuery(user.email);  

  return (
    <div>
         <h2 className='text-2xl text-center font-bold'>Reading Books</h2>
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
