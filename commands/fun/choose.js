module.exports = {
  name: 'choose',
  aliases: [],
  async execute({ message, input, args }) {
    if (!args[0]) return message.channel.send("Please Give Me Text!");
    if (!input.toLowerCase().includes(" ")) {
      return message.channel.send("Please Give Me 2nd Choice. jgn lebih :/");
    }
    if (input.toLowerCase().endsWith(" ")) {
      return message.channel.send("Please Give Me 2nd Choice!. jgn lebih :/");
    }
    if (input.length > 500)
      return message.channel.send("wuh santai ngab | Limit : 500");
    let LowerCaseOr = input
      .replace("Or", "or")
      .replace("oR", "or")
      .replace("OR", "or");
    let Select = LowerCaseOr.split(` `);
    let Result = Select[Math.floor(Math.random() * Select.length)];
    message.channel.send(Result);
  }
};
