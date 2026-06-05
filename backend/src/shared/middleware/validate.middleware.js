const validate = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
    } catch (error) {
      return res.status(400).json({
        success: false,
        errors: error.errors,
      });
    }
  };
};

export default validate;
