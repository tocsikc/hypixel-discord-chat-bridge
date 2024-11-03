const { Embed } = require("../../contracts/embedHandler.js");

const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
const { capitalize, formatNumber } = require("../../contracts/helperFunctions.js");

module.exports = {
  name: "check",
  description: "Checks if a player can join the Guild.",
  moderatorOnly: false,
  requiresBot: false,
  options: [
    {
      name: "name",
      description: "Minecraft Username",
      type: 3,
      required: true,
    },
  ],

  execute: async (interaction) => {
    try {
        username = interaction.options.getString("name")
  
        const player = await hypixel.getPlayer(username);
  
        const hypixel_level = player.level;
        const { rank, firstLoginTimestamp, uuid } = player;
        const { level, finalKDRatio, wins } = player.stats.bedwars;
        
        if ( (hypixel_level >= 75 && (wins >= 500 || (finalKDRatio * finalKDRatio * level) >= 500)) || (wins >= 500 && (finalKDRatio * finalKDRatio * level) >= 500) ) {
          var check = "<:check:1292952608570609726> Allowed"
        
        } else if ( (finalKDRatio * finalKDRatio * level) >= 3000 ) {
          var check = "<:check:1292952608570609726> Allowed (alt)"
        } else {
          var check = "<:cross:1292952625536438333> Not Allowed"
        }
        
        const embed = new Embed()
          .setTitle('[${rank}] ${player.nickname}')
          .setDescription('## Status: ' + check)
          .setThumbnail(`https://mc-heads.net/head/${uuid}`)
          .addFields(
            { name: 'Network Level', value: Math.floor(hypixel_level) },
            { name: 'Bedwars Level', value: '`[' + level + "✫]`" },
            { name: 'Wins', value: wins, inline: true },
            { name: 'FKDR', value: finalKDRatio, inline: true },
            { name: 'Index', value: formatNumber(finalKDRatio * finalKDRatio * level), inline: true },
            { name: 'First Login', value: '<t:' + firstLoginTimestamp + ':f>' },
          );

        await interaction.followUp({
            embeds: [embed],
        });
        
    } catch (error) {
        const embed = new Embed()
          .setTitle('Error!')
          .setDescription(`/gc ${error
            .toString()
            .replace("[hypixel-api-reborn] ", "")
            .replace("For help join our Discord Server https://discord.gg/NSEBNMM", "")
            .replace("Error:", "")}`,
          );
        await interaction.followUp({
            embeds: [embed],
        });
      };


    await interaction.followUp({
      embeds: [embed],
    });
  },
};
