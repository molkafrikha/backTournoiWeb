import { Outlet } from 'react-router-dom'
import Header from './Header/Header'


const Layout = () => {
    return (
        <div className="font-primary text-white">

            <Header />
            <main className='  bg-neutral-700 min-h-screen '>
                <Outlet />
            </main>

        </div>
    )
}

export default Layout