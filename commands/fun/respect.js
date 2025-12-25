module.exports = {
  name: 'respect',
  aliases: ['f'],
  async execute({ message, input, MessageEmbed }) {
    if (!input) {
      let p = new MessageEmbed()
        .setDescription("Tekan <a:r_pressf:843389937139449856> untuk memberi respect.")
        .setColor("GREEN");
      return message.channel.send(p).then(async (msg) => {
        await msg.react("<a:r_pressf:843389937139449856>");
        const filter = async (reaction, user) => {
          const botReact = await user.bot;
          const userReact = await reaction.message.guild.members.cache.get(user.id);
          if (!botReact)
            message.channel.send(`**${userReact.user.username}** memberi respect.`);
          return reaction.emoji.id === "843389937139449856";
        };
        msg.awaitReactions({ filter, time: 30000 })
          .then((collected) => {
            const reaction = collected.get("843389937139449856");
            const count = reaction ? reaction.count - 1 : 0;
            message.channel.send(`**${count}** orang telah memberi respect 🫡`);
          })
          .catch((error) => {
            console.error("Failed to collect reactions:", error);
          });
      });
    } else {
      let reason = input;
      let p = new MessageEmbed()
        .setDescription(`Tekan <a:r_pressf:843389937139449856> untuk memberi respect ke **${input}**`)
        .setColor("GREEN");
      return message.channel.send(p).then(async (msg) => {
        await msg.react("<a:r_pressf:843389937139449856>");
        const filter = async (reaction, user) => {
          const botReact = await user.bot;
          const userReact = await reaction.message.guild.members.cache.get(user.id);
          if (!botReact)
            message.channel.send(`**${userReact.user.username}** memberi respect.`);
          return reaction.emoji.id === "843389937139449856";
        };
        msg.awaitReactions(filter, { time: 60000 })
          .then((collected) => {
            const reaction = msg.reactions.cache.get("843389937139449856");
            const count = reaction ? reaction.count - 1 : 0;
            message.channel.send(`**${count}** telah memberi respect ke **${input}** 🫡`);
          })
          .catch((error) => {
            console.error("Failed to collect reactions:", error);
          });
      });
    }
  }
};
