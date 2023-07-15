/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetBooksQuery } from '@/redux/api/apiSlice'
import { IBookTypes } from '@/types/book'
import { useEffect, useState } from 'react';

export default function Books() {
    const { data } = useGetBooksQuery(""); 
    const [books,setBooks] = useState<IBookTypes[] | null>(null);
    
    const OnSearchBooks =(value: string, mode: "search" | "genre filter" | "year filter") =>{
        const searchValue: string = value.toLowerCase();

        const filterableBooks = data?.data?.filter((book: IBookTypes)=> mode === "search" ? book.title.toLowerCase().includes(searchValue) || book.author.toLowerCase().includes(searchValue) || book.genre.toLowerCase().includes(searchValue) : mode === "genre filter" ? book.genre.toLowerCase().includes(searchValue) : book.publicationDate.toLowerCase().includes(searchValue)  );

        setBooks(filterableBooks);
    }

    useEffect(()=>{
        if(data?.data){
            setBooks(data?.data)
        }  
    },[data?.data])
  return (
    <div>
  <form className=" mx-auto w-[80%] gap-10 grid grid-cols-3  px-4 mb-4  ">
            <div className="relative ">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
                <input
                onChange={(e)=> OnSearchBooks(e.target.value, "search")}
                    type="text"
                    placeholder="Search"
                    className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                /> 
            </div>
            <div className=" "> 
            <select   onChange={(e)=> OnSearchBooks(e.target.value, "genre filter")} placeholder='Select Genre' className="select select-bordered focus:border-primary w-full">
            <option value="" disabled selected hidden>Select Genre</option>
                {
                       data?.data?.map((book: IBookTypes)=>{
                        return <option>{book.genre}</option> 
                       })   
                }
           
            </select>
            </div>
            <div className=" "> 
            <select   onChange={(e)=> OnSearchBooks(e.target.value, "year filter")} placeholder='Select Publication Year' className="select select-bordered focus:border-primary w-full">
            <option value="" disabled selected hidden>Select Publication Year</option>
                {
                       data?.data?.map((book: IBookTypes)=>{
                        return <option>{book.publicationDate}</option> 
                       })   
                }
           
            </select>
            </div>
        </form>
    <div className='grid grid-cols-3 w-[80%] mx-auto gap-5'>
        {
            books?.map((book: IBookTypes)=>{
                return(
                    <div className="bg-white p-10 rounded-lg shadow-md border-2 ">
                    <h1 className=""><span className="text-xl font-bold text-black ">Name:</span> {book.title}</h1>
                    <h3 className="text-xs uppercase"><span className='font-bold text-gray-600'>Author: </span> {book.author}</h3>
                    <h2 className="tracking-wide">
                    <span className='font-bold text-gray-600'> Genre: </span>{book.genre}
                      <br />
                      <span className='font-bold text-gray-600'>Publication Date: </span> {book.publicationDate}
                    </h2>
                  </div>
                ) 
            })
        }
        </div>
    </div>
  )
}
