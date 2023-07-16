/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useDeleteBookMutation, useGetSingleBookQuery } from '@/redux/api/apiSlice';
import { useAppSelector } from '@/redux/hook'; 
import { useNavigate, useParams } from 'react-router-dom'
import {useEffect, useState} from 'react'
import {toast} from 'react-toastify'

export default function BookDetail() {
    const {id} = useParams();
    const navigate = useNavigate();

    const { user } = useAppSelector((state) => state.user);
    const {data: book, isLoading} = useGetSingleBookQuery(id!);
    const [deleteBook,{data}] = useDeleteBookMutation();

    const [deleteBookConfirmation,setDeleteBookConfirmation] = useState<boolean>(false)

    const EditAction = () =>{ 
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
    const closeConfirmationModal = () =>{
        setDeleteBookConfirmation(false)
    }
    const handleDelete = () =>{ 
        deleteBook(id)
        closeConfirmationModal()
    }

    useEffect(()=>{
        if(data){
     toast.success('Delete The Book!', {
            position: "top-right",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        navigate('/')
        }
    },[data])

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
                    <button onClick={()=> setDeleteBookConfirmation(true)} className="btn btn-error">Delete</button> 
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

        {
            deleteBookConfirmation &&  <div
            className={`fixed inset-0 z-10 flex items-center justify-center transition-opacity ${
                deleteBookConfirmation ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div className="fixed inset-0 bg-black opacity-75"></div>
            <div className="z-20 bg-white rounded shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
              <p className="text-gray-700 mb-4">Are you sure you want to delete this item?</p>
              <div className="flex justify-end">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded mr-2"
                  onClick={closeConfirmationModal}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        }
    </div>
  )
}
