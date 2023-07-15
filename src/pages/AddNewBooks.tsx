/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {useEffect} from "react"
import {toast} from "react-toastify"
import { useCreateBookMutation } from '@/redux/api/apiSlice' 

export default function AddNewBooks() {
  const [createBook,{data}] = useCreateBookMutation()

const handleSubmit = (event: any) =>{
    event?.preventDefault()
    const title = event.target.title.value;
    const author = event.target.author.value;
    const genre = event.target.genre.value;
    const publicationDate = event.target.title.value;

    const options = {
        title: title,
        author: author,
        genre: genre,
        publicationDate: publicationDate
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
       className="max-w-md mx-auto p-6 bg-white   rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add a New Book</h2>
      <form onSubmit={handleSubmit} >
        <div className="mb-4">
          <label htmlFor="title" className="block font-semibold mb-1 text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title" 
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="author" className="block font-semibold mb-1 text-gray-700">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author" 
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="genre" className="block font-semibold mb-1 text-gray-700">
            Genre
          </label>
          <input
            type="text"
            id="genre"
            name="genre" 
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="publicationDate" className="block font-semibold mb-1 text-gray-700">
            Publication Date
          </label>
          <input
            type="text"
            id="publicationDate"
            name="publicationDate" 
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Book
        </button>
      </form>
    </div>
    </div>
  )
}
