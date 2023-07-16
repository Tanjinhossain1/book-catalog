import Books from "@/component/Books"; 

 
export default function Home() {
  return (
    <div>   
      <div
      className="bg-gradient-to-r mb-5 from-purple-800 via-pink-700 to-red-600 py-16 px-4 sm:px-8 lg:px-16 xl:px-24"
    >
      <div className="container mx-auto">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Discover the World of Books</h1>
          <p className="text-lg text-gray-200 mb-8">
            Immerse yourself in captivating stories, knowledge, and imagination.
          </p>
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full shadow-md transition-colors duration-300">
            Explore Now
          </button>
        </div>
      </div>
    </div>
        <Books isHome />
    </div>
  )
}
