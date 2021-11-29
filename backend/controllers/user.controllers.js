const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const db = require("../models");
// const user = db.User;
const { User } = require("../models");
const dotenv = require("dotenv").config();

// Création du signup
exports.signup = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    await user.save();

    res.status(201).json({
      UserId: user.id,
      token: jwt.sign({ UserId: user.id }, `${process.env.JWT_RAND_SECRET}`, {
        expiresIn: "24h",
      }),
    });
  } catch (error) {
    res.status(400).json({ error: "Cet e-mail est déjà utilisé" });
  }
};
//------------------------------------------------------------------//

// Création du login
exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
    });

    if (!user) {
      return res.status(401).json({ error: "Utilisateur non trouvé" });
    }
    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Mot de passe incorrect" });
    }

    res.status(200).json({
      UserId: user.id,
      token: jwt.sign({ UserId: user.id }, `${process.env.JWT_RAND_SECRET}`, {
        expiresIn: "24h",
      }),
      user,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
//-----------------------------------------------------------------//

// Supprimer un utilisateur
exports.deleteAccount = async (req, res, next) => {
  try {
    const userParams = req.params;
    await User.destroy({ where: { id: userParams.id } });
    res.status(200).json({ message: "Utilisateur supprimée !" });
  } catch (error) {
    res.status(400).json({ error });
  }
};


exports.getOneAccount = async (req, res, next) => {
  try {
    const userParams = req.params;

    const userFound = await User.findOne({
      where: { id: userParams.id },
    });
    res.status(200).json(userFound);
  } catch (error) {
    res.status(400).json({ error });
  }
};

// Modifier un compte utilisateur
exports.modifyAccount = async (req, res, next) => {
  try {
    const post = req.body;
    const accountParams = req.params;

    await User.update(post, {
      where: { id: accountParams.id },
    });
    res.status(200).json({ message: "Message modifié" });

    
    try {
      
      let newPhoto;
      let user = await User.findOne({ where: { id: id } }); // on trouve le user
      if (userId === user.id) {
        if (req.file && user.photo) {
          newPhoto = `${req.protocol}://${req.get("host")}/api/upload/${
            req.file.filename
          }`;
          const filename = user.photo.split("/upload")[1];
          fs.unlink(`upload/${filename}`, (err) => {
            // s'il y avait déjà une photo on la supprime
            if (err) console.log(err);
            else {
              console.log(`Deleted file: upload/${filename}`);
            }
          });
        } else if (req.file) {
          newPhoto = `${req.protocol}://${req.get("host")}/api/upload/${
            req.file.filename
          }`;
        }
        if (newPhoto) {
          user.photo = newPhoto;
        }
        if (req.body.bio) {
          user.bio = req.body.bio;
        }
        if (req.body.pseudo) {
          user.pseudo = req.body.pseudo;
        }
        const newUser = await user.save({ fields: ["pseudo", "bio", "photo"] }); // on sauvegarde les changements dans la bdd
        res.status(200).json({
          user: newUser,
          messageRetour: "Votre profil a bien été modifié",
        });
      } else {
        res
          .status(400)
          .json({ messageRetour: "Vous n'avez pas les droits requis" });
      }
    } catch (error) {
      return res.status(500).send({ error: "Erreur serveur" });
    }




  } catch (error) {
    res.status(400).json({ error });
  }
  
};


