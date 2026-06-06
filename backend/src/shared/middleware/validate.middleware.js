const validate =
  (schema) =>
  async (req, res, next) => {
    try {
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