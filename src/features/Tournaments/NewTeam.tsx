import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useState } from "react";
import Modal from "../../utils/Modal/Modal";
import Spinner from "../../utils/Spinner/Spinner";
import axios from "axios";

type Team = {
    name: string,
    image_path: string,
    country: string,
    birthday: Date,
    owner: string
}

const NewTeam = () => {
    const [name, setName] = useState('')
    const [image_path, setImage] = useState('')
    const [country, setCountry] = useState('')
    const [birthday, setBirthday] = useState(new Date())
    const [owner, setOwner] = useState('')

    const handleClick = async() => {
        console.log(localStorage.getItem('jwt'))
        const owner_id = localStorage.getItem('user_id')
        if(owner_id){
            await axios.post('/api/team', { name, image_path, country, birthday, owner : owner_id})
        } else {
            
        }
        
    }

    return (
        <section className="flex font-normal flex-col min-h-screen justify-center items-center">

            <h1 className="font-bold mb-4 text-center text-4xl">Create your own tournament! &#x1F3AE; </h1>
            <form className="relative shadow-2xl w-4/5 flex flex-col justify-around items-center p-4 md:w-1/3 lg:w-1/2 bg-neutral-500" >
                {false /*isLoading */ ? <Modal><Spinner /></Modal> : null}
                <div className="flex justify-around items-center w-full">
                    <input
                        autoComplete="off" className="input mr-2" type="text" placeholder="Team name"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        autoComplete="off" className="input" type="text" placeholder="Country of origin"
                        onChange={(e) => { setCountry(e.target.value) }}
                    />
                </div>
                <div className=" flex justify-around items-center w-full">
                    <span className="w-4/5 text-lg">Pick start date:</span>
                    <DatePicker minDate={new Date()} scrollableYearDropdown showYearDropdown
                        dateFormat="yyyy-MM-dd" className="input" selected={birthday} onChange={(date: Date) => setBirthday(date)} />
                </div>
                <button
                    type="button"
                    className="bg-orange-600 shadow-2xl p-2 hover:bg-orange-700 transition-colors font-semibold  w-full"
                    onClick={handleClick}
                >Create Tournament</button>
            </form>
        </section>
    )
}

export default NewTeam