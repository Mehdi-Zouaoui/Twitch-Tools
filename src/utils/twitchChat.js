const tmi = require("tmi.js");

export const tmiClient = new tmi.Client({
  options: { debug: true, messagesLogLevel: "info" },
  connection: {
    secure: true,
  },
  identity: {
    username: "twoolsbot",
    password: "oauth:3v5b2me2u2xxq390nmub33xrhyhcxe",
  },
  channels: ["twoolsbot"],
});