//GET LOGIN
const getUser = (req, res) => {
    if (req.user) {
      res.send({
        user: req.user.nombre,
        avatar: req.user.avatar,
        carrito: req.user.carrito
      });
    } else {
      res.send(false);
    }
  };
  
  module.exports = {
    getUser,
  };  