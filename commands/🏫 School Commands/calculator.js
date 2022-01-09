const Discord = require('discord.js');
const { Calculator } = require("leaf-utils");
module.exports = {
  name: "calculator",
  aliases: ["ti82", "taschenrechner"],
  category: "🏫 School Commands",
  description: "Allows you to use a calculator",
  usage: "calc",
  run: async (client, message, args, cmduser, text, prefix) => {
const Leafcalculator = new Calculator({
  destroy: "You locked me", //Default: "Calculator Locked"
  invalid: "Next time just put in a valid calculation!", //Default: Invalid Calculation"
  notauthor: "You aren't the calculator owner", //Default: "Only the author can use the calculator"
  deactivatemessasge: "I deactivated me", //Default: "The Calculator got deactivated"
  deactivatetime: 1000000, //Default are 10 minutes
  message: message, //Required
});

await Leafcalculator.start();
  }
}