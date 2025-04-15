import React, { /*createContext,*/ useState, useEffect } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import { MdOutlineAddBox } from 'react-icons/md'
import DeleteBook from './DeleteBook'
import BooksCard from '../home/BooksCard'
import BooksTable from '../home/BooksTable'
import { enqueueSnackbar } from 'notistack'
// export const GlobalContext = createContext();

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteBook, setDeleteBook] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [showType, setShowType] = useState('card'); // 'card' or 'table'

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5000/books')
      .then((res) => {
        setBooks(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar('Something went wrong! Check console!', { variant: 'error' });
        setLoading(false);
      }); 
  }, []);

  const handleDeleteBook = async (isDeleted) => {
    if(isDeleted) {
      setBooks(books.filter((book) => book._id !== deleteId));
    }
    setDeleteBook(false);
    setDeleteId('');
  }

  return (
    // <GlobalContext.Provider value={{ books, setBooks }}>
    <div className='p-4'>
      <div className="flex justify-center items-center gap-x-20 gap-x-auto">
        <button
          onClick={() => setShowType('card')}
          className={`flex flex-row bg-sky-300 hover:bg-sky-800 px-4 py-2 rounded-lg ${showType === 'card' ? 'bg-sky-600' : ''}`}
        >Card View</button>

        <button
          onClick={() => setShowType('table')}
          className={`flex flex-row bg-sky-300 hover:bg-sky-800 px-4 py-2 rounded-lg ${showType === 'table' ? 'bg-sky-600' : ''}`}
        >Table View</button>
      </div>
      <div className='flex justify-between items-center mx-4'>
      <h1 className='text-3xl my-8'>Books List</h1>
      <Link to='/books/create'>
        <MdOutlineAddBox className='text-sky-800 text-4xl'/>
      </Link>
      </div>
      { loading ? <Spinner /> : (
        showType=='table'? <BooksTable books={books} setDeleteBook={setDeleteBook} setDeleteId={setDeleteId}/> :
        <BooksCard books={books} setDeleteBook={setDeleteBook} setDeleteId={setDeleteId}/>
      )}
      {deleteBook && (
        <DeleteBook id={deleteId} onDeleteResult={handleDeleteBook}/>
      ) }
    </div>
    // </GlobalContext.Provider>
  )
}

export default Home