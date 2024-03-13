import { useEffect, useState } from "react";
import Spinner from "../../utils/Spinner/Spinner";
import SingleTeam from "./SingleTeam";
import { useGetTournamentsQuery } from "./tournamentsSlice"
import axios from "axios";

type Team = {
    _id: string
    name : string,
    image_path : string,
    owner : string,
    country : string,
    birthday : Date
}

const TeamList = () => {
    const { data, isLoading, isError, error } = useGetTournamentsQuery();
    const [teams, setTeams] = useState([])

    useEffect(() => {
        const fetchData = async() => {
            const response = await axios.get('/api/team')
            console.log(response.data)
            setTeams(Object.values(response.data))
        }

        fetchData()
    }, [])

    if (isLoading) {
        return <Spinner />
    }
    const content = teams.map((team : Team) => {
        return (<SingleTeam id={team._id} key={team._id}
            name={team.name}
            image_path={team.image_path} 
            country={team.country}
            birthday={team.birthday}
            owner={team.owner}
            />)
    })
    return (
        <div className="flex min-h-full flex-col p-3 justify-center items-center">
            {content}
        </div>
    )
}

export default TeamList