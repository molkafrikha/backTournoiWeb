import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Logo from "../../Components/Logo"
import { useSignupMutation } from "../../features/Users/UsersSlice"
import Modal from "../../utils/Modal/Modal"
import Spinner from "../../utils/Spinner/Spinner"

import axios from "axios"

const SignupPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [signup, { isLoading, isSuccess, data }] = useSignupMutation()
    const register = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            //await signup({ name, email, password }).unwrap()
            await axios.post('/api/auth/signup', { name, email, password})
            navigate('/')
        }
        catch {
            console.log("problem...")
        }
    }
    if (isSuccess) {
        sessionStorage.setItem("accessToken", data!.accessToken)
    }
    return (
        <section className="form">
            <Logo />
            <form onSubmit={register} className=" bg-neutral-700 relative shadow-2xl w-4/5 h-72 flex flex-col justify-around items-center p-4 md:w-1/3 lg:w-1/2">

                {isLoading ? <Modal><Spinner /></Modal> : null}
                <h1 className="font-bold mb-2 text-4xl">Sign up &#x1F680;</h1>
                <input className="input" value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Username" />
                <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="password" />
                <Link to="/login" className="hover:text-orange-600 transition duration-300">
                    Already have an account? Login
                </Link>
                <button type="submit" className=" bg-orange-600 shadow-xl p-2 hover:bg-orange-700 transition-colors font-semibold  w-full ">Signup</button>
            </form>
        </section>
    )
}

export default SignupPage