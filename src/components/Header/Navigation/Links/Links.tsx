import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../../../app/hooks";
import { clickButton } from "../../../../app/utilsSlice";
import Link from "./Link/Link"

const Links = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const onClickHandler = () => {
        dispatch(clickButton());
    }
    return (
        <ul className="flex justify-around w-full items-center">
            <li>
                <div onClick={onClickHandler} className="text-white group cursor-pointer  h-full w-full md:hidden  ">
                    <span className="group-hover:text-green-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>

                    </span>
                </div>
            </li>
            <li>
                <Link path="/" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>} text="Home" />
            </li>
            
            <li>
                <Link path="/messages" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z" />
                    <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                </svg>}
                    text="Inbox" />
            </li>
            <li>
                <Link path="/notifications" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>} text="Notifications" />
            </li>
            <li>
                <Link path="/addNewTournament" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>} text="New Tournament"></Link>
            </li>
            <li >
                <div onClick={() => { sessionStorage.removeItem("accessToken"); navigate("/login") }} className="text-white group cursor-pointer  h-full w-full flex flex-col justify-center items-center ">
                    <span className="group-hover:text-green-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>

                    </span>
                    <span className=" text-xs hidden md:inline  group-hover:text-green-600 transition-colors">Logout</span>

                </div>
            </li>

            <li>
                {/* Ajoutez votre lien de profil ici */}
                <Link path="/users/:id" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a4 4 0 100 8 4 4 0 000-8zM7 10a3 3 0 116 0 3 3 0 01-6 0z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M10 4a6 6 0 00-6 6c0 2.123 1.104 3.845 2.503 5.185a9.343 9.343 0 005.994 2.332 9.343 9.343 0 005.994-2.332C14.896 13.845 16 12.123 16 10a6 6 0 00-6-6zM2 10a8 8 0 1116 0 8 8 0 01-16 0z" clipRule="evenodd" />
                </svg>} text="Profile" />
            </li>
        </ul>
    )
}

export default Links