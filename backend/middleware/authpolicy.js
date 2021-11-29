const Joi = require("joi");

module.exports = {
  register(req, res, next) {
    const schema = Joi.object({
        username: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().email().lowercase().required(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')),
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      switch (error.details[0].context.key) {
        case "email":
          res
            .status(400)
            .json({ error: "Veuillez rentrer une addresse e-mail valide." });
          break;
        case "password":
          res.status(400).json({
            error: `Veuillez rentrer un mot de passe correct:
            <br>
            1. Il doit contenir seulement les caractères suivants: minuscules, majuscules, chiffres.
            <br>
            2. Il doit contenir au minimum 6 caratères et au maximum 32 caractères.`,
          });
          break;
        default:
          res
            .status(400)
            .json({ error: 'Les informations ne sont pas valides' });
      }
    } else {
      next();
    }
  },
};
