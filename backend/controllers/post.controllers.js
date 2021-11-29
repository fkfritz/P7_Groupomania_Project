// const db = require("../models");
const { Post } = require("../models");
const fs = require("fs");
const { Like } = require("../models");

// Afficher tous les messages
exports.getPost = async (req, res, next) => {
  try {
    const allPosts = await Post.findAll();
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(404).json({ error });
  }

  // db.Post.findAll()
  //   .then((test) => res.status(200).json(test))
  //   .catch((error) => res.status(404).json({ error }));
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
  // db.Post.findOne({
  //   where: {
  //     id: req.params.id,
  //   },
  // })
  //   .then((postFound) => res.status(200).json(postFound))
  //   .catch((error) => res.status(400).json({ error }));
};

// Créer un message
exports.createPost = async (req, res, next) => {
  try {
    
    const message = new Post({
      UserId: req.body.UserId,
      title: req.body.title,
      postText: req.body.postText,
      username: req.body.username,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    });

    await message.save();

    
    res.json(message);
  } catch (error) {
    // res.status(404).json({ error });
    console.log(error);
  }
  
};

// Modifier un message
exports.modifyPost = async (req, res, next) => {
  try {
    const post = req.body;
    const postParams = req.params;

    await Post.update(post, {
      where: { id: postParams.id },
    });
    res.status(200).json({ message: "Message modifié" });
  } catch (error) {
    res.status(400).json({ error });
  }
  // db.Post.update(
  //   {
  //     text: req.body.text,
  //   },
  //   {
  //     where: { id: req.params.id },
  //   }
  // )
  //   .then(() => res.status(200).json({ message: "Message modifiée !" }))
  //   .catch((error) => res.status(400).json({ error }));
};

// Supprimer un message
// exports.deletePost = async (req, res, next) => {
//   try {
//     const postParams = req.params;

//     await Post.destroy({ where: { id: postParams.id } });

//     res.status(200).json({ message: "Message suppimée !" });
//   } catch (error) {
//     res.status(400).json({ error });
//   }
// };

// Supprimer un message
exports.deletePost = (req, res, next) => {
  Post.findOne({
    where: { id: req.params.id },
  })
    .then((postFound) => {
      const filename = postFound.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Post.destroy({ where: { id: req.params.id } })
          .then(() => res.status(200).json({ message: "Post suppimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

// Like un message

exports.likeOrDislike = async (req, res, next) => {
  try {
    const userId = req.body.UserId;
    const postId = req.params.id;
    const user = await Like.findOne({
      where: { UserId: userId, PostId: postId },
    });
    console.log(user);
    if (user) {
      await Like.destroy(
        { where: { UserId: userId, PostId: postId } },
        { truncate: true, restartIdentity: true }
      );
      res.status(200).send({ messageRetour: "vou n'aimez plus ce post" });
    } else {
      await Like.create({
        UserId: userId,
        PostId: postId,
      });
      
      res.status(201).json({ user });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

// exports.likeOrDislike = async (req, res, next) => {
//   try {
//     const userId = req.body.UserId;
//     const postId = req.params.id;
//     const user = await Like.findOne({
//       where: { UserId: userId, PostId: postId },
//     });
//     console.log(user);
//     if (user === null) {

//       if (req.body.like === 1) {
//         //Like case
//       const create = await Like.create({
//           UserId: userId,
//           PostId: postId,
//         });
//         console.log(create);
//         await Post.increment({ like: 1 }, { where: { id: postId } });
//         res.status(201).json({ message: "Like envoyé et pris en compte." });
//       } else if (req.body.like === -1) {
//         //Dislike case
//         await Like.create({
//           PostId: postId,
//           UserId: userId,
//         });
//         await Post.increment({ dislike: 1 }, { where: { id: postId } });
//         res.status(201).json({ message: "Dislike envoyé et pris en compte." });
//       } else {
//         console.log("hello");
//       }
//     } else {
//       console.log("here hello");
//     }
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// };
