import { format } from "date-fns";
import { useParams } from "react-router-dom"
import Spinner from "../../utils/Spinner/Spinner";
import { useGetParticipantsQuery, useGetTournamentQuery } from "./tournamentsSlice";

import axios from "axios";
import { useState, useEffect } from "react";

const TournamentDetails = () => {
    const { id } = useParams();
    const [tournament, setTournament] = useState(null)
    const [winner, setWinner] = useState(null)
    const [particiapnts, setParticipants] = useState([])
    const [title, setTitle] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`api/tournament/${id}`)
            const response2 = await axios.post('api/participant/find_all', { tournament : id})
            setTournament(response.data.instance)
            setParticipants(Object.values(response2.data))
            if(response.data.instance.winner){
                const get_winner = await axios.get(`api/team/${response.data.instance.winner}`)
                console.log(get_winner)
                setWinner(get_winner.data.instance)
            }
        }
        console.log('sss')
        fetchData()
    }, [])

    const handleInvite = async() => {
        const response = await axios.post('api/participant/invite', { tournament : id, title})
        console.log(response)
        //this.forceUpdate()
    }

    return (
        <section className="font-normal justify-center flex items-center h-screen py-10 ">
            {!tournament ? <Spinner /> : <div className="flex flex-col p-2 justify-around w-4/5 shadow-2xl text-center drop-shadow-xl h-full bg-neutral-600 items-center">
                <h2 className="text-5xl font-bold  items-center text-orange-600">{tournament.title}</h2>
                <h3 className="text-2xl font-semibold">Max teams: {tournament.max_teams}</h3>
                <h3 className="text-2xl font-semibold">Playing field: {tournament.playing_field}</h3>
                <h4 className=" animate-pulse text-xl">The tournament begins at: {format(new Date(tournament.start_date), "dd-MM-yyyy")}</h4>
                <h4 className=" animate-pulse text-xl">The tournament end at: {format(new Date(tournament.end_date), "dd-MM-yyyy")}</h4>
                {
                    winner ? (
                        <div>
<h2 className="text-5xl font-bold  items-center">
                        Winner:</h2>
                    <h2 className="text-5xl font-bold  items-center text-orange-600 animate-pulse">
                        {winner.name}</h2>
                        </div>
                        ) : (<div></div>)
                }
                {/*isLoading ? <Spinner /> : <div> <span>Participants:</span>
                    <div className=" flex flex-col items-center justify-center text-center">
                        {particiapnts?.participants.map(participant => {
                            return (<span className="text-center">{participant.user.name}</span>)
                        })}
                    </div></div>*/}
                <span>Owner</span>
                <div className="flex flex-col">
                    <input type="text" className="input mr-2" onChange={(e) => setTitle(e.target.value)}></input>
                    <button
                        type="button"
                        className="bg-orange-600 shadow-2xl p-2 hover:bg-orange-700 transition-colors font-semibold  w-full"
                        onClick={handleInvite}
                    >Invite Team</button>
                    <h3 className="text-xl py-4 font-semibold">Registered participants: {particiapnts.length}</h3>
                </div>


            </div>}

        </section>
    )
}

export default TournamentDetails