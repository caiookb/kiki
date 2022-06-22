const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  if (process.env.NODE_ENV !== "production") {
    app.use(createProxyMiddleware("/api", { target: "http://localhost:5000" }));
  } else {
    app.set("trust proxy", 1);

    app.use(
      createProxyMiddleware("/api", {
        target: "https://polar-waters-56011.herokuapp.com",
      })
    );
  }
};
