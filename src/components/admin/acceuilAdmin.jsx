import React, { useState } from 'react';
import { Link, useHistory  } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import { faHome, faUser, faCog, faFile, faBell, faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logoutUser } from '../../actions/userAction';
import { Button } from 'react-bootstrap';

const Dashboard = () => {
    const history = useHistory();
    const userInfo = useSelector(state => state.userLogin.userInfo); // Récupérer les informations de l'utilisateur connecté depuis le state Redux
    const [showDropdown, setShowDropdown] = useState(false);
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(logoutUser()); // Appel de logoutUser avec dispatch
        history.push('/login'); // Rediriger vers la page de connexion après déconnexion
    };
    // Vérifier si l'utilisateur est connecté et s'il est administrateur
    if (!userInfo || userInfo.role !== 'admin') {
        // Si l'utilisateur n'est pas connecté ou s'il n'est pas administrateur, redirigez-le vers une page appropriée
        history.push('/login'); // Rediriger vers la page de connexion
        return null; // Rendre null pour empêcher le rendu du contenu du tableau de bord
    }

    const handleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div>
            {/* Barre claire en haut */}
            <div className="bg-gray h-12 flex justify-end items-center px-4">
                
            </div>
            {/* Navbar */}
            <header className='fixed left-0 top-0 flex flex-col justify-start items-start bg-gray-800 text-white w-64 h-screen p-2 shadow-2xl'>
                <h1 className={`font-primary text-white mr-3 font-bold text-4xl`}>
                    <span className='text-green-600'>Link</span>
                    <span className='hidden md:inline'>UpSport</span>
                </h1>
                <div className='flex flex-col space-y-7 mt-10'>
                    <Link to="/" className='text-white hover:text-green-500 transition-colors flex items-center'>
                        <FontAwesomeIcon icon={faHome} className="w-6 h-6 mr-2" />
                        Accueil
                    </Link>
                    <Link to="/demandes" className='text-white hover:text-green-500 transition-colors flex items-center'>
                        <FontAwesomeIcon icon={faFile} className="w-6 h-6 mr-2" />
                        Demandes d'authentification
                    </Link>
                    <Link to="/Admin/allusers" className='text-white hover:text-green-500 transition-colors flex items-center'>
                        <FontAwesomeIcon icon={faUser} className="w-6 h-6 mr-2" />
                        Utilisateurs
                    </Link>
                    <Link to="/parametres" className='text-white hover:text-green-500 transition-colors flex items-center'>
                        <FontAwesomeIcon icon={faCog} className="w-6 h-6 mr-2" />
                        Paramètres
                    </Link>
                    <button onClick={logoutHandler} className="text-white hover:text-green-500 transition-colors flex items-center">
                        <FontAwesomeIcon icon={faSignOutAlt} className="w-6 h-6 mr-2" />
                        Déconnexion
                    </button>

                </div>
                <main className='  bg-neutral-500 min-h-screen '>
                
            </main>
            </header>
            <footer className="text-center py-4 bg-slate-200 text-black">
    <div className="container mx-auto">
        <p>&copy; 2024 Votre Nom</p>
        <ul className="flex justify-center list-none p-0">
            <li className="mx-4">Téléphone: +123456789</li>
            
            <li className="mx-4">
                <a href="#" className="mr-4">Facebook</a>
            </li>
            <li className="mx-4">
                <a href="#" className="mr-4">Twitter</a>
            </li>
            {/* Ajoutez d'autres liens vers les réseaux sociaux si nécessaire */}
        </ul>
    </div>
</footer>

        </div>
    );
};

export default Dashboard;
