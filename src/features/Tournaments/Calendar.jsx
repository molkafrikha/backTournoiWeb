import axios from "axios"
import { useEffect, useState } from "react"

const Calendar = () => {
    const [matches, setMatches] = useState([])
    const [current, setCurrent] = useState(null)
    const [score1, setScore1] = useState(0)
    const [score2, setScore2] = useState(0)
    const [foul1, setFoul1] = useState(0)
    const [foul2, setFoul2] = useState(0)
    const [penalty1, setPenalty1] = useState(0)
    const [penalty2, setPenalty2] = useState(0)

    const handleSubmit = async () => {
        console.log(current)
        await axios.put(`/api/match/${current._id}`,
            { passed: true })
            .then(async () => {
                if (score1 > score2) {
                    await axios.put(`/api/participant/score`,
                        {
                            team1: {
                                team: current.team1._id,
                                win: true
                            },
                            team2: {
                                team: current.team2._id,
                                win: false
                            },
                            placement: current.placement
                        })
                } else {
                    await axios.put(`/api/participant/score`,
                        {
                            team1: {
                                team: current.team2._id,
                                win: true
                            },
                            team2: {
                                team: current.team1._id,
                                win: false
                            },
                            placement: current.placement
                        })
                }
                const new_matches = matches.filter((item) => item._id.localeCompare(current._id) != 0)
                setMatches(new_matches)
                setCurrent(null)
                setScore1(0)
                setScore2(0)
            })
    }

    const handlePlusOne = async (team, eventType) => {
        if (team == 1) {
            if (eventType.localeCompare('score') == 0) {
                await axios.put(`/api/match/${current._id}`, { score1: current.score1 + 1 })
                setScore1(score1 + 1)
            } else if (eventType.localeCompare('foul') == 0) {
                await axios.put(`/api/match/${current._id}`, { foul1: current.foul1 + 1 })
                setFoul1(foul1 + 1)
            } else {
                await axios.put(`/api/match/${current._id}`, { penalty1: current.penalty1 + 1 })
                setPenalty1(penalty1 + 1)
            }
        } else {
            if (eventType.localeCompare('score') == 0) {
                await axios.put(`/api/match/${current._id}`, { score2: current.score2 + 1 })
                setScore2(score2 + 1)
            } else if (eventType.localeCompare('foul') == 0) {
                await axios.put(`/api/match/${current._id}`, { foul2: current.foul2 + 1 })
                setFoul2(foul2 + 1)
            } else {
                await axios.put(`/api/match/${current._id}`, { penalty2: current.penalty2 + 1 })
                setPenalty2(penalty2 + 1)
            }
        }
        const response = await axios.put('/api/match', { populate: ['team1', 'team2'] })
        setMatches(Object.values(response.data))
    }

    const handleCurrent = (match) => {
        setCurrent(match)
        setScore1(match.score1)
        setScore2(match.score2)
        setFoul1(match.foul1)
        setFoul2(match.foul2)
        setPenalty1(match.penalty1)
        setPenalty2(match.penalty2)
    }

    const winAll = async() => {
        console.log('?')
        matches.forEach(async (match) => {
            await axios.put(`/api/match/${match._id}`,
                { passed: true })
            await axios.put(`/api/match/${match._id}`, { score1: match.score1 + 1 })
            await axios.put(`/api/participant/score`,
                {
                    team1: {
                        team: match.team1._id,
                        win: true
                    },
                    team2: {
                        team: match.team2._id,
                        win: false
                    },
                    placement: match.placement
                })
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.put('/api/match', { populate: ['team1', 'team2'] })
            console.log(Object.values(response.data))
            setMatches(Object.values(response.data))
        }
        fetchData()
        setCurrent(null)
    }, [])

    return (
        <div className="flex flex-row">
            <div className="flex flex-col max-h-96 overflow-auto">
                <button
                    type="button"
                    className="bg-gray-600 shadow-2xl p-2 rounded-sm hover:bg-orange-700 transition-colors font-semibold  w-auto"
                    onClick={winAll}
                >Win All</button>
                {
                    matches ? matches.filter((match) => match.passed == false).map((match) => {
                        return (
                            <div
                                onClick={() => handleCurrent(match)}
                                className="flex flex-row justify-center gap-6 even:bg-neutral-800 odd:bg-neutral-900 cursor-pointer">
                                <img
                                    className="max-h-8 max-w-8 object-contain"
                                    src={`${axios.defaults.baseURL}/uploads/${match.team1 ? match.team1.image_path : 'ss'}`} />
                                <div>VS</div>
                                <img
                                    className="max-h-8 object-contain"
                                    src={`${axios.defaults.baseURL}/uploads/${match.team2 ? match.team2.image_path : 'ss'}`} />
                            </div>
                        )
                    }) : (<div></div>)
                }
            </div>
            <div className="flex flex-col flex-grow items-center">
                <div className="text-2xl">GAME SUMMARY</div>
                {current ? (<div className="flex flex-col items-center gap-4">
                    <div
                        className="flex flex-row justify-center gap-6">
                        <div className="flex flex-col gap-2">
                            <div className="text-2xl">{current.team1.name}</div>
                            <img
                                className="max-h-40 max-w-8 object-contain"
                                src={`${axios.defaults.baseURL}/uploads/${current.team1.image_path}`} />
                        </div>

                        <div className="text-2xl mt-24">VS</div>
                        <div className="flex flex-col gap-2">
                            <div className="text-2xl">{current.team2.name}</div>
                            <img
                                className="max-h-40 max-w-8 object-contain"
                                src={`${axios.defaults.baseURL}/uploads/${current.team2.image_path}`} />
                        </div>
                    </div>
                    <div className="text-2xl mt-12 py-2">SCORE</div>
                    <div className="flex flex-row gap-6 items-center">
                        <div>Goals:</div>
                        <div className="flex flex-row items-center gap-4">
                            <div>Score 1 : {score1}</div>
                            <button
                                type="button"
                                className="bg-gray-600 shadow-2xl p-2 rounded-sm hover:bg-orange-700 transition-colors font-semibold  w-auto"
                                onClick={() => handlePlusOne(1, 'score')}
                            >+1</button>
                        </div>
                        <div className="flex flex-row items-center gap-4">
                            <div>Score 2 : {score2}</div>
                            <button
                                type="button"
                                className="bg-gray-600 shadow-2xl p-2 rounded-sm hover:bg-orange-700 transition-colors font-semibold w-auto"
                                onClick={() => handlePlusOne(2, 'score')}
                            >+1</button>
                        </div>

                        {
                            /*(<input
                            className="input" autoComplete="off" type="number" placeholder="Score 1"
                            min={0}
                            onChange={(e) => setScore1(Number(e.target.value.toString()))}
                        />
                        <input
                            className="input" autoComplete="off" type="number" placeholder="Score 2"
                            min={0}
                            onChange={(e) => setScore2(Number(e.target.value.toString()))}
                        />) */
                        }

                    </div>
                    <div className="flex flex-row gap-6 items-center">
                        <div>Fouls:</div>
                        <div className="flex flex-row items-center gap-4">
                            <div>Fouls 1 : {foul1}</div>
                            <button
                                type="button"
                                className="bg-gray-600 shadow-2xl p-2 rounded-sm hover:bg-orange-700 transition-colors font-semibold w-auto"
                                onClick={() => handlePlusOne(1, 'foul')}
                            >+1</button>
                        </div>
                        <div className="flex flex-row items-center gap-4">
                            <div>Fouls 2 : {foul2}</div>
                            <button
                                type="button"
                                className="bg-gray-600 shadow-2xl p-2 rounded-sm hover:bg-orange-700 transition-colors font-semibold w-auto"
                                onClick={() => handlePlusOne(2, 'foul')}
                            >+1</button>
                        </div>
                    </div>
                    <div className="flex flex-row gap-6 items-center">
                        <div>Penalties:</div>
                        <div className="flex flex-row items-center gap-4">
                            <div>Penalty 1 : {penalty1}</div>
                            <button
                                type="button"
                                className="bg-gray-600 shadow-2xl p-2 rounded-sm hover:bg-orange-700 transition-colors font-semibold w-auto"
                                onClick={() => handlePlusOne(1, 'penalty')}
                            >+1</button>
                        </div>
                        <div className="flex flex-row items-center gap-4">
                            <div>Penalty 2 : {penalty2}</div>
                            <button
                                type="button"
                                className="bg-gray-600 shadow-2xl p-2 rounded-sm hover:bg-orange-700 transition-colors font-semibold w-auto"
                                onClick={() => handlePlusOne(2, 'penalty')}
                            >+1</button>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="bg-orange-600 shadow-2xl p-2 hover:bg-orange-700 transition-colors font-semibold  w-60"
                        onClick={handleSubmit}
                    >Submit</button>
                </div>) : (<div>EMPTY</div>)}

            </div>
        </div>
    )
}

export default Calendar