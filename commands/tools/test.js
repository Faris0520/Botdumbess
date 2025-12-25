module.exports = {
  name: 'test',
  aliases: [],
  async execute({ message, Discord }) {
    let emoji = [
      "<:patk3:727906033061855232>",
      "<:eugh:831477683426295811>",
      "<:ndaktau:831494322901352498>",
      "<:heeeeeqqq:730722268107505725>",
      "<:pog:809959799361372202>",
      "<:Y_:734443758313144360>",
      "<:uh:829334002347278396>",
      "<:oh:734444160177799178>",
      "<:sudahkuduqa:831210009861423126>",
      "<:Yoi:745142694359334912>",
      "<a:790481697145225237:812973632799244318>",
      "<:thanos:826748195899703316>",
      "<:imsad:831776276163067986>",
    ];
    let random = Math.floor(Math.random() * emoji.length);
    message.react(`${emoji[random]}`);
  }
};
