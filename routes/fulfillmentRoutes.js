const { WebhookClient } = require("dialogflow-fulfillment");

const mongoose = require("mongoose");
const Demand = mongoose.model("demand");
const User = require("../models/User");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = (app) => {
  app.post("/", async (req, res) => {
    const agent = new WebhookClient({ request: req, response: res });

    function welcome(agent) {
      agent.add(`Hey, welcome!`);
      agent.setFollowupEvent({ name: "call_register_user" });
    }

    function fallback(agent) {
      agent.add(`I didn't understand`);
      agent.add(`I'm sorry, can you try again?`);
    }

    async function registerUser(agent) {
      try {
        const parameters = agent.parameters;
        const userData = {
          name: parameters.name.name,
          birthdate: parameters.birthdate,
          country: parameters.country,
          city: parameters.city,
          email: parameters.email,
          password: parameters.password,
        };

        try {
          const user = await User.create(userData);
          console.log("User created", user);
          user.password = undefined;

          //Creating user status table
          const status = await Status.create({
            user_id: user._id,
            flow_status: "user_signed_up",
          });

          return { user, token: createUserToken(user), status };
        } catch (err) {
          throw err;
        }
      } catch (err) {
        console.log("error no servidor", err);
        return { error: "Server error, try again later." };
      }
    }

    let intentMap = new Map();
    intentMap.set("Kiki says welcome :)", welcome);
    intentMap.set("registerUser", registerUser);
    intentMap.set("Default Fallback Intent", fallback);

    agent.handleRequest(intentMap);
  });
};
