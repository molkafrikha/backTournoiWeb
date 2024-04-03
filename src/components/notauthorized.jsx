import React from 'react';
import { Link } from 'react-router-dom';

const NotAuthorised = () => {
    return (
        <div className="container mx-auto mt-20 text-center">
            <h1 className="text-2xl font-bold mb-4">Accès non autorisé</h1>
            <p className="text-lg mb-4">Désolé, vous n'êtes pas autorisé à accéder à cette page.</p>
            <p className="text-lg mb-4">Si vous pensez qu'il s'agit d'une erreur, veuillez contacter l'administrateur du système.</p>
            
        </div>
    );
};

export default NotAuthorised;
