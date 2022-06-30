import ValidateDataService from "../services/validateDataService.js";

const validateDataService = new ValidateDataService();

const validateRegisterPost = (req, res, next) => {
  const { username, password } = req.body;
  if (validateDataService.validateRegisterPost(username, password)) {
    next();
  } else {
    res.redirect("/register");
  }
};

export { validateRegisterPost };