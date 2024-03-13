import { format, formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import { Data } from "../Users/types";
import JoinButton from "./JoinButton";
type Props = {
    id: string
    name: string,
    image_path: string,
    country: string,
    birthday: Date;
    owner : string;
}

const SingleTeam = (props: Props) => {
    console.log(props.id)
    return (
        <div className="bg-neutral-500  font-normal shadow-2xl w-4/5 md:w-2/3 my-3 p-3 grid gap-1 grid-rows-3 grid-cols-3" >
            <h3 className=" col-span-3 font-bold text-xl  flex justify-center items-center">{props.name}</h3>
            <h4 className="  text-center   font-bold col-span-3">Country: {props.country}</h4>
            <span className="col col-span-3 p-3 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1 text-orange-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg> Start Date : {format(new Date(props.birthday), "dd-MM-yyyy")}</span>
            {/*<Link to={`/tournaments/${props.id}`} className='p-2 text-center  hover:text-orange-700 transition-colors col-start-2 col-end-3 justify-end'>See full details</Link>
            <JoinButton tournamentId={props.id} />*/}
        </div>
    )
}

export default SingleTeam