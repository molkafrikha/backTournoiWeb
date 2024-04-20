import { Link } from "react-router-dom"
import { useParams } from "react-router-dom";

const Sidebar = () => {
    const { id } = useParams();
    const navlink = "py-4 px-4 text-xl hover:bg-neutral-800 text-center rounded-md"

    return (
        <div className="px-auto flex w-full">
            <div className="flex flex-row bg-neutral-600 px-auto py-2 flex-grow justify-center">
                <Link to={`/tournament-profile/${id}`} className={navlink}><div>Tournament</div></Link>
                <Link to={`/tournament-profile/${id}/bracket`} className={navlink}>Brackets</Link>
                <Link to={`/tournament-profile/${id}/calendar`} className={navlink}>Calendar</Link>
            </div>
        </div>

    )
}

export default Sidebar