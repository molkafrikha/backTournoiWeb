import axios from "axios"
import { set } from "date-fns";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const Group = (props) => {
    const [teams, setTeams] = useState([])
    const { number, id, handleOnDrop, init } = props

    const handleDrop = (e) => {
        const data = JSON.parse(e.dataTransfer.getData('data'))
        if (teams.length < 4) {
            setTeams([data, ...teams])
            handleOnDrop(data._id, id)
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    useEffect(() => {

        const belong = init.map((item) => {
            if (item.group.localeCompare(id) == 0) {
                return item.team
            }
        }).filter((item) => item !== undefined)
        console.log(belong)
        setTeams(Object.values(belong))
    }, [])

    return (
        <div id={id} className="flex flex-col h-48" onDrop={handleDrop} onDragOver={handleDragOver}>
            <div className="bg-black text-white text-center">{`Group ${number}`}</div>
            <div className="flex flex-col gap-1">
                {teams.length > 0 ? teams.map((team) => {
                    var wins = 0
                    var losses = 0
                    var draws = 0
                    init.forEach((e) => {
                        if(e.team._id == team._id){
                            wins = e.wins
                            losses = e.losses
                            draws = e.draws
                        }
                        
                    }
                    
                )

                    return (
                        <div className="flex flex-row gap-4 even:bg-neutral-700">
                            {team.image_path ? (<img
                                draggable={false}
                                className="max-h-8 max-w-[2rem] object-contain"
                                src={`${axios.defaults.baseURL}/uploads/${team.image_path}`}></img>) : (<div></div>)
                            }
                            <div className="px-4">{wins}W - {losses}L</div>
                        </div>

                    )
                }) : (<div>Empty</div>)}
            </div>

        </div>
    )
}

const BracketBox = (props) => {
    const [participant, setParticipant] = useState(null)
    const { id, init } = props

    useEffect(() => {
        const belong = init.find((item) => (item.bracket.includes(id)))
        setParticipant(belong)
        console.log(belong)
    }, [])
    return (
        <div id={id} className="w-32 h-8 bg-neutral-900 flex flex-row items-center gap-6 px-2">
            { participant ? (<img
                draggable={false}
                className="max-h-8 object-contain"
                src={`${axios.defaults.baseURL}/uploads/${participant.team.image_path}`}></img>) : (<div></div>)
            }
            <div className="overflow-clip">{participant ? id.toUpperCase() : ""}</div>
        </div>
    )
}

const TournamentPage = () => {
    const [participants, setParticipants] = useState('')
    const { id } = useParams();

    const handleOnDrag = (e, data) => {
        console.log(data)
        e.dataTransfer.setData('data', data)
        console.log(e.dataTransfer.getData('data'))
    }

    const handleOnDrop = (id, group) => {
        setParticipants(participants.filter((p) => p.team._id != id))
        axios.put(`/api/participant/`, { team: id, group })
    }

    const handleRandomize = async() => {
        var groups = [4, 4, 4, 4, 4, 4, 4, 4]
        var arr = {}
        participants.forEach((p) => {
            let test = true
            let random_group = 0
            while (test) {
                console.log('s')
                random_group = getRandomInt(8)
                if (groups[random_group] > 0) {
                    test = false
                    groups[random_group] = groups[random_group] - 1
                }
            }
            arr[p.team._id] = `grp${random_group+1}`
        })
        await axios.post('/api/participant/randomize', { array: arr, tournament : id })
    }

    const handleReset = async() => {
        await axios.post(`/api/participant/reset`, { tournament: id })
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.post('/api/participant/find_all', { params: { tournament: id }, populate: ['team'] })
            console.log(response.data)
            setParticipants(Object.values(response.data))
        }
        fetchData()
    }, [])

    return (
        <div className="flex flex-row flex-grow h-full py-10 px-2 gap-2">
            <div className="flex flex-col bg-neutral-600 shadow-lg h-full cursor-pointer">
                <div className="flex flex-row">
                    <button
                        type="button"
                        className="bg-orange-600 shadow-2xl p-2 hover:bg-orange-700 transition-colors font-semibold  w-full"
                        onClick={handleRandomize}
                    >Randomize</button>
                    <button
                        type="button"
                        className="bg-orange-600 shadow-2xl p-2 hover:bg-orange-700 transition-colors font-semibold  w-full"
                        onClick={handleReset}
                    >Reset</button>
                </div>
                {participants ? participants.filter((item) => item.group.localeCompare('') == 0).map((participant) => {
                    return (
                        <div draggable={true} className="flex flex-row items-center gap-2 even:bg-neutral-800"
                            onDragStart={(e) => handleOnDrag(e, JSON.stringify(participant.team))}>
                            <img
                                draggable={false}
                                className="max-h-8 object-contain"
                                src={`${axios.defaults.baseURL}/uploads/${participant.team.image_path}`}></img>
                            <div className="py-2 px-2">{participant.team.name}</div>
                        </div>

                    )
                }) : (<div></div>)}
            </div>
            {
                participants ? (<div className="flex flex-row bg-neutral-600">
                    <div className="flex flex-col justify-center gap-18">
                        <Group number={1} id={'grp1'} handleOnDrop={handleOnDrop} init={participants} />
                        <Group number={2} id={'grp2'} handleOnDrop={handleOnDrop} init={participants} />
                        <Group number={3} id={'grp3'} handleOnDrop={handleOnDrop} init={participants} />
                        <Group number={4} id={'grp4'} handleOnDrop={handleOnDrop} init={participants} />
                    </div>
                    <div className="flex flex-col justify-center gap-24 px-2">
                        <BracketBox id={'qf1'} init={participants} />
                        <BracketBox id={'qf2'} init={participants} />
                        <BracketBox id={'qf3'} init={participants} />
                        <BracketBox id={'qf4'} init={participants} />
                    </div>
                    <div className="flex flex-col justify-center gap-24 px-2">
                        <BracketBox id={'sf1'} init={participants} />
                        <BracketBox id={'sf2'} init={participants} />
                    </div>
                    <div className="flex flex-col justify-center gap-24 px-2">
                        <BracketBox id={'ff1'} init={participants} />
                    </div>
                    <div className="flex flex-col justify-center gap-24 px-2">
                        <BracketBox id={'ff2'} init={participants} />
                    </div>
                    <div className="flex flex-col justify-center gap-24 px-2">
                        <BracketBox id={'sf3'} init={participants} />
                        <BracketBox id={'sf4'} init={participants} />
                    </div>
                    <div className="flex flex-col justify-center gap-24 px-2">
                        <BracketBox id={'qf5'} init={participants} />
                        <BracketBox id={'qf6'} init={participants} />
                        <BracketBox id={'qf7'} init={participants} />
                        <BracketBox id={'qf8'} init={participants} />
                    </div>
                    <div className="flex flex-col justify-center gap-1">
                        <Group number={5} id={'grp5'} handleOnDrop={handleOnDrop} init={participants} />
                        <Group number={6} id={'grp6'} handleOnDrop={handleOnDrop} init={participants} />
                        <Group number={7} id={'grp7'} handleOnDrop={handleOnDrop} init={participants} />
                        <Group number={8} id={'grp8'} handleOnDrop={handleOnDrop} init={participants} />
                    </div>
                </div>) : (<div></div>)
            }
        </div>
    )
}

export default TournamentPage