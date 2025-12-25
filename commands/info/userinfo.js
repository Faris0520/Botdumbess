module.exports = {
  name: 'userinfo',
  aliases: ['ui'],
  async execute({ message, Discord, MessageEmbed }) {
    var person = message.author;
    let memberinfo = message.guild.member(person);
    let role = message.member.roles.hoist;
    const umser = new MessageEmbed()
      .setColor("BLUE")
      .setTitle(`${person.username} Userinfo`)
      .setAuthor(person.tag, person.displayAvatarURL({ format: "png" }))
      .setThumbnail(person.displayAvatarURL({ format: "png" }))
      .addFields(
        { name: "Created at", value: `${person.createdAt}`, inline: true },
        { name: "ID", value: person.id, inline: true },
        { name: "Joined at", value: memberinfo.joinedAt, inline: true },
        { name: "Roles", value: role, inline: true }
      )
      .setTimestamp()
      .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ format: "png" }));
    const embed = await message.channel.send(umser);
    if (message.member.presence.activities[0] && message.member.presence.activities[0].name === "Spotify") {
      embed.react("<:r_spotify:843373295046885386>");
      const spotify = new MessageEmbed()
        .setAuthor("Listening to Spotify")
        .setColor("GREEN")
        .setThumbnail(person.presence.activities[0].assets.largeImageURL())
        .setDescription(
          `${person.presence.activities[0].details}\nby ${person.presence.activities[0].state}\n**${person.presence.activities[0].assets.largeText}**`
        );
      message.channel.send(spotify);
    }
    const filter = (reaction, user) => {
      return (
        reaction.emoji.name === "r_spotify" &&
        user.id === message.author.id
      );
    };
    embed
      .awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
      .then((collected) => {
        const reaction = collected.first();
        const spotify = new MessageEmbed()
          .setAuthor(
            "Listening to Spotify",
            "https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-icon-marilyn-scott-0.png"
          )
          .setColor("GREEN")
          .setThumbnail(person.presence.activities[0].assets.largeImageURL())
          .setDescription(
            `${person.presence.activities[0].details}\nby ${person.presence.activities[0].state}\n**${person.presence.activities[0].assets.largeText}**`
          );
        message.channel.send(spotify);
      });
  }
};
