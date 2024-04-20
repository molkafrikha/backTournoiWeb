import { Outlet } from 'react-router-dom'
import Header from './Header/Header'

import Sidebar from './Sidebar'


const Layout = () => {
    return (
        <div className="font-primary text-white">

            <Header />
            <main className='  bg-neutral-700 min-h-screen flex flex-col w-full'>
                <Sidebar />
                <div className='flex-grow'>
                    <Outlet />
                </div>
                
            </main>

        </div>
    )
}

export default Layout