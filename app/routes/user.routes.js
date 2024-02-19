const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", [authJwt.verifyToken], controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/org",
    [authJwt.verifyToken, authJwt.isOrganizer],
    controller.organizerBoard 
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.get(
    "/api/test/agent",
    [authJwt.verifyToken, authJwt.isAgent],
    controller.agentBoard
  );

  module.exports = function(app) {
    // Route pour supprimer un compte utilisateur par l'administrateur
    app.delete("/api/admin/users/:userId", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteUser);
  };

};
