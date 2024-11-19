const confirmsell = require("./confirmsell.js")

module.exports = function bzsell(mcbot, discordbot,windowid) {
    setTimeout(() => {
      mcbot.closeWindow(windowid);
      console.log("window closed");
  
      setTimeout(() => {
        mcbot.chat("/bz");
        mcbot.on("windowOpen", (window) => {
          if (window.title.includes("Bazaar")) {
            windowid = window.id;
            console.log("---Bazaar menu opened successfully---");
            confirmsell(mcbot, discordbot);
            mcbot.clickWindow(48, 0, 0, (err) => {
              if (err) {
                console.log(err);
              } else {
                console.log("opened sell sacks menu");
              }
            });
          }
        });
      }, 1000);
    }, 100);
    return windowid;
  }