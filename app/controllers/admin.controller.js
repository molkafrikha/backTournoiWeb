const User = require('../models/userModel');

// Contrôleur pour récupérer tous les utilisateurs
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ confirmedByAdmin: true }); // Filtrer les utilisateurs avec confirmedByAdmin false
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erreur Serveur' });
  }
};
  
const confirmUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(userId, { confirmedByAdmin: true });
    if (updatedUser) {
      res.status(200).json({ message: 'Utilisateur confirmé avec succès' });
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur Serveur' });
  }
};
  
// Contrôleur pour rejeter un utilisateur par l'admin
const rejectUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(userId, { confirmedByAdmin: false });
    if (updatedUser) {
      res.status(200).json({ message: 'Utilisateur rejeté avec succès' });
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur Serveur' });
  }
};
  
// Contrôleur pour supprimer un utilisateur
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (deletedUser) {
      res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur Serveur' });
  }
};

const getAllUsersnonconfirmed = async (req, res) => {
  try {
    const users = await User.find({ confirmedByAdmin: false }); // Filtrer les utilisateurs avec confirmedByAdmin false
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erreur Serveur' });
  }
};

module.exports = { getAllUsers, confirmUser, rejectUser, deleteUser, getAllUsersnonconfirmed };

