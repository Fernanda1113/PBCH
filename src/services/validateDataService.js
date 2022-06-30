import { Product } from "../model/entities/Product.js";
import { Message } from "../model/entities/Message.js";
import { User } from "../model/entities/User.js";

class ValidateDataService {
  validateId = id => {
    if (!((typeof id == "string" || typeof id == "number") && /^\w+$/.test(id)))
      return { error: "El parámetro no es válido" };
    else return true;
  };

  validatePostProductBody = data => {
    const validProduct = Product.validate(data, true);
    return validProduct
      ? validProduct
      : { error: "El formato de datos o los valores enviados no son válidos" };
  };

  validatePutProductBody = data => {
    const validData = Product.validate(data);
    if (!validData)
      return {
        error: "El formato de datos o los valores enviados no son válidos"
      };
    else if (Object.keys(validData)?.length === 0)
      return {
        error: "No hay campos válidos para actualizar"
      };
    else {
      return validData;
    }
  };

  validateRegisterPost = (username, password) => {
    return User.validate({ username, password }, true) ? true : false;
  };

  validateMessage = data => {
    const validMessage = Message.validate(data, true);
    return validMessage
      ? validMessage
      : { error: "El formato de datos o los valores enviados no son válidos" };
  };
}

export default ValidateDataService;