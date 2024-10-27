const { capitalize, formatNumber } = require("../../contracts/helperFunctions.js");
const minecraftCommand = require("../../contracts/minecraftCommand.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");

class BlitzSGCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "blitz";
    this.aliases = ["blitzsg", "bsg", "sg"];
    this.description = "Blitz SG stats of specified user.";
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
      const modes = ["solo", "teams"];

      const mode = modes.includes(msg[0]) ? msg[0] : "overall";
      username = modes.includes(msg[0]) ? msg[1] : msg[0] || username;

      const player = await hypixel.getPlayer(username);

      if (["overall", "all"].includes(mode)) {
        const { kit, kills, wins, KDRatio, WLRatio } = player.stats.blitzsg;

        this.send(
          `/gc ${player.nickname} KDR: ${KDRatio} Wins: ${formatNumber(
            wins,   
            )} Kills: ${formatNumber(kills)}`,
            
        );
      } else if (mode != undefined) {
        var { kit } = player.stats.blitzsg;
        const { kills, wins, KDRatio, WLRatio } = player.stats.blitzsg[mode];

        this.send(
          `/gc ${player.nickname} ${capitalize(mode)} KDR: ${KDRatio} Wins: ${formatNumber(
            wins,
            )} Kills: ${formatNumber(kills)}`,
        );
      } else {
        this.send("/gc Invalid mode. Valid modes: overall, solo, teams");
      }
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

module.exports = BlitzSGCommand;
