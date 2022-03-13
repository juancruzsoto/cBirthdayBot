const { Telegraf } = require("telegraf");
require('dotenv').config({path: ".env"});

const bot = new Telegraf(process.env.TOKEN_TELEGRAM);

let reminder;

const helpMessage =
  "Listado de comandos disponibles anashei \n /start \n /reminderON \n /reminderOff";

bot.start((ctx) => {
  ctx.reply("/help");
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