import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { Telegraf } from "telegraf";
import dotenv from "dotenv";

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
  let currentYear = new Date().getFullYear() - 1;
  let event = [];
  for (var i = 0; i < 3; i++) {
    // eslint-disable-next-line
    data.map((person) => {
      if (person.fecha.seconds) {
        var t = new Date(1970, 0, 1); // Epoch
        t.setSeconds(person.fecha.seconds);
        t.setYear(currentYear);
      } else {
        t = person.fecha;
        t.setYear(currentYear);
      }
      event.push({
        id: person.id,
        fecha: t.toISOString().slice(0, -14),
        nombre: person.nombre,
      });
    });
    currentYear++;
  }
  event.sort((a, b) => {
    let fa = a.fecha.split("-"),
      fb = b.fecha.split("-");
    if (
      new Date(+fa[0], fa[1] - 1, +fa[2]) > new Date(+fb[0], fb[1] - 1, +fb[2])
    ) {
      return 1;
    } else {
      return -1;
    }
  });
  // console.log(event);
  return event;
};

// console.log(await loadData("gFx7y0skAHW4JvVaa51oyTY1wBe2"), "Asdasdassaddsa");

const helpMessage =
  "Listado de comandos disponibles anashei \n /start \n /reminderON \n /reminderOff";

bot.start((ctx) => {
  ctx.reply(
    "Hola, para iniciar ingresa /login y sigue las instrucciones: \n /help - Visualizar lista de comandos"
  );
  console.log(ctx);
});

console.log(
  new Date(
    new Date(new Date().setDate(new Date().getDate() + 1)).setHours(0, 0, 0, 0)
  ).getTime() - new Date().getTime()
);

const recordatorio = (tiempo, ctx) => {
  setTimeout(async () => {
    let reminder = await db.doc(`usersTelegram/${ctx.message.chat.id}`).get();

    if (reminder.data()) {
      if (reminder.data().recordatorio === 1) {
        let bdays = await loadData(reminder.data().token);
        let aux = new Date();
        bdays.forEach((bd, index, arr) => {
          let fa = bd.fecha.split("-");
          fa = new Date(+fa[0], fa[1] - 1, +fa[2]);
          if (
            fa.toISOString().slice(0, -14) === aux.toISOString().slice(0, -14)
          ) {
            ctx.reply(`HOY ES CUMPLEAÑOS DE: ${bd.nombre}`);
            arr.length = index + 1;
          }else{ctx.reply("prueba")}
          if (fa > aux) {
            arr.length = index + 1;
          }
        });
        recordatorio(86400000, ctx);
      }
    }
  }, tiempo);
};

bot.hears("/reminderON", async (ctx) => {
  let reminder = await db.doc(`usersTelegram/${ctx.message.chat.id}`).get();

  if (reminder.data()) {
    if (reminder.data().recordatorio === 1) {
      ctx.reply("Recordatorios ya se encuentran activados");
    } else {
      ctx.reply("Recordatorios Activados");
      db.doc(`usersTelegram/${ctx.message.chat.id}`).set({
        ...reminder.data(),
        recordatorio: 1,
      });
      recordatorio(
        new Date(
          new Date(new Date().setDate(new Date().getDate() + 1)).setHours(0,0,0,0)).getTime() - new Date().getTime(),
        ctx
      );
    }
  } else {
    ctx.reply(
      "Primero debe enlazar su cuenta con el bot, siga las instrucciones: https://cbirthday.herokuapp.com/telegram"
    );
  }
});

bot.hears("/reminderOff", async (ctx) => {
  let reminder = await db.doc(`usersTelegram/${ctx.message.chat.id}`).get();
  if (reminder.data()) {
    if (reminder.data().recordatorio === 0) {
      ctx.reply("Recordatorios ya se encuentran desactivados");
    } else {
    db.doc(`usersTelegram/${ctx.message.chat.id}`).set({
      ...reminder.data(),
      recordatorio: 0,
    });
    ctx.reply("Recordatorios Desactivados")}
  } else {
    ctx.reply(
      "Primero debe enlazar su cuenta con el bot, siga las instrucciones: https://cbirthday.herokuapp.com/telegram"
    );
  }
});

bot.help((ctx) => {
  ctx.reply(helpMessage);
});

const regex = new RegExp("^(/connect_[a-zA-Z0-9_]*)$");

// Math.random().toString(36).substr(2)
bot.hears(regex, async (ctx) => {
  let reminder = await db
    .doc(`usersTelegram/${ctx.message.chat.id1515234}`)
    .get();
  if (reminder.data()) {
    let data = ctx.message.text.split("_");
    console.log(data);
    db.collection(`${data[1]}/cumpleaños/telegram`)
      .get()
      .then((response) => {
        response.forEach(async (persona) => {
          if (persona.data().token === data[2]) {
            db.doc(`usersTelegram/${ctx.message.chat.id}`).set({
              token: data[1],
              recordatorio: 0,
            });
            ctx.reply("Cuenta enlazada con exito");
          } else {
            ctx.reply("No se pudo enlazar la cuenta, reingrese el comando");
          }
        });
      })
      .catch(() => {
        ctx.reply("No se pudo enlazar la cuenta, reingrese el comando");
      });
  } else {
    ctx.reply("Su usuario ya se encuentra enlazado con una cuenta.");
  }
});

bot.launch();
