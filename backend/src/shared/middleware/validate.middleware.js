// const validate = (schema) => {
//   return (req, res, next) => {
//     try {
//       schema.parse(req.body);
//       next();
//     } catch (error) {
//       return res.status(400).json({
//         success: false,
//         errors: error.issues,
//       });
//     }
//   };
// };

// export default validate;

const validate = (schema) => async (req, res, next) => {
  try {
    await schema.ParseAsync({
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
