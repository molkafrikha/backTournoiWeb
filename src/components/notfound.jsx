import { Link } from "react-router-dom"

const NotFoundPage = () => {
    return (
        <div className="bg-grey-900 flex-col h-screen flex items-center justify-center">
            <span className="text-green-600 font-extrabold font-primary text-5xl">404 Not Found</span>
            <span className="text-white text-xl font-bold my-3 font-primary">You seem lost!</span>
            
        </div>
    )
}

export default NotFoundPage