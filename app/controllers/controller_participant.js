const service = require("../services/service_participant")

const default_controller_class = require("./default_controller")
const default_controller = new default_controller_class({ service })

const invite_team = async (req, res) => {
    try {
        console.log('sss')
        const service_team = require('../services/service_team')
        const { title, tournament } = req.body
        console.log(title)
        const doc = await service_team.find_one({ name: title })
        if (doc) {
            await service.create({ tournament, team: doc._id, group: "", bracket: "" })
            res.status(200).send({ doc })
        } else {
            res.status(204).send({ doc: null })
        }
    } catch (err) {
        console.log(err)
        res.status(400).send({ error: err })
    }
}

const find_update = async (req, res) => {
    try {
        const { team, group } = req.body
        await service.update({ team }, { group })
        const docs = await service.get_all()
        if (!docs.some((item) => item.group.localeCompare('') == 0)) {
            console.log('ss')
        } else {
            console.log('aa')
        }
        res.status(200)
    } catch (err) {
        console.log(err)
        res.status(400).send({ error: err })
    }
}

const find_update_score = async (req, res) => {
    try {
        const transitions = {
            'grp1': { next: 'qf1', neighbour: null },
            'grp2': { next: 'qf2', neighbour: null },
            'grp3': { next: 'qf3', neighbour: null },
            'grp4': { next: 'qf4', neighbour: null },
            'grp5': { next: 'qf5', neighbour: null },
            'grp6': { next: 'qf6', neighbour: null },
            'grp7': { next: 'qf7', neighbour: null },
            'grp8': { next: 'qf8', neighbour: null },
            'qf1': { next: 'sf1', neighbour: 'qf2' },
            'qf2': { next: 'sf1', neighbour: 'qf1' },
            'qf3': { next: 'sf2', neighbour: 'qf4' },
            'qf4': { next: 'sf2', neighbour: 'qf3' },
            'qf5': { next: 'sf3', neighbour: 'qf6' },
            'qf6': { next: 'sf3', neighbour: 'qf5' },
            'qf7': { next: 'sf4', neighbour: 'qf8' },
            'qf8': { next: 'sf4', neighbour: 'qf7' },
            'sf1': { next: 'ff1', neighbour: 'sf2' },
            'sf2': { next: 'ff1', neighbour: 'sf1' },
            'sf3': { next: 'ff2', neighbour: 'sf4' },
            'sf4': { next: 'ff2', neighbour: 'sf3' },
            'ff1': { next: null, neighbour: 'ff2' },
            'ff2': { next: null, neighbour: 'ff1' },
            null: { next: null, neighbour: null }
        }
        const { team1, team2, placement } = req.body
        const participant_model = require('../models/participant')
        const match_model = require('../models/match')
        await participant_model.bulkWrite(
            [
                {
                    updateOne: {
                        filter: { team: team1.team },
                        update: { $inc: { wins: team1.win, losses: !team1.win } }
                    }
                },
                {
                    updateOne: {
                        filter: { team: team2.team },
                        update: { $inc: { wins: team2.win, losses: !team2.win } }
                    }
                }
            ]
        )
        if (placement.includes('grp')) {
            console.log(placement)
            const matches = await match_model.find({ placement: placement })
            if (!matches.some((match) => !match.passed)) {
                console.log("DONE")
                console.log("NEXT: ", transitions[placement].next)
                const winner = await participant_model.find({ bracket: placement }).sort({ wins: -1 }).limit(1)
                const final = await participant_model.findByIdAndUpdate(
                    winner[0]._id,
                    { $set: { bracket: transitions[placement].next } })
                const regex = new RegExp(transitions[transitions[placement].next].neighbour)
                console.log(regex)
                const neighbour = await participant_model.findOne({ bracket: { $regex: regex } })
                if (neighbour) {
                    console.log('neighbour bracket:', transitions[transitions[placement].next].neighbour)
                    console.log('wins:', neighbour.wins)
                    const new_match = await match_model.create(
                        {
                            tournament: final.tournament,
                            team1: final.team,
                            team2: neighbour.team,
                            placement: transitions[placement].next
                        })
                }
            }
        } else {
            if (transitions[placement].next) {
                const placement_number = parseInt(placement[2])
                const lower = (placement_number % 2 == 0) ? placement_number - 1 : placement_number
                const upper = (placement_number % 2 == 0) ? placement_number : placement_number + 1
                const regex_winner = new RegExp(placement.substring(0, 2) + `[${lower}-${upper}]`)
                const regex_neighbour = new RegExp(transitions[transitions[placement].next].neighbour)
                const winner = await participant_model.find({ bracket: { $regex: regex_winner } }).sort({ wins: -1 }).limit(1)
                const final = await participant_model.findByIdAndUpdate(
                    winner[0]._id,
                    [{ $set: { bracket: { $concat: ["$bracket", transitions[placement].next] } } }])
                const neighbour = await participant_model.findOne({ bracket: { $regex: regex_neighbour } })
                if (neighbour) {
                    const new_match = await match_model.create(
                        {
                            tournament: final.tournament,
                            team1: final.team,
                            team2: neighbour.team,
                            placement: transitions[placement].next
                        })
                }
            } else {
                const tournament_model = require('../models/tournament')
                const placement_number = parseInt(placement[2])
                const lower = (placement_number % 2 == 0) ? placement_number - 1 : placement_number
                const upper = (placement_number % 2 == 0) ? placement_number : placement_number + 1
                const regex_winner = new RegExp(placement.substring(0, 2) + `[${lower}-${upper}]`)
                const winner = await participant_model.find({ bracket: { $regex: regex_winner } }).sort({ wins: -1 }).limit(1)
                const tour = await tournament_model.findByIdAndUpdate(winner[0].tournament, { $set: { winner: winner[0].team } })
            }
        }
        res.status(200).send({ status: 200 })
    } catch (err) {
        console.log(err)
        res.status(400).send({ error: err })
    }
}

