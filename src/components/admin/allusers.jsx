import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { faHome, faUser, faCog, faFile, faBell, faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Dashboard from './acceuilAdmin';
import { logoutUser } from 'C:/Users/USER/Desktop/4twin2/tournois/atelie3/src/actions/userAction';
const AllUsers = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const userInfo = useSelector(state => state.userLogin.userInfo);
    const BASE_URL = "http://localhost:8089";
    useEffect(() => {
        // Vérifier si l'utilisateur est connecté et s'il est administrateur
        if (!userInfo || userInfo.role !== 'admin') {
            // Si l'utilisateur n'est pas connecté ou s'il n'est pas administrateur, redirigez-le vers une page appropriée
            history.push('/login'); // Rediriger vers la page de connexion
        } else {
            // Si l'utilisateur est connecté et qu'il est administrateur, récupérez tous les utilisateurs depuis l'API
            const fetchUsers = async () => {
                try {
                    const response = await axios.get(`${BASE_URL}/api/users/allusers`); // Modifier l'URL selon votre API
                    setUsers(response.data); // Mettre à jour le state local avec les données des utilisateurs
                } catch (error) {
                    console.error('Failed to fetch users:', error);
                }
            };
            fetchUsers(); // Appeler la fonction pour récupérer les utilisateurs lors du montage du composant
        }
    }, [userInfo, history]); // Le tableau vide [] en tant que deuxième argument signifie que cette fonction ne s'exécute qu'une seule fois, lors du montage du composant
    const deleteUser = async (userId) => {
        try {
            await axios.delete(`${BASE_URL}/api/users/users/${userId}`);
            // Mettre à jour la liste des utilisateurs après suppression
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };
    const [showDropdown, setShowDropdown] = useState(false);
    const logoutHandler = () => {
        dispatch(logoutUser());
      };
    const handleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div>
        <Dashboard/>
       
            <div className="ml-64"> {/* Ajout de marge à gauche pour éviter que les utilisateurs ne soient cachés derrière la barre de navigation */}
                <div className="container mx-auto mt-20">
                    <h1 className=" text-center text-2xl font-bold mb-10">Tous les utilisateurs</h1>
                    
                    <div className=" bg-center grid grid-cols-3 gap-4">
                    {users.map(user => (
                        <div key={user._id} className="border p-4 flex flex-col items-center">
                            <p>email: {user.email}</p>
                            <p>role: {user.role}</p>
                            <button onClick={() => deleteUser(user._id)} className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors">
            Supprimer <FontAwesomeIcon icon={faTrash} className="ml-2" />
        </button>
                        </div>
                    ))}
                </div>
                    
                </div>
            </div>
        </div>
    );
};

export default AllUsers;
