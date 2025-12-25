module.exports = {
  name: 'userinfo2',
  aliases: [],
  async execute({ message, Discord, MessageEmbed }) {
    let person = message.mentions.members.first();
    if (person == undefined) {
      let nick = message.member.nickname;
      let role = message.member.roles.hoist;
      let roleColor = message.member.displayHexColor;
      if (roleColor == "#000000") roleColor = "#99aab5";
      let embed = new MessageEmbed()
        .setAuthor("User Info", message.author.avatarURL())
        .setColor("BLUE")
        .setThumbnail(message.author.avatarURL())
        .addField("Username", message.author.username, true);
      if (!(nick == null || nick == message.author.username)) {
        embed.addField("Nickname", nick, true);
      }
      embed.addField(
        "Joined at",
        message.member.joinedAt.toLocaleString(),
        true
      );
      embed.addField(
        "Created at",
        message.author.createdAt.toLocaleString(),
        true
      );
      if (message.member.presence.activities[0] != null) {
        embed.addField(
          "Game",
          message.member.presence.activities[0].name,
          false
        );
      }
      embed.addField("Status", message.member.presence.status, true);
      embed.addField("Highest Role", role, false);
      message.channel.send(embed).catch(console.error);
    } else {
      message.mentions.members.forEach((person) => {
        let nick = person.nickname;
        let role = person.roles.hoist;
        let roleColor = person.displayHexColor;
        if (roleColor == "#000000") roleColor = "#99aab5";
        let embed = new MessageEmbed()
          .setAuthor("User Info", person.user.avatarURL())
          .setColor("BLUE")
          .setThumbnail(person.user.avatarURL())
          .addField("Username", person.user.username, false);
        if (!(nick == null || nick == message.author.username)) {
          embed.addField("Nickname", nick, false);
        }
        if (person.presence.activity != null) {
          embed.addField("Game", person.presence.activity.name, false);
        }
        embed.addField("Status", message.member.presence.status, false);
        embed.addField("Joined Date", person.joinedAt.toLocaleString(), false);
        embed.addField(
          "Account Creation Date",
          person.user.createdAt.toLocaleString(),
          false
        );
        embed.addField("Highest Role", role, false);
        message.channel.send(embed).catch(console.error);
      });
    }
  }
};
