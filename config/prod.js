module.exports = {
  googleProjectID: process.env.GOOGLE_PROJECT_ID,
  dialogFLowSessionID: process.env.DIALOGFLOW_SESSION_ID,
  dialogFLowSessionLanguageCode: process.env.DIALOGFLOW_LANGUAGE_CODE,
  googleClientEmail: process.env.GOOGLE_CLIENT_EMAIL,
  googlePrivateKey: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/gm, "\n"),
  mongoURI: process.env.MONGO_URI,
  jwt_secret: process.env.JWT_SECRET,
  jwt_expires_in: process.env.JWT_EXPIRES_IN,
  jwtSession: { session: false },
};