const randomize = async (req, res) => {
    try {
        const { array, tournament } = req.body
        const match_model = require('../models/match')
        const model = require('../models/participant')
        const tournament_model = require('../models/tournament')
        await match_model.deleteMany({ tournament })
        await tournament_model.findByIdAndUpdate(tournament, { $set : { winner : null } })
        var keys_arr = {
            'grp1': [], 'grp2': [], 'grp3': [], 'grp4': [], 'grp5': [], 'grp6': [], 'grp7': [], 'grp8': []
        }
        const ops = Object.keys(array).map((key) => {
            keys_arr[array[key]].push(key)
            return {
                updateOne: {
                    filter: { team: key },
                    update: { $set: { group: array[key], bracket: array[key], wins: 0, losses: 0, draws: 0 } }
                }
            }
        })
        await model.bulkWrite(ops)
        console.log(keys_arr)
        var ops_arr = []
        Object.keys(keys_arr).forEach((key) => {
            ops_arr.push(
                { tournament, team1: keys_arr[key][0], team2: keys_arr[key][1], group: true, placement: key }
            )
            ops_arr.push(
                { tournament, team1: keys_arr[key][0], team2: keys_arr[key][2], group: true, placement: key }
            )
            ops_arr.push(
                { tournament, team1: keys_arr[key][0], team2: keys_arr[key][3], group: true, placement: key }
            )
            ops_arr.push(
                { tournament, team1: keys_arr[key][1], team2: keys_arr[key][2], group: true, placement: key }
            )
            ops_arr.push(
                { tournament, team1: keys_arr[key][1], team2: keys_arr[key][3], group: true, placement: key }
            )
            ops_arr.push(
                { tournament, team1: keys_arr[key][2], team2: keys_arr[key][3], group: true, placement: key }
            )
        })
        await match_model.insertMany(ops_arr)
        res.status(200)
    } catch (err) {
        console.log(err)
        res.status(400)
    }
}

const reset_all = async (req, res) => {
    try {
        const { tournament } = req.body
        const model = require('../models/participant')
        const match_model = require('../models/match')
        const tournament_model = require('../models/tournament')
        await tournament_model.findByIdAndUpdate(tournament, { $set : { winner : null } })
        const docs = await model.find({ tournament })
        //console.log(docs)
        const ops = Object.values(docs).map((item) => {
            return {
                updateOne: {
                    filter: { team: item.team },
                    update: { $set: { group: '', bracket: '', wins: 0, losses: 0, draws: 0 } }
                }
            }
        })
        console.log(ops)
        await model.bulkWrite(ops)
        await match_model.deleteMany({ tournament })
        res.status(200)
    } catch (err) {
        console.log(err)
        res.status(400)
    }
}

module.exports = {
    ...default_controller.methods,
    invite_team,
    find_update,
    randomize,
    reset_all,
    find_update_score
}