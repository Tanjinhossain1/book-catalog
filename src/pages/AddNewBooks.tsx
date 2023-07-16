/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {useEffect} from "react"
import {toast} from "react-toastify"
import { useCreateBookMutation } from '@/redux/api/apiSlice' 
import { useAppSelector } from "@/redux/hook";
import { IBookTypes } from "@/types/book";
import BookForm from "@/component/BookForm";

export default function AddNewBooks() {
  const [createBook,{data, isLoading}] = useCreateBookMutation();
  const { user } = useAppSelector((state) => state.user);


const handleSubmit = (event: any) =>{
    event?.preventDefault()
    const title = event.target.title.value;
    const author = event.target.author.value;
    const genre = event.target.genre.value;
    const publicationDate = event.target.publicationDate.value;

    const options: IBookTypes = {
        title: title,
        author: author,
        genre: genre,
        publicationDate: publicationDate,
        userEmail: user.email,
    }
   
    
    createBook(options);
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
},[data])
  return (
    <div>
      <div  
       className="max-w-md mx-auto mt-10 p-6 bg-white   rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add a New Book</h2>
      <form onSubmit={handleSubmit} >
        <BookForm buttonText="Add Book" isLoading={isLoading} />
      </form>
    </div>
    </div>
  )
}
