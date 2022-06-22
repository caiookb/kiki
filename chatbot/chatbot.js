"use strict";
const dialogflow = require("dialogflow");
const structjson = require("./structjson");
const config = require("../config/keys");

const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Status = require("../models/Status");

const projectID = config.googleProjectID;
const credentials = {
  client_email: config.googleClientEmail,
  private_key: config.googlePrivateKey,
};

const { SessionsClient } = require("dialogflow");
const { struct } = require("pb-util");
const { setMaxListeners } = require("../models/User");

const sessionClient = new SessionsClient({
  projectID,
  credentials,
});

const createUserToken = (user) => {
  return jwt.sign({ user }, config.jwt_secret, {
    expiresIn: config.jwt_expires_in,
  });
};

module.exports = {
  textQuery: async (text, userID, parameters = {}, token) => {
    const sessionPath = sessionClient.sessionPath(
      config.googleProjectID,
      config.dialogFLowSessionID + userID
    );
    let self = module.exports;
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: text,
          languageCode: config.dialogFLowSessionLanguageCode,
        },
      },
      queryParams: {
        payload: {
          data: parameters,
        },
      },
    };

    let responses = await sessionClient.detectIntent(request);
    responses = await self.handleAction(responses, token);
    return responses;
  },
  eventQuery: async (event, userID, parameters = {}, token) => {
    const sessionPath = sessionClient.sessionPath(
      config.googleProjectID,
      config.dialogFLowSessionID + userID
    );

    let self = module.exports;

    const request = {
      session: sessionPath,
      queryInput: {
        event: {
          name: event,
          parameters: structjson.jsonToStructProto(parameters),
          languageCode: config.dialogFLowSessionLanguageCode,
        },
      },
    };

    let responses = await sessionClient.detectIntent(request);
    responses = await self.handleAction(responses, token);

    return responses;
  },
  handleAction: async (responses, token) => {
    let self = module.exports;

    let queryResult = responses[0].queryResult;
    let action = queryResult.action;

    const statusToChange = queryResult.parameters.fields;

    if (Object.keys(statusToChange).length > 0) {
      const userStatus = [
        "mental_health_stage",
        "behaviour_quiz",
        "flow_status",
        "hiv_status",
      ];

      userStatus.map((status) => {
        if (queryResult.parameters.fields[status]) {
          console.log(queryResult.parameters.fields[status]);
          self.setNewStatusByField(
            status,
            statusToChange[status].stringValue,
            token
          );
        }
      });
    }

    if (action === "call_register_user") {
      return self.eventQuery("start_register");
    }

    if (action === "call_introduction") {
      return self.eventQuery("call_introduction");
    }

    if (queryResult.action == "registering_user") {
      if (queryResult.allRequiredParamsPresent) {
        return self
          .createUser(queryResult.parameters.fields)
          .then((res) => {
            console.log("User register response", res);
            return { responses, token: res.token };
          })
          .catch((err) => {});
      }
    }

    if (action == "finishied_risky_questions") {
      console.log(queryResult);
      return self.eventQuery("did_you_know_you_can_prevent");
    }
    if (action === "user_does_not_wants_to_know_state") {
      return self.eventQuery("call_realize_mental_test");
    }

    if (
      action ===
      "moreinfoaboutpreventingaids.moreinfoaboutpreventingaids-no.moreinfoaboutpreventingaids-no-no.moreinfoaboutpreventingaids-no-no-yes"
    ) {
      return self.eventQuery("stage_a_final_steps");
    }
    if (action === "user_wants_to_know_state") {
      return self.eventQuery("start_behavior_quiz");
    }

    if (action === "set_user_on_stage_a") {
      return self.eventQuery("stage_a_flow");
    }

    if (action.includes("user_has_hiv_")) {
      const hivStatus = action.split("_")[3];
      self.setNewStatusByField("hiv_status", hivStatus, token);

      if (hivStatus === "doubt" || hivStatus === "negative")
        return self.eventQuery("start_behavior_quiz");

      return self.eventQuery("embrace_hiv_positive");
    }

    return { responses };
  },
  createUser: async (fields) => {
    try {
      const userData = {
        name: fields.name.structValue.fields.name.stringValue,
        birthdate: fields.birthdate.stringValue,
        country: fields.country.stringValue,
        city: fields.city.stringValue,
        email: fields.email.stringValue,
        password: fields.password.stringValue,
      };

      try {
        const user = await User.create(userData);
        user.password = undefined;

        //Creating user status table
        const status = await Status.create({
          user_id: user._id,
          flow_status: "user_signed_up",
        });

        return { user, token: createUserToken(user), status };
      } catch (err) {
        console.log("Erro na hora de criar o user", err);
        throw err;
      }
    } catch (err) {
      return { error: "Server error, try again later." };
    }
  },
  me: async (token) => {
    try {
      const userDecoded = await jwt.decode(token).user;
      const userStatus = await Status.find({ user_id: userDecoded._id });
      return { ...userDecoded, userStatus };
    } catch (err) {
      throw err;
    }
  },
  setNewStatusByField: async (field, value, token) => {
    const userDecoded = await jwt.decode(token).user;

    try {
      await Status.findOneAndUpdate(
        {
          user_id: userDecoded._id,
        },
        { [field]: value },
        { useFindAndModify: false }
      );

      const updatedUser = await User.findOne({ _id: userDecoded._id });
      const userStatus = await Status.findOne({ user_id: userDecoded._id });

      return { ...updatedUser, userStatus };
    } catch (err) {
      console.log("error", err);
    }
  },
  getUpdatedStatus: async (token) => {
    try {
      const userDecoded = await jwt.decode(token).user;
      console.log("user decoded", userDecoded);
      const updatedStatus = await Status.findOne({ user_id: userDecoded._id });
      return updatedStatus;
    } catch (err) {
      throw err;
    }
  },
};
