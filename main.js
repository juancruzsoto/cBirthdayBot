const { Telegraf } = require("telegraf");
const { firebase } = require("./config-firebase")
require('dotenv').config({path: ".env"});

const bot = new Telegraf(process.env.TOKEN_TELEGRAM);

// console.log(db)

const loadData = async (uid) => {
    const response = await firebase.firestore().collection(`${uid}/cumpleaños/personas`).get();
    const data = [];

    response.forEach((persona) => {
      const personaData = persona.data();

      data.push({
        id: persona.id,
        ...personaData,
      });
    });

    return data;
  };

// console.log(loadData("gFx7y0skAHW4JvVaa51oyTY1wBe2"))

let reminder;

const helpMessage =
  "Listado de comandos disponibles anashei \n /start \n /reminderON \n /reminderOff";

bot.start((ctx) => {
  ctx.reply("/help Hola");
});

bot.hears("/reminderON", (ctx) => {
  if (reminder) {
    ctx.reply("Recordatorios ya se encuentran activados");}
    else{
        ctx.reply("Recordatorios Activados")
    reminder = setInterval(() => {
      console.log(new Date().getSeconds(), new Date().getHours());
      ctx.reply("aaaa");
    }, 1000);
  }
});

bot.hears("/reminderOff", (ctx) => {
  ctx.reply("Recordatorios Desactivados");
  clearInterval(reminder);
  reminder = None
});

bot.help((ctx) => {
  ctx.reply(helpMessage);
});
bot.hears("hi", (ctx) => ctx.reply("bit4you.io is awesome"));

bot.launch();