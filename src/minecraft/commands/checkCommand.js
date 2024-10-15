const { capitalize, formatNumber } = require("../../contracts/helperFunctions.js");
const minecraftCommand = require("../../contracts/minecraftCommand.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");

class checkCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "check";
    this.aliases = [];
    this.description = "Check if the user meets the Guild join requirements.";
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

      const hypixel_level = player.level;
      const rank = player.rank;
      const { level, finalKDRatio, wins } = player.stats.bedwars;
      
      if ( (level >= 75 && (wins >= 500 || (finalKDRatio * finalKDRatio * level) >= 500)) || (wins >= 500 && (finalKDRatio * finalKDRatio * level) >= 500) ) {
        var check = "is Allowed"
      
      } else if ( (finalKDRatio * finalKDRatio * level) >= 3000 ) {
        var check = "is Allowed if Alt"
      } else {
        var check = "is Not allowed"
      }

      this.send(
            `/gc [${rank}] ${player.nickname} ${check}. Level: ${Math.floor(hypixel_level)} | [${level}✫] FKDR: ${finalKDRatio} W: ${formatNumber(
                wins,
            )} I: ${formatNumber(finalKDRatio * finalKDRatio * level)}`,
          );
      
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

module.exports = checkCommand;
