import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { enqueueSnackbar } from 'notistack'

const ShowBook = () => {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5000/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar('Something went wrong! Check console!', { variant: 'error' });
        setLoading(false);
      })
    return () => {
      
    }
  }, [])
  

  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4 text-center'>Show Book</h1>
      {loading? (
        <Spinner/>
      ) : (
        <div className='flex justify-center items-center w-full'>
          <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
            <div className='my-4'>
              <div className='w-fit h-200 mx-auto'>
                <img src={book.image} 
                  alt={`${book.title} cover`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSConkfAw0DaAyHBVd2fmp5hYo0Vl5mT7NfA&s';
                  }}/>
              </div>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Id</span>
              <span>{book._id}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Title</span>
              <span>{book.title}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Author</span>
              <span>{book.author}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
              <span>{book.publishYear}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Create Time</span>
              <span>{new Date(book.createdAt).toString()}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Update Time</span>
              <span>{new Date(book.updatedAt).toString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowBook