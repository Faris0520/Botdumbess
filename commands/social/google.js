module.exports = {
  name: 'google',
  aliases: ['gugel'],
  async execute({ message, input, MessageEmbed }) {
    if (!input)
      return message.channel.send(
        "mau cari afh? <:hmm:959422267236945970> || jangan sring dipake, ad limitny perhari ||"
      );
    const got = (await import("got")).default;
    const url = `https://api.lolhuman.xyz/api/gsearch?apikey=3f342f50d0fb2f0cbfdc7848&query=${input}`;
    let data = await got(url).then((res) => JSON.parse(res.body));
    let p = new MessageEmbed()
      .setAuthor(
        "Google Search",
        "https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
      )
      .setTitle(`${input}`)
      .setDescription(
        `**[${data.result[0].title}](${data.result[0].link})**\n\`${data.result[0].link}\`\n${data.result[0].desc}\n\n**[${data.result[1].title}](${data.result[1].link})**\n\`${data.result[1].link}\`\n${data.result[1].desc}\n\n**[${data.result[2].title}](${data.result[2].link})**\n\`${data.result[2].link}\`\n${data.result[2].desc}\n\n**[${data.result[3].title}](${data.result[3].link})**\n\`${data.result[3].link}\`\n${data.result[3].desc}\n\n**[${data.result[4].title}](${data.result[4].link})**\n\`${data.result[4].link}\`\n${data.result[4].desc}`
      )
      .setColor("#36393F");
    message.channel.send(p);
  }
};
