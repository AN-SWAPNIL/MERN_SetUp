import { Link } from "react-router-dom"
import { BsArrowLeft } from "react-icons/bs"

const BackButton = ({ destination = '/' }) => {
  return (
    <div className="flex">
        <Link to={destination}
        className='flex bg-sky-800 text-white px-4 py-1 rounded-lg w-fit justify-between items-center gap-x-2'>
            <BsArrowLeft className="text-2xl"/> Back
        </Link>
    </div>
  )
}

export default BackButton