import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useState } from "react";
import Modal from "../../utils/Modal/Modal";
import Spinner from "../../utils/Spinner/Spinner";
import axios from "axios";

import countries from '../../countries'

const NewTeam = () => {
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [country, setCountry] = useState('')
    const [birthday, setBirthday] = useState(new Date())
    const [owner, setOwner] = useState('')

    const handleClick = async () => {
        console.log(localStorage.getItem('jwt'))
        const owner_id = localStorage.getItem('user_id')
        if (owner_id) {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('image', image)
            formData.append('country', country)
            formData.append('birthday', birthday)
            formData.append('owner', owner_id)
            console.log(image)
            await axios.post('/api/team',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
        } else {

        }
    }

    const ctr = countries

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file)
            /*const reader = new FileReader();
            reader.onload = () => {
                console.log(reader.result)
                setImage(reader.result);
            };
            console.log(reader.readAsDataURL(file));*/
        }
    }

    return (
        <section className="flex font-normal flex-col min-h-screen justify-center items-center">

            <h1 className="font-bold mb-4 text-center text-4xl">Create your own tournament! &#x1F3AE; </h1>
            <form className="relative shadow-2xl w-4/5 flex flex-col justify-around items-center p-4 md:w-1/3 lg:w-1/2 bg-neutral-500" >
                {false /*isLoading */ ? <Modal><Spinner /></Modal> : null}
                <div className="flex justify-between items-center w-full py-2">
                    <div>Team Name:</div>
                    <input
                        className="py-2 px-2 border border-gray-400 outline-none bg-black"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Team name"
                    ></input>
                </div>
                <div className="flex justify-between items-center w-full py-2">
                    <div>Country:</div>
                    <select
                        className="py-2 px-2 border-gray-400 outline-none border bg-black"
                        onChange={(e) => setCountry(e.target.value)}>
                        {
                            ctr ? ctr.map((opt) => (<option value={opt.name}>{opt.name}</option>)) : "empty"
                        }
                    </select>
                </div>
                <div className="flex justify-between items-center w-full py-2">
                    <span>Team Logo:</span>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className=""
                    />
                </div>
                <div className=" flex justify-around items-center w-full">
                    <span className="w-4/5 text-lg">Pick start date:</span>
                    <DatePicker minDate={new Date()} scrollableYearDropdown showYearDropdown
                        dateFormat="yyyy-MM-dd" className="input border-gray-400" selected={birthday} onChange={(date) => setBirthday(date)} />
                </div>
                <div className="flex">
                    <button
                        type="button"
                        className="bg-orange-600 shadow-2xl p-2 px-6 mt-4 mx-auto hover:bg-orange-700 transition-colors font-semibold  w-full"
                        onClick={handleClick}
                    >Create Tournament</button>
                </div>

            </form>
        </section>
    )
}

export default NewTeam