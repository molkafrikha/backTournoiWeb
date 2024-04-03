import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'
import Navigation from './Navigation/Navigation'
import SearchBar from './SearchBar/SearchBar'


const Header = () => {
    return (
        <header className=' flex justify-around items-center  bg-gray-900 h-14 p-2 shadow-2xl'>
            <Link to="/" className=' hover:scale-110 transition-transform'> <Logo /></Link>
            <SearchBar />
            <Navigation />


        </header>
    )
}

export default Header