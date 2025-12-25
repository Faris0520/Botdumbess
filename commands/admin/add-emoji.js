module.exports = {
  name: 'add-emoji',
  aliases: [],
  async execute({ message, args }) {
    message.guild.emojis.create(`${args[1]}`, `${args[2]}`).then((emoji) => {
      console.log(`Created new emoji with name ${emoji.name}!`);
      message.channel.send(`Created new emoji with name ${emoji.name}!`);
    });
  }
};
