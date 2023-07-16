/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useCreateReviewMutation, useDeleteBookMutation, useGetReviewQuery, useGetSingleBookQuery } from '@/redux/api/apiSlice';
import { useAppSelector } from '@/redux/hook'; 
import { useNavigate, useParams } from 'react-router-dom'
import {useEffect, useState} from 'react'
import {toast} from 'react-toastify'

interface IReviewType {
  review: string;
  user: string;
}

export default function BookDetail() {
    const {id} = useParams();
    const navigate = useNavigate();

    const { user } = useAppSelector((state) => state.user);

    const {data: book, isLoading} = useGetSingleBookQuery(id!);
    const {data: reviews} = useGetReviewQuery(id); 

    const [deleteBook,{data: bookDeleted}] = useDeleteBookMutation();
    const [createReview] = useCreateReviewMutation();

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
        if(user.email === book.userEmail){
            deleteBook(id);
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
        closeConfirmationModal()
    }

    useEffect(()=>{
        if(bookDeleted){
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
    },[bookDeleted])

    const handleReviewSubmit = (event: any) =>{ 
      event?.preventDefault();
      const review = event.target.review.value; 
      if(user.email){ 
        const options = {
          id: id,
          data: {reviews: {review: review, user: user.email}},
        }
        createReview(options);
      }else{
        toast.error('You Are Not Authorized. Login First!', {
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
                    <button onClick={()=> setDeleteBookConfirmation(true)} className="btn btn-error">Delete</button> 
                    </div>
                  </div> 
        }
        </div>
           </div>
        } 
        {/* for review  */}
        <form onSubmit={handleReviewSubmit} className='mt-5 flex justify-center align-top w-full'>
        <textarea name='review' placeholder="Review" className="textarea textarea-bordered textarea-xs w-full max-w-xs" ></textarea>
       <div className='mr-4'>
       <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 mt-10 rounded focus:outline-none focus:shadow-outline"
    >
      Submit
    </button>
       </div>
     <div>
     {
        reviews?.reviews?.map((e: IReviewType)=>{
          return ( 
<section
  className="  text-center  mb-3 md:text-left" >
  <div className="flex justify-center align-middle">
    <div className="max-w-3xl">
      <div
        className="  block rounded-lg bg-white px-6 shadow-lg dark:bg-neutral-800 dark:shadow-black/20"> 
        <div className="md:flex md:flex-row lg:flex ">
          <div
            className="mx-auto mb-1 flex justify-center md:mx-0 m lg:mb-0">
            <h1>{e.user.split('@')[0].replace(/\d+/g, "")}</h1>
          </div>
          <div className="md:ml-6">
            <p
              className="mb-1 font-light text-neutral-500 dark:text-neutral-300">
              {e.review}
            </p> 
          </div>
        </div>
      </div>
    </div>
  </div>

</section>
          )
        })
       }
     </div>
        </form>
        {/* delete confirmation modal  */}
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
