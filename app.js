const Discord = require("discord.js");
const client = new Discord.Client();
const { prefix } = require("./config.json");

const CronJob = require("cron").CronJob;

require("dotenv").config();

client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", (message) => {
  if (message.content === `${prefix}server`) {
    message.channel.send(`This Server's name is: ${message.guild.name}`);
  }
});

client.on("message", (message) => {
  const guild = client.guilds.cache.find(
    (guild) => guild.id === "743535094526115931"
  );
  if (message.content === `${prefix}info`) {
    message.reply(`guild is: ${guild}`);
  }
});

var job = new CronJob(
  "* 15 17 * * 1",
  function() {
    const guild = client.guilds.cache.find(
      (guild) => guild.id === "348469556328792064"
    );
    const toKick = guild.members.cache.find(
      (member) => member.displayName === "FuckDis_"
    );
    const channel = guild.channels.cache.find(
      (chan) => chan.id === "348469556328792065"
    );
    if (toKick) {
      toKick
        .kick("Testing the kick")
        .then((kicked) => {
          channel.send(`kicked ${kicked.displayName} for inactivity`);
          console.log(`Managed to kick ${kicked.displayName} from the server`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  null,
  true,
  "Europe/London"
);
job.start();

client.login(process.env.DISCORD_TOKEN);
