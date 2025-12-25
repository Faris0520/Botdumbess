module.exports = {
  name: 'impersonate',
  aliases: [],
  async execute({ message, input, args, client, Discord, MessageEmbed, bot }) {
    if (!input) return message.channel.send("||ndak tau udah||");
    const member = message.mentions.members.first() || await client.users.fetch(args[1]);
    if (!member) return message.reply("Can't find this user");
    let memer = member.user?.nickname || member.user?.username || member.username;
    message.delete();
    message.channel.createWebhook(memer, {
      avatar: member.user?.displayAvatarURL({ dynamic: true }) || member.displayAvatarURL({ dynamic: true }),
    }).then((webhook) => {
      webhook.send(args.join(" ").slice(29));
      setTimeout(() => {
        webhook.delete();
      }, 60000);
    });
    let log = bot.channels.cache.get("840513794119434271");
    let d = new MessageEmbed()
      .setColor("GREEN")
      .setAuthor(
        "- Sudo Commands -",
        message.author.displayAvatarURL({ format: "png" })
      )
      .addFields(
        { name: "From", value: `<@${message.author.id}>` },
        { name: "Target", value: `<@${member.user?.id || member.id}>` },
        { name: "Channel", value: `<#${message.channel.id}>` },
        { name: "Content", value: args.join(" ").slice(29) }
      )
      .setFooter(`si ${message.author.username} ngapus pesan`)
      .setTimestamp();
    log.send(d);
  }
};
