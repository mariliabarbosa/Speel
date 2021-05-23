const yup = require("yup");

const sensor = async (req, res, next) => {
  try{
      const schema = yup.object().shape({
          id: yup.string(),
          name: yup.string().notRequired(),
          state: yup.boolean().notRequired(),
      });
      schema.validate(req.body);
      
      return next();
  } catch (err) {
      return res.status(400).json({
          message: "Validation failed.",
      })
  }
};

module.exports = sensor;