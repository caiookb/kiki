const chatbot = require("../chatbot/chatbot");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.send({ hello: "there" });
  });

  app.post("/api/df_text_query", async (req, res) => {
    let responseFromServer = await chatbot.textQuery(
      req.body.text,
      req.body.userID,
      req.body.parameters,
      req.cookies && req.cookies.token
    );

    if (responseFromServer.token) {
      res.cookie("token", responseFromServer.token, {
        maxAge: 999999999,
      });
      res.send(responseFromServer);
    } else {
      res.send(responseFromServer);
    }
  });

  app.get("/api/me", async (req, res) => {
    try {
      let responseFromServer = await chatbot.me(
        req.cookies && req.cookies.token
      );
      console.log(responseFromServer);
      res.send(responseFromServer);
    } catch (err) {
      res.status(404).send({ error: "User not found" });
    }
  });

  app.post("/api/df_event_query", async (req, res) => {
    let responseFromServer = await chatbot.eventQuery(
      req.body.event,
      req.body.userID,
      req.body.parameters,
      req.cookies && req.cookies.token
    );

    if (responseFromServer.user) {
      res
        .writeHead(200, {
          "Set-Cookie": `token=${responseFromServer.token}; HttpOnly`,
          "Access-Control-Allow-Credentials": "true",
        })
        .send(responseFromServer.responses[0].queryResult);
    } else {
      res.send(responseFromServer.responses[0].queryResult);
    }
  });
};
