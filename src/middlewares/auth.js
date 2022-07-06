const isAuthWeb = (ctx, next) => {
    if (ctx.isAuthenticated()) {
      return next();
    }
    ctx.redirect("/login");
  };
  
  const isAuthApi = (ctx, next) => {
    if (ctx.isAuthenticated()) {
      return next();
    }
    ctx.status = 401;
  ctx.body = {
    error: "No autenticado",
    descripcion: `ruta '${ctx.path}' método '${ctx.method}' necesita autenticación`
  };
  };
  
  export { isAuthWeb, isAuthApi };