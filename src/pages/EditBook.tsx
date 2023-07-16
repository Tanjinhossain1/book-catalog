/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import BookForm from '@/component/BookForm';
import { useGetSingleBookQuery, useUpdateBookMutation } from '@/redux/api/apiSlice';
import { useAppSelector } from '@/redux/hook'; 
import  {useEffect} from 'react'
import { useParams } from 'react-router-dom';
import {toast} from 'react-toastify'

export default function EditBook() {
    const {id} = useParams();
    const {data: book} = useGetSingleBookQuery(id!);

const [updateBook,{data, isLoading}] = useUpdateBookMutation();
const { user } = useAppSelector((state) => state.user);


const handleSubmit = (event: any) =>{
    event?.preventDefault()
    const title = event.target.title.value;
    const author = event.target.author.value;
    const genre = event.target.genre.value;
    const publicationDate = event.target.title.value;
    if(user.email === book.userEmail){
        const options = {
           id: id,
           data: { title: title,
            author: author,
            genre: genre,
            publicationDate: publicationDate,
            userEmail: user.email,}
        }
        updateBook(options);
    }else{
        toast.error("You Don't Have Access", {
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

useEffect(()=>{
    if(data){
 toast.success('Add New Books Complete!', {
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
},[data]);

  return (
    <div  
    className="max-w-md mx-auto mt-10 p-6 bg-white   rounded shadow-md">
   <h2 className="text-2xl font-bold mb-6">Edit Book</h2>
   <form onSubmit={handleSubmit} >
     <BookForm buttonText='Edit Book' bookDetail={book} isLoading={isLoading} />
   </form>
 </div>
  )
}
