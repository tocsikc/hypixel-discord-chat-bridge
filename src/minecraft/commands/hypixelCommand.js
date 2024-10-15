const { capitalize, formatNumber } = require("../../contracts/helperFunctions.js");
const minecraftCommand = require("../../contracts/minecraftCommand.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");

class hypixelCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "general";
    this.aliases = ["hypixel"];
    this.description = "Hypixel stats of specified user.";
    this.options = [
      {
        name: "username",
        description: "Minecraft username",
        required: false,
      },
    ];
  }

  async onCommand(username, message) {
    try {
      console.log("hi ander")
      username = this.getArgs(message)[0] || username;
      console.log(username)
      console.log(this.getArgs(message)[0])
      
      const [ player, guild ] = await Promise.all([hypixel.getPlayer(username), hypixel.getGuild("player", username)]);
      console.log("hi ander2")
      const { level, rank, achievementPoints } = player;
      console.log("hi ander3")
      var firstLogin = player.firstLogin;
      console.log(firstLogin)
      var firstLogin = firstLogin.split("T");
      console.log(firstLogin)
      console.log("hi ander4")
      
      this.send(
        `/gc [${rank}] ${player.nickname} Level: ${level} Guild: ${guild} AP: ${achievementPoints} First Join: ${firstLogin}`,
      );
      console.log("hi ander76")

    } catch (error) {
      console.log(error)
      this.send(
        `/gc ${error
          .toString()
          .replace("[hypixel-api-reborn] ", "")
          .replace("For help join our Discord Server https://discord.gg/NSEBNMM", "")
          .replace("Error:", "[ERROR]")}`,
      );
    }
  }
}

module.exports = hypixelCommand;
