const HypixelDiscordChatBridgeError = require("../../contracts/errorHandler.js");
const { getUUID, getUsername } = require("../../contracts/API/mowojangAPI.js");
const { readFileSync } = require("fs");
const { SuccessEmbed } = require("../../contracts/embedHandler.js");

module.exports = {
    name: "setrank",
    description: "Set the rank of a player in the guild.",
    adminOnly: true,
    options: [
      {
        name: "username",
        description: "The player's username",
        type: 3,
        required: true,
      },
      {
        name: "rank",
        description: "The rank to set",
        type: 3,
        required: true,
      }
    ],
  
    execute: async (interaction) => {
        const username = interaction.options.getString("username");
        const rank = interaction.options.getString("rank");
        const linkedData = readFileSync("data/linked.json");
        if (linkedData === undefined) {
          throw new HypixelDiscordChatBridgeError(
            "The linked data file does not exist. Please contact an administrator.",
          );
        }

        const linked = JSON.parse(linkedData);
        if (linked === undefined) {
          throw new HypixelDiscordChatBridgeError("The linked data file is malformed. Please contact an administrator.");
        }

        bot.chat(`/g setrank ${username} ${rank}`);

        const uuid = await getUUID(username);
        if (uuid !== undefined) {
          const discordID = Object.keys(linked).find((key) => linked[key] === uuid);
          if (discordID !== undefined) {
            const user = await guild.members.fetch(discordID);
            const updateRolesCommand = require("./updateCommand.js");
            if (updateRolesCommand !== undefined) {
              await updateRolesCommand.execute(interaction, user);
            }
          }
        }

        

        const embed = new SuccessEmbed(`Set \`${username}\`'s guild rank to \`${rank}\`.`);

        await interaction.followUp({
        embeds: [embed],
        });
    },
  };
  