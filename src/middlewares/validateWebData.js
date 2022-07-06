import ValidateDataService from "../services/validateDataService.js";

const validateDataService = new ValidateDataService();

const validateRegisterPost = (ctx, next) => {
  const { username, password } = ctx.request.body;
  if (validateDataService.validateRegisterPost(username, password)) {
    next();
  } else {
    res.redirect("/register");
  }
};

export { validateRegisterPost };