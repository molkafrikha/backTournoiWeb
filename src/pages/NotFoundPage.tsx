import { Link } from "react-router-dom"

const NotFoundPage = () => {
    return (
        <div className="bg-neutral-900 flex-col h-screen flex items-center justify-center">
            <span className="text-orange-600 font-extrabold font-primary text-5xl">404 Not Found</span>
            <span className="text-white text-xl font-bold my-3 font-primary">You seem lost, press the button below to go back!</span>
            <Link to="/" className="p-3 bg-orange-600 text-white font-normal font-semibold text-xl mt-3 flex justify-center items-center md:w-1/2 w-4/5 hover:bg-orange-700 transition-colors">Go Back</Link>
        </div>
    )
}

export default NotFoundPage