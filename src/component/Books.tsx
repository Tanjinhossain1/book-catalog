/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAddToCompleteReadMutation, useCreateAddToReadMutation, useCreateWishlistMutation, useDeleteWishlistMutation, useGetBooksQuery } from '@/redux/api/apiSlice'
import { IBookTypes, IReadType, IWishListType } from '@/types/book'
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaHeartbeat } from "react-icons/fa";
import { useAppSelector } from '@/redux/hook';
import { toast } from 'react-toastify';

export default function Books({bookDetail,isHome}: {bookDetail?: IBookTypes[],isHome?: boolean}) {
    const { data } = useGetBooksQuery(""); 
    const navigate = useNavigate();

    const {user} = useAppSelector(state => state.user);
    const [createWishlist,{data: wishlist}] = useCreateWishlistMutation(); 
    const [createAddToRead,{data: readStatus}] = useCreateAddToReadMutation(); 
    const [deleteWishlist,{data: deleteConfirm}] = useDeleteWishlistMutation(); 
    const [addToCompleteRead,{data: completeReadStatus}] = useAddToCompleteReadMutation(); 

    const [books,setBooks] = useState<IBookTypes[] | null>(null);  

    // add wish list func 
    const handleWishlistToggle = (id: string) => {
    if(user.email){   
        const options = {
            id: id,
            data: {wishlist: {wishList: true, wishListUser: user.email, wishListId: id}}
        }
        createWishlist(options);
    }else{
        toast.error("You Are Not Authorized", {
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
    };
    // remove wish list func 
    const handleRemoveWishlistToggle = (wishListId: string) => {
        if(user.email){    
            deleteWishlist(wishListId);
        }else{
            toast.error("You Are Not Authorized", {
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
        };

            // add to read func 
    const handleToReadBookToggle = (id: string) => {
        if(user.email){   
            const options = {
                id: id,
                data: {addRead: {isRead: true, readUser: user.email, ReadBookId: id, isComplete: false}}
            }
            createAddToRead(options);
        }else{
            toast.error("You Are Not Authorized", {
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
        };
            // add to read complete
    const handleAddToComplete = (readBookId: string) => {
        if(user.email){    
            addToCompleteRead(readBookId);
        }else{
            toast.error("You Are Not Authorized", {
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
        };

    const OnSearchBooks =(value: string, mode: "search" | "genre filter" | "year filter") =>{
        const searchValue: string = value.toLowerCase();
        const finalBookDetail = bookDetail ? bookDetail : data?.data;

        const filterableBooks = finalBookDetail?.filter((book: IBookTypes)=> mode === "search" ? book.title.toLowerCase().includes(searchValue) || book.author.toLowerCase().includes(searchValue) || book.genre.toLowerCase().includes(searchValue) : mode === "genre filter" ? book.genre.toLowerCase().includes(searchValue) : book.publicationDate.toLowerCase().includes(searchValue)  );

        setBooks(isHome ? filterableBooks.slice(0,10) : filterableBooks);
    }

    useEffect(()=>{
        if(wishlist){
            toast.success("Added WishList", {
                position: "top-center",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }  
    },[wishlist])

    useEffect(()=>{
        if(deleteConfirm){
            toast.warn("Delete Wish List", {
                position: "top-center",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }  
    },[deleteConfirm])

    useEffect(()=>{
        if(readStatus){
            toast.success("Add To Read ", {
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
    },[readStatus])

    useEffect(()=>{
        if(completeReadStatus){
            toast.success("Complete To Read ", {
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
    },[completeReadStatus])

    useEffect(()=>{
        if(data?.data){
            setBooks(bookDetail ? isHome ? bookDetail.slice(0,10) : bookDetail : isHome ? data?.data.slice(0,10) : data?.data)
        }  
    },[data?.data, bookDetail, isHome])

    const OnDetailPage = (id: string) =>{
        navigate(`/bookDetail/${id}`)
    }
    console.log(' books  ', books);
  return (
    <div>
  <form className=" mx-auto w-[80%] gap-10 grid grid-cols-3  px-4 mb-1  ">
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
        <div className=' text-end w-[90%] mb-1'>  
        <Link to="/addNewBook"> 
        <button className="btn btn-primary mt-3">Add New</button> 
        </Link> 
        </div>
    <div className='grid grid-cols-3 w-[90%] mx-auto gap-5'>
        {
            books?.map((book: IBookTypes)=>{ 
                const newList = book?.wishlist?.find((newWish: IWishListType)=> newWish.wishList &&  book._id === newWish.wishListId && user.email === newWish.wishListUser )

                const newAddReadList = book?.addRead?.find((newWish: IReadType)=> newWish.isRead &&  book._id === newWish.ReadBookId && user.email === newWish.readUser )
                return(
                    <div className="bg-white px-10 py-3 rounded-lg shadow-md border-2 ">
                    <h1 className=""><span className="text-xl font-bold text-black ">Name:</span> {book.title}</h1>
                    <h3 className="text-xs uppercase"><span className='font-bold text-gray-600'>Author: </span> {book.author}</h3>
                    <h2 className="tracking-wide">
                    <span className='font-bold text-gray-600'> Genre: </span>{book.genre}
                      <br />
                      <span className='font-bold text-gray-600'>Publication Date: </span> {book.publicationDate}
                    </h2> 
                  <div className='flex   '>
                  <div className=''>
                                
                <button onClick={() =>OnDetailPage(book._id as string)}  className="btn btn-outline btn-primary mr-3 mt-3">View Detail</button> 
                {user.email === newList?.wishListUser && book._id === newList.wishListId && newList.wishList ?
                 <button
                 onClick={() => handleRemoveWishlistToggle(newList?.wishListId)}
                 className={` items-center inline bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300 focus:outline-none focus:ring`}
                > 
                     <FaHeartbeat   /> 
                </button>  
                 :
                <button
                onClick={() => handleWishlistToggle(book._id as string)}
                className={`  items-center inline bg-gray-500  hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300 focus:outline-none focus:ring`}
                > 
                <FaHeart  /> 
                </button>  
                }
                </div>
                <div className='mt-4 ml-3'>
                {user.email === newAddReadList?.readUser && book._id === newAddReadList.ReadBookId && newAddReadList.isRead ?
                newAddReadList.isComplete ? <button 
                className={` items-center inline bg-green-600 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300 focus:outline-none focus:ring`}
               > 
                  Complete
               </button>  :
                <button 
                onClick={()=>handleAddToComplete(newAddReadList.ReadBookId)}
                 className={` items-center inline bg-green-600 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300 focus:outline-none focus:ring`}
                > 
                    Read...(Complete?)
                </button>  
                 :
                <button
                onClick={() => handleToReadBookToggle(book._id as string)}
                className={`  items-center inline bg-red-300  hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300 focus:outline-none focus:ring`}
                > 
                 Add To Read
                </button>  
                }   
                </div> 
                  </div>
                     
                   
                  </div>
                ) 
            })
        }
        {
            isHome ? 
        <div className='mt-16'>
           <Link to={"/allBooks"}> <h1 className='text-2xl underline font-bold'>see more</h1></Link>
        </div>
            : null
        }
        </div>
    </div>
  )
}
