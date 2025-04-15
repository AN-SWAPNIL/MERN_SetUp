import React, { useState } from 'react'
import axios from 'axios'
import { FaArrowLeft } from 'react-icons/fa'
import { enqueueSnackbar } from 'notistack'

const DeleteBook = ({id, onDeleteResult}) => {
  const [loading, setLoading] = useState(false)

  const handleDeleteBook = async () => {
    setLoading(true)
    try {
      await axios.delete(`http://localhost:5000/books/${id}`)
      enqueueSnackbar('Book deleted successfully!', { variant: 'success' })
      setLoading(false)
      onDeleteResult(true)
    } catch (error) {
      console.error(error)
      enqueueSnackbar('Something went wrong! Check console!', { variant: 'error' })
      setLoading(false)
      onDeleteResult(false)
    }
  }

  return (
    <div
      className='fixed bg-black/60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
      onClick={() => onDeleteResult(false)}
    >
      <div 
        className="bg-white p-6 rounded-lg w-96 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
        <p>Are you absolutely sure you want to delete this book? This action cannot be undone.</p>
        <div className="flex justify-end gap-x-4 mt-6">
          <button
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 hover:shadow-md transition"
            onClick={() => onDeleteResult(false)}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-900 hover:shadow-md transition"
            onClick={handleDeleteBook}
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )}


export default DeleteBook