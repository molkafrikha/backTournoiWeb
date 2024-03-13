import { useLocation } from "react-router-dom"

const Logo = () => {
    const location = useLocation();
    return (
        <h1 className={` font-primary text-white mr-3 font-bold ${location.pathname === "/login" || location.pathname === "/signup" ? "mb-6" : null} text-4xl`}> <span className='text-orange-600'>T</span><span className={location.pathname === "/signup" || location.pathname === "/login" ? '' : 'hidden md:inline'}>ournify</span></h1>
    )
}

export default Logo