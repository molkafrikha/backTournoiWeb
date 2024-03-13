import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setSearchQuery } from "../../../app/utilsSlice";

type Props = {}

const SearchBar = (props: Props) => {
    const clicked = useAppSelector(state => state.utils.clicked);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        navigate("/results")

    }
    return (
        <form onSubmit={submitHandler} className={clicked ? "flex absolute md:relative md:translate-y-0 w-full translate-y-[49px] transition-transform" : "flex absolute md:relative md:translate-y-0 -translate-y-[120%]"}>
            < input type="text" onChange={(e) => dispatch(setSearchQuery(e.target.value))} className=' bg-neutral-800 w-full md:bg-neutral-700 p-1 outline-none text-white' placeholder='Search...' />
            <button type="submit" className='p-2 bg-orange-600 hover:bg-orange-700 transition-colors'>Search</button>
        </form >
    )
}

export default SearchBar