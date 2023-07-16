/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useGetSingleBookQuery } from '@/redux/api/apiSlice';
import { useAppSelector } from '@/redux/hook';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {toast} from 'react-toastify'

export default function BookDetail() {
    const {id} = useParams();
    const navigate = useNavigate()
    const { user } = useAppSelector((state) => state.user);
    const {data: book, isLoading} = useGetSingleBookQuery(id!);
    const EditAction = () =>{
        console.log('first email ',user.email == book.userEMail, user.email, book.userEmail)
        if(user.email === book.userEmail){
            navigate(`/editBook/${id as string}`)
        }else{
            toast.error("This Is Not Your Book. Make First ", {
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
  return (
    <div>
        {
            isLoading ? <div className='text-center'><span className="loading loading-spinner loading-lg"></span></div> :

           <div>
            <div className=' w-[30%] mx-auto gap-5'>
        { 
                    <div className="bg-white px-10 py-3 rounded-lg shadow-md border-2 ">
                    <h1 className="mb-2"><span className="text-xl font-bold text-black ">Name:</span> {book.title}</h1>
                    <h3 className="text-xs uppercase mb-2"><span className='font-bold text-gray-600'>Author: </span> {book.author}</h3>
                    <h2 className="tracking-wide mb-2">
                    <span className='font-bold text-gray-600'> Genre: </span>{book.genre}
                    </h2>  
                    <h2 className='mb-2'> 
                      <span className='font-bold text-gray-600'>Publication Date: </span> {book.publicationDate}
                    </h2>
                    <div>
                    <button onClick={EditAction} className="btn btn-outline btn-primary mt-3 mr-5">Edit</button>  
                    <button className="btn btn-error">Delete</button> 
                    </div>
                  </div> 
                
        }
        </div>
           </div>
        } 
        <div className='mt-5'>
            
<section
  className="rounded-md p-6 text-center shadow-lg md:p-12 md:text-left mb: 4" >
  <div className="flex justify-center">
    <div className="max-w-3xl">
      <div
        className="  block rounded-lg bg-white px-6 shadow-lg dark:bg-neutral-800 dark:shadow-black/20"> 
        <div className="md:flex md:flex-row lg:flex ">
          <div
            className="mx-auto mb-1 flex    justify-center md:mx-0 m lg:mb-0">
            <h1>Name</h1>
          </div>
          <div className="md:ml-6">
            <p
              className="mb-1 font-light text-neutral-500 dark:text-neutral-300">
              Lorem ipsum dolor, sit amet consectetur  
            </p> 
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
        </div>
    </div>
  )
}
