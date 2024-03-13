import { useParams } from "react-router-dom"
import { useDeleteTournamentMutation } from "./tournamentsSlice";

type Props = {
    tournamentId?: string
}

const DeleteButton = (props: Props) => {
    const [deleteTournament, { isLoading, error, isError }] = useDeleteTournamentMutation();
    const submitHandler = async () => {
        await deleteTournament(props.tournamentId);
    }
    return (
        <>
            <button className="button" onClick={submitHandler}>
                Delete Tournament
            </button>
            {isError ? <p className="text-red-700 text-xl font-semibold">Nope</p> : null}
        </>

    )
}

export default DeleteButton