const validate = (schema) => async (req, res, next) => {
  try {
    console.log('Incoming body:', req.body);
    await schema.parseAsync({
      body: req.body,

      params: req.params,

      query: req.query,
    });

    next();
  } catch (error) {
    next(error);
  }
};

export default validate;
