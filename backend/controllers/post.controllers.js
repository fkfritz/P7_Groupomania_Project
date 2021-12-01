// const db = require("../models");
const { Post } = require("../models");
const { User } = require("../models");
const { Comment } = require("../models");
const fs = require("fs");
const { Like } = require("../models");

// Afficher tous les messages
exports.getPost = async (req, res, next) => {
  try {
    const allPosts = await Post.findAll({
      include: [
        { model: User, attributes: ["first_name", "last_name"] },
        {
          model: Comment,
          attributes: ["id", "text"],
        },
      ],
    });
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(404).json({ error });
  }
};

// Afficher un seul message
exports.getOnePost = async (req, res, next) => {
  try {
    const postParams = req.params;

    const postFound = await Post.findOne({
      where: { id: postParams.id },
    });
    res.status(200).json(postFound);
  } catch (error) {
    res.status(400).json({ error });
  }
};

//Créer un message
exports.createPost = async (req, res, next) => {
  try {
    let image;
    const user = await User.findOne({
      attributes: ["first_name", "avatar", "last_name", "id"],
      where: { id: req.body.UserId },
    });
    if (user !== null) {
      if (req.file) {
        image = `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`;
      } else {
        image = null;
      }
      const post = await Post.create({
        include: [
          {
            model: User,
            attributes: ["first_name", "last_name"],
          },
        ],
        message: req.body.message,
        imageUrl: image,
        UserId: user.id,
      });

      res
        .status(201)
        .json({ post: post, messageRetour: "Votre post est ajouté" });
    } else {
      res.status(400).send({ error: "Erreur " });
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
};

//modifier un message
exports.updatePost = async (req, res, next) => {
  try {
    let newImage;

    let post = await Post.findOne({ where: { id: req.params.id } });

    if (req.file) {
      newImage = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
      if (post.imageUrl) {
        const filename = post.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, (err) => {
          if (err) console.log(err);
          else {
            console.log(`Deleted file: images/${filename}`);
          }
        });
      }
    }
    if (req.body.message) {
      post.message = req.body.message;
    }
    post.imageUrl = newImage;
    const newPost = await post.save({
      fields: ["message", "imageUrl"],
    });
    res
      .status(200)
      .json({ newPost: newPost, message: "Le post a été modifié" });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

// Supprimer un message
exports.deletePost = async (req, res, next) => {
  try {
    const postFound = await Post.findOne({
      where: { id: req.params.id },
    });
    if (postFound.imageUrl != null) {
      const filename = postFound.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Post.destroy({ where: { id: req.params.id } });
      });
      res.status(200).json({ message: "Post supprimé !" });
    } else {
      await Post.destroy({ where: { id: req.params.id } });
      res.status(200).json({ message: "Post supprimé !" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Like un message

// exports.likeOrDislike = async (req, res, next) => {
//   try {
//     const userId = req.body.UserId;
//     const postId = req.params.id;
//     const user = await Like.findOne({
//       where: { UserId: userId, PostId: postId },
//     });
//     console.log(user);
//     if (user) {
//       await Like.destroy(
//         { where: { UserId: userId, PostId: postId } },
//         { truncate: true, restartIdentity: true }
//       );
//       await Post.decrement({ like: 1 }, { where: { id: postId } });
//       res.status(200).send({ messageRetour: "vou n'aimez plus ce post" });
//     } else {
//       await Like.create({
//         UserId: userId,
//         PostId: postId,
//       });

//       res.status(201).json({ user });
//     }
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// };



//Section commentaire
//Créer un commentaire
exports.createComment = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.body.UserId } });
    const post = await Post.findOne({ where: { id: req.params.PostId } });
    const comment = new Comment({
      UserId: user.id,
      PostId: post.id,
      text: req.body.text,
    });
    comment.save();
    res.status(200).json({
      ...comment,
      User: { first_name: user.first_name, last_name: user.last_name },
    });
    console.log(post, user);
  } catch (error) {
    res.status(404).json({ error });
  }
};

//Supprimer un commentaire
exports.deleteComment = (req, res, next) => {
  try {
    Comment.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({ message: "Commentaire supprimé" });
  } catch (error) {
    res.status(400).json({ error });
  }
};
