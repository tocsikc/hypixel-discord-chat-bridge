const { capitalize, formatNumber } = require("../../contracts/helperFunctions.js");
const minecraftCommand = require("../../contracts/minecraftCommand.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");

class hypixelCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "hypixel";
    this.aliases = ["general"];
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
      
      const player = await hypixel.getPlayer(username);
      const guild = player.guild.name;
      const { level, rank, firstLogin, achievementPoints } = player;
      firstLogin = firstLogin.split(" ")
      
      this.send(
        `/gc [${rank}] ${player.nickname} Level: ${level} AP: ${achievementPoints} First Join: ${firstLogin[0]} ${firstLogin[1]} ${firstLogin[2]} ${firstLogin[3]}`,
      )

    } catch (error) {
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
