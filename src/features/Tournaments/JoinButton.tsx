import Spinner from "../../utils/Spinner/Spinner";
import { useJoinTournamentMutation } from "./tournamentsSlice"

type Props = { tournamentId: string }

const JoinButton = (props: Props) => {
    const [joinTournament, { data, isLoading }] = useJoinTournamentMutation();
    const submitHandler = async () => {
        await joinTournament(props.tournamentId);
    }
    return (
        <button onClick={submitHandler} className='p-2 bg-orange-600 shadow-lg hover:bg-orange-700 transition-colors col-start-3 col-end-3 justify-end'>{isLoading ? <Spinner /> : "Join"}</button>
    )
}

export default JoinButton