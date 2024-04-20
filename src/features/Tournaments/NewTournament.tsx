import { z } from "zod"
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useAddNewTournamentMutation } from "./tournamentsSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import Modal from "../../utils/Modal/Modal";
import Spinner from "../../utils/Spinner/Spinner";
import axios from "axios";
const formSchema = z.object({
    name: z.string(),
    game: z.string(),
    numberOfTeams: z.string({ invalid_type_error: "Please provide a number" }).transform(Number).refine(val => val % 2 === 0, { message: "The number must be even" }),
    cost: z.string({ invalid_type_error: "Please provide a number" }).transform(Number)
});
type FormSchemaType = z.infer<typeof formSchema>

const NewTournament = () => {
    const [startTime, setStartTime] = useState(new Date())
    const [addNewTournament, { data: response, isLoading }] = useAddNewTournamentMutation();

    const [title, setTitle] = useState('')
    const [is_private, setPrivate] = useState(false)
    const [password, setPassword] = useState('')
    const [max_teams, setMax] = useState(0)
    const [playing_field, setField] = useState('')
    const [start_date, setStart] = useState(new Date())
    const [end_date, setEnd] = useState(new Date())

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema)
    })
    const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
        await addNewTournament({ ...data, startTime });

    }

    const handleClick = async() => {
        const doc = {
            title, is_private, password, max_teams, playing_field, start_date, end_date
        }
        console.log('ss')
        await axios.post('/api/tournament', doc)
        console.log(doc)
    }
    return (
        <section className="flex font-normal flex-col min-h-screen justify-center items-center">

            <h1 className="font-bold mb-4 text-center text-4xl">Create your own tournament! &#x1F3AE; </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="relative shadow-2xl w-4/5 flex flex-col justify-around items-center p-4 md:w-1/3 lg:w-1/2 bg-neutral-500" >
                {isLoading ? <Modal><Spinner /></Modal> : null}
                <div className="flex justify-around items-center w-full">
                    <input
                        autoComplete="off" className="input mr-2" type="text" placeholder="Name of the tournament"
                        {...register("name")} disabled={isSubmitting}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {errors.name && (<p className="text-red-600">{errors.name.message}</p>)}
                    <input
                        autoComplete="off" className="input" type="password" placeholder="Password"
                        {...register("game")} disabled={isSubmitting}
                        onChange={(e) => { setPassword(e.target.value); setPrivate(e.target.value.toString().length > 0) }}
                    />
                    {errors.game && (<p className="text-red-600">{errors.game.message}</p>)}
                </div>
                <div className="flex justify-around items-center w-full">
                    <input
                        className="input mr-2" autoComplete="off" type="number" placeholder="Max teams"
                        {...register("numberOfTeams")} disabled={isSubmitting}
                        min={16}
                        onChange={(e) => setMax(Number(e.target.value.toString()))}
                    />
                    {errors.numberOfTeams && (<p className="text-red-600">{errors.numberOfTeams.message}</p>)}
                    <input
                        className="input" type="text" autoComplete="off" placeholder="Playing field"
                        {...register("cost")} disabled={isSubmitting} 
                        onChange={(e) => setField(e.target.value)}
                        />
                    {errors.cost && (<p className="text-red-600">{errors.cost.message}</p>)}
                </div>
                <div className=" flex justify-around items-center w-full">
                    <span className="w-4/5 text-lg">Pick start date:</span>
                    <DatePicker minDate={new Date()} scrollableYearDropdown showYearDropdown dateFormat="yyyy-MM-dd" className="input" selected={start_date} onChange={(date: Date) => setStart(date)} />
                </div>
                <div className=" flex justify-around items-center w-full">
                    <span className="w-4/5 text-lg">Pick end date:</span>
                    <DatePicker minDate={new Date()} scrollableYearDropdown showYearDropdown dateFormat="yyyy-MM-dd" className="input" selected={end_date} onChange={(date: Date) => setEnd(date)} />
                </div>
                <button
                    disabled={isSubmitting}
                    type="button"
                    className="bg-orange-600 shadow-2xl p-2 hover:bg-orange-700 transition-colors font-semibold  w-full"
                    onClick={handleClick}
                >Create Tournament</button>
            </form>
        </section>
    )
}

export default NewTournament