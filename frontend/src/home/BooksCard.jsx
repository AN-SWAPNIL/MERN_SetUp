import React from 'react';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom'; // Import Link here

const BooksCard = ({books, setDeleteId, setDeleteBook}) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {books.map((book) => {
        return (
          <div key={book._id} className='border-2 border-gray-500 rounded-lg px-2 py-2 m-4 relative hover:shadow-xl justify-center items-center'>
            <h2 className='absolute top-4 right-4 px-4 py-1 bg-red-300 rounded-lg'>{book.publishYear}</h2>
            <div className='w-full h-48 bg-gray-200 rounded-lg shadow-md flex justify-center items-center overflow-hidden'>
              <img 
                src={book.image} 
                alt={`${book.title} cover`}
                className="w-3/4 h-64 object-cover object-top"
              />
            </div>
            <div className='flex justify-start items-center gap-x-2 mt-2'>
              <PiBookOpenTextLight className='text-red-300 text-2xl'/>
              <h2 className='my-1'>{book.title}</h2>
            </div>
            <div className='flex justify-start items-center gap-x-2'>
              <BiUserCircle className='text-red-300 text-2xl'/>
              <h2 className='my-1'>{book.author}</h2>
            </div>
            <div className='flex justify-between items-center gap-x-2 mt-2 p-4'>
              <Link to={`/books/details/${book._id}`}>
              <BsInfoCircle className='text-2xl text-green-800 hover:text-black'/>
              </Link>
              <Link to={`/books/edit/${book._id}`}>
              <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-black'/>
              </Link>
              <Link>
              <MdOutlineDelete className='text-2xl text-red-600 hover:text-black' 
              onClick={() => {
                  setDeleteId(book._id) 
                  setDeleteBook(true)}}/>
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )}

export default BooksCard