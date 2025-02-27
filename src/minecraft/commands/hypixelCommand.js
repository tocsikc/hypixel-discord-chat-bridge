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
      username = this.getArgs(message)[0] || username;
      
      const [ player, guild ] = await Promise.all([hypixel.getPlayer(username), hypixel.getGuild("player", username)]);
      const { level, rank, achievementPoints } = player;
      var firstLogin = player.firstLogin.toString().split(" ");
      
      this.send(
        `/gc [${rank}] ${player.nickname} Level: ${level} Guild: ${guild} AP: ${achievementPoints} First Join: ${firstLogin[0]} ${firstLogin[1]} ${firstLogin[2]} ${firstLogin[3]}`,
      );

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
