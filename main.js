import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBLPic1kXD-AxUXDQZHqLADMtPWwxNFEp0",
  authDomain: "calendar-bd-71d86.firebaseapp.com",
  projectId: "calendar-bd-71d86",
  storageBucket: "calendar-bd-71d86.appspot.com",
  messagingSenderId: "702803305481",
  appId: "1:702803305481:web:330ded7e57bc7e4358c4d8",
  measurementId: "G-583X0XPZ3R",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth;

import { Telegraf } from "telegraf";
// import {firebase} from
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const bot = new Telegraf(process.env.TOKEN_TELEGRAM);

// console.log(db)

const loadData = async (uid) => {
  const response = await db.collection(`${uid}/cumpleaños/personas`).get();
  const data = [];

  response.forEach((persona) => {
    const personaData = persona.data();

    data.push({
      id: persona.id,
      ...personaData,
    });
  });

  console.log(data);
  return data;
};

console.log(loadData("gFx7y0skAHW4JvVaa51oyTY1wBe2"));

let reminder;

const helpMessage =
  "Listado de comandos disponibles anashei \n /start \n /reminderON \n /reminderOff";

bot.start((ctx) => {
  ctx.reply(
    "Hola, para iniciar ingresa /login y sigue las instrucciones: \n /help - Visualizar lista de comandos"
  );
  console.log(ctx);
});   

bot.hears("/reminderON", (ctx) => {
  if (reminder) {
    ctx.reply("Recordatorios ya se encuentran activados");
  } else {
    ctx.reply("Recordatorios Activados");
    reminder = setInterval(() => {
      console.log(new Date().getSeconds(), new Date().getHours());
      ctx.reply("aaaa");
    }, 1000);
  }
});

bot.hears("/reminderOff", (ctx) => {
  ctx.reply("Recordatorios Desactivados");
  clearInterval(reminder);
  reminder = None;
});

bot.help((ctx) => {
  ctx.reply(helpMessage);
});

const regex = new RegExp("^(/connect_[a-zA-Z0-9_]*)$");

// Math.random().toString(36).substr(2)
bot.hears(regex, (ctx) => {
  let data = ctx.message.text.split("_");
  console.log(data);
  db.collection(`${data[1]}/cumpleaños/telegram`)
    .get()
    .then((response) => {
      response.forEach(async (persona) => {
        if (persona.data().token === data[2]) {
          ctx.reply("Cuenta enlazada con exito");
          let response = await db
            .collection(`${data[1]}/cumpleaños/profile`)
            .get();
          response.forEach((persona) => {
            console.log(ctx.message.chat)
            db.doc(`${data[1]}/cumpleaños/profile/${persona.id}`).update({...persona.data(),
              messageid: ctx.message.chat.id
            });
          });
        } else {
          ctx.reply("No se pudo enlazar la cuenta, reingrese el comando");
        }
      });
    });
});

bot.launch();
