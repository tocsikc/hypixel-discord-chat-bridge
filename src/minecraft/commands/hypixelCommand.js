const { capitalize, formatNumber } = require("../../contracts/helperFunctions.js");
const minecraftCommand = require("../../contracts/minecraftCommand.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");

class hypixelCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "hypixel";
    this.aliases = ["general", "level"];
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
      const msg = this.getArgs(message).map((arg) => arg.replaceAll("/", ""));
      username = modes.includes(msg[0]) ? msg[1] : msg[0] || username;

      const { level } = player.level;
      const { guild } = player.guild;
      const { rank } = player.rank;
      const { firstLogin } = player.firstLogin;
      const { achievementPoints } = player.achievementPoints;



      this.send(
        `/gc [${rank}] ${ player.nickname } Level: ${ level } Guild: ${ guild } AP: ${ achievementPoints } First Join: ${ firstLogin }`,
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
