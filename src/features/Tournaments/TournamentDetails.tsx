import { format } from "date-fns";
import { useParams } from "react-router-dom"
import Spinner from "../../utils/Spinner/Spinner";
import { useGetParticipantsQuery, useGetTournamentQuery } from "./tournamentsSlice";

const TournamentDetails = () => {
    const { id } = useParams();
    const { data: tournament, isLoading: isLoading1, isError: isError1, error: error1 } = useGetTournamentQuery(id!);
    const { data: particiapnts, isLoading, error, isError } = useGetParticipantsQuery(id!);
    console.log(particiapnts)
    console.log(tournament)
    return (
        <section className="font-normal justify-center flex items-center h-screen p-10 ">
            {isLoading1 ? <Spinner /> : <div className="flex flex-col p-2 justify-around w-4/5 shadow-2xl text-center drop-shadow-xl h-full bg-neutral-600 items-center">
                <h2 className="text-5xl font-bold  items-center text-orange-600">{tournament?.data.tournament.name}</h2>
                <h3 className="text-2xl font-semibold">{tournament?.data.tournament.game}</h3>
                <h4 className=" animate-pulse text-xl">The tournament begins at: {format(new Date(tournament?.data.tournament.startTime!), "dd-MM-yyyy")}</h4>
                <h5>fees:{tournament?.data.tournament.cost}</h5>
                <h6>Number Of teams: {tournament?.data.tournament.numberOfTeams}</h6>

                {isLoading ? <Spinner /> : <div> <span>Participants:</span>
                    <div className=" flex flex-col items-center justify-center text-center">
                        {particiapnts?.participants.map(participant => {
                            return (<span className="text-center">{participant.user.name}</span>)
                        })}
                    </div></div>}
                <span>Owner: {tournament?.data.owner.name}</span>

            </div>}

        </section>
    )
}

export default TournamentDetails