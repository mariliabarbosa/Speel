const yup = require("yup");

const user = async (req, res, next) => {
  try{
      const schema = yup.object().shape({
          name: yup.string().required(),
          email: yup.string().email().required(),
          cnpj: yup.string().required(),
          password: yup.string().min(6).required(),
      });
      schema.validate(req.body);
      
      return next();
  } catch (err) {
      return res.status(400).json({
          message: "Validation failed.",
      })
  }
};

module.exports = user;