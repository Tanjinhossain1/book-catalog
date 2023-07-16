/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */ 
import { IBookTypes } from "@/types/book";

interface BookFormPropsType {
    isLoading: boolean,
    buttonText: string
    bookDetail?: IBookTypes
}
export default function BookForm({isLoading,bookDetail, buttonText}: BookFormPropsType) { 
  return (
    <div> 
        <div className="mb-4">
          <label htmlFor="title" className="block font-semibold mb-1 text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title" 
            defaultValue={bookDetail?.title}
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
            defaultValue={bookDetail?.author}
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
            defaultValue={bookDetail?.genre}
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
            defaultValue={bookDetail?.publicationDate}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
       
        <button
        disabled={isLoading}
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        > {
          isLoading ?
          <><span className="loading loading-spinner loading-xs"></span> </>
           : 
         <span>{buttonText}</span>
        }
        </button>
     </div>
  )
}
