import { useEffect, useState } from "react";
import Spinner from "../../utils/Spinner/Spinner";
import SingleTournament from "./SingleTournament";
import { useGetTournamentsQuery } from "./tournamentsSlice"
import axios from "axios";

type Tournament = {
    _id: string
    title: string,
    is_private: boolean,
    password: string,
    max_teams: number;
    playing_field: string;
    start_date: Date;
    end_date: Date;
}

const TournamentsList = () => {
    const { data, isLoading, isError, error } = useGetTournamentsQuery();
    const [tournaments, setTournaments] = useState([])

    useEffect(() => {
        const fetchData = async() => {
            const response = await axios.get('/api/tournament')
            setTournaments(Object.values(response.data))
        }

        fetchData()
    }, [])

    if (isLoading) {
        return <Spinner />
    }
    const content = tournaments.map((tournament : Tournament) => {
        return (<SingleTournament id={tournament._id} key={tournament._id}
            title={tournament.title}
            max_teams={tournament.max_teams} 
            playing_field={tournament.playing_field}
            start_date={tournament.start_date}
            end_date={tournament.end_date}
            password={tournament.password}
            is_private={tournament.is_private}
            />)
    })
    return (
        <div className="flex min-h-full flex-col p-3 justify-center items-center">
            {content}
        </div>
    )
}

export default TournamentsList