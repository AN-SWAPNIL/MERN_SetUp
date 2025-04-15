import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'

const BooksTable = ({books, setDeleteId, setDeleteBook}) => {
  return (
    <div>
        <table className='w-full border-separate border-spacing-2'>
            <thead>
            <tr>
            <th className='border border-slate-600 rounded-md'>No</th>
            <th className='border border-slate-600 rounded-md'>Image</th>
            <th className='border border-slate-600 rounded-md'>Title</th>
            <th className='border border-slate-600 rounded-md max-md:hidden'>Author</th>
            <th className='border border-slate-600 rounded-md max-md:hidden'>Publish Year</th>
            <th className='border border-slate-600 rounded-md'>Operations</th>
            </tr>
            </thead>
            <tbody>
            {books.map((book, index) => {
                console.log(book.title);
                return (
                <tr key={book._id} className='h-8'>
                    <td className='border border-slate-700 rounded text-center'>
                    {index+1}
                    </td>
                    <td className='border border-slate-700 rounded text-center'>
                    <div className='w-full h-16 bg-gray-200 rounded-lg shadow-md flex justify-center items-center overflow-hidden'>
                        <img src={book.image} 
                        alt={`${book.title} cover`}
                        className="w-3/4 h-18 object-cover object-top"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSConkfAw0DaAyHBVd2fmp5hYo0Vl5mT7NfA&s';
                        }}/>
                    </div>
                    </td>
                    <td className='border border-slate-700 rounded text-center'>
                    {book.title}
                    </td>
                    <td className='border border-slate-700 rounded text-center max-md:hidden'>
                    {book.author}
                    </td>
                    <td className='border border-slate-700 rounded text-center max-md:hidden'>
                    {book.publishYear}
                    </td>
                    <td className='border border-slate-700 rounded text-center'>
                    <div className='flex justify-center gap-x-4'>
                        <Link to={`/books/details/${book._id}`}>
                        <BsInfoCircle className='text-2xl text-green-800'/>
                        </Link>
                        <Link to={`/books/edit/${book._id}`}>
                        <AiOutlineEdit className='text-2xl text-yellow-600'/>
                        </Link>
                        <Link>
                        <MdOutlineDelete className='text-2xl text-red-600' 
                        onClick={() => {
                            setDeleteId(book._id) 
                            setDeleteBook(true)}}/>
                        </Link>
                    </div>
                    </td>
                </tr>
                )})}
            </tbody>
            </table>
    </div>
  )
}

export default BooksTable