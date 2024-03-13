import { useParams } from "react-router-dom"
import Spinner from "../../utils/Spinner/Spinner";
import SingleTournament from "../Tournaments/SingleTournament";
import { useGetTournamentsByIdQuery } from "../Tournaments/tournamentsSlice";
import { useGetUserQuery } from "./UsersSlice";

const UserProfile = () => {
    const { id } = useParams();
    const { data: user, isLoading, error, isError } = useGetUserQuery(id!)
    const { data: tournaments, isLoading: isLoading2, error: error2, isError: isError2 } = useGetTournamentsByIdQuery(id!);
    const tournamentsList = tournaments?.tournaments.map(tournament => {
        return (
            <SingleTournament owner={tournament.owner} ownerId={tournament.ownerId} cost={tournament.cost} game={tournament.game} name={tournament.name} numberOfTeams={tournament.numberOfTeams} createdAt={tournament.createdAt} startTime={tournament.startTime} key={tournament.id} id={tournament.id} />
        )

    })
    return (
        <section className="flex min-h-screen w-full p-3 font-normal justify-center items-center flex-col">
            {isLoading ? null : <h2 className="text-3xl font-bold">{user?.user.name}</h2>}
            <button className="button mt-2">Send a message</button>
            <div className="w-full flex justify-center items-center flex-col mt-2">
                <h3 className="text-2xl font-semibold text-orange-600">Tournaments Created: </h3>
                {isLoading2 ? <Spinner /> : tournamentsList}
            </div>
        </section>
    )
}

export default UserProfile