const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

exports.deleteUser = (req, res) => {
    const userId = req.params.userId;
  
    User.findByIdAndRemove(userId)
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: "Utilisateur non trouvé !" });
        }
        res.send({ message: "Compte utilisateur supprimé avec succès !" });
      })
      .catch(err => {
        res.status(500).send({ message: "Erreur lors de la suppression du compte utilisateur : " + err });
      });
  };