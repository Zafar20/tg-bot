const TelegramApi = require("node-telegram-bot-api");
const {gameOptions, gameOptions} = require('./options')
const token = "2093590689:AAF2GBqKUYCSVIS5eYIbvEeAoHcik7lJ31M";

const bot = new TelegramApi(token, { polling: true });


const  chats = {}


const startGame = async  (chatId) => {
    await bot.sendMessage(chatId, `Сейчас я загадаю цифру от 0 до 9, а ты должен ее угадать`);
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Отгадайте', gameOptions)
}

const start = () => {

  // Добавляем свои команды

  bot.setMyCommands([
    { command: "/start", description: "Начальное привествие" },
    { command: "/info", description: "Получить информацию о пользователе" },
    { command: "/game", description: "Игра угадай цифру" },
  ]);

  // Добавляем событие

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    if (text === "/start") {
        await bot.sendMessage(chatId,"https://tgram.ru/wiki/stickers/img/norivk/png/10.png");
        return bot.sendMessage(chatId, `Добро пожаловать в телеграм бот Зафара`);
    }
    if (text === "/info") {
        return bot.sendMessage(chatId, `Тебя зовут  ${msg.from.first_name}`);
    }
    if(text === '/game') {
      return  startGame(chatId)
    }
    return bot.sendMessage(chatId, 'Я вас не понимаю, попробуйте еще раз!')
  });


  bot.on('callback_query', msg => {
      const data = msg.data
      const chatId = msg.message.chat.id
      if(data === '/again') {
       return  startGame(chatId)
      }
      if(data === chats[chatId]) {
        return  bot.sendMessage(chatId,`Поздравляю ты отгадал цифру ${chats[chatId]}`,againOptions)
      }else {
        return  bot.sendMessage(chatId,`К сожалению ты не угадал,бот загадал цифру ${chats[chatId]}`,againOptions)
      }
  })

};
start();
