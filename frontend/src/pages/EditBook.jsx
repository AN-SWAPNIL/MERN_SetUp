import React, { useState, useEffect } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5000/books/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setPublishYear(res.data.publishYear);
        setImage(res.data.image);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        alert('Something went wrong! Check console!');
      })
  }, [])
  
  const handleBookEdit = () => {
    setLoading(true);
    const book = {
      title,
      author,
      publishYear,
      image
    }
    axios.put(`http://localhost:5000/books/${id}`, book)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book updated successfully!', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar('Something went wrong! Check console!', { variant: 'error' });
        setLoading(false);
        // alert('Something went wrong! Check console!');
      })
  }

  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4 text-center'>Edit Book</h1>
      {loading? <Spinner/> : ''}
      <div className='flex justify-center items-center w-full'>
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Title</label>
            <input type="text" value={title} onChange={(e) => {setTitle(e.target.value)}} 
            className="border-2 border-gray-500 px-4 py-2 w-full"/>
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Author</label>
            <input type="text" value={author} onChange={(e) => {setAuthor(e.target.value)}} 
            className="border-2 border-gray-500 px-4 py-2 w-full"/>
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
            <input type="text" value={publishYear} onChange={(e) => {setPublishYear(e.target.value)}} 
            className="border-2 border-gray-500 px-4 py-2 w-full"/>
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Image</label>
            <input type="text" value={image} onChange={(e) => {e.target.value.length>0 ? setImage(e.target.value) : setImage(undefined)}} 
            className="border-2 border-gray-500 px-4 py-2 w-full"/>
          </div>
          <button className='bg-sky-300 px-4 py-2 m-8 rounded-2xl' onClick={handleBookEdit}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditBook