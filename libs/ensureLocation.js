module.exports = function ensureLocation(mcbot, discordbot, message, selling) {
    if (selling === false) {
      var location = JSON.parse(message);
      console.log(location);
      if (location.gametype == "SKYBLOCK" && location.map == "Private Island") {
        return;
      } else if (
        location.gametype == "SKYBLOCK" &&
        location.map != "Private Island" &&
        selling == false
      ) {
        setTimeout(() => {
          if (!selling) {
            mcbot.chat("/is");
          }
          mcbot.setQuickBarSlot("0");
        }, 3000);
      } else if (location.server == "limbo" && selling == false) {
        setTimeout(() => {
          mcbot.chat("/l ptl");
          setTimeout(() => {
            mcbot.chat("/skyblock");
            setTimeout(() => {
              if (!selling) {
                mcbot.chat("/is");
              }
              mcbot.setQuickBarSlot("0");
            }, 10000);
          }, 10000);
        }, 3000);
      } else if (location.gametype != "SKYBLOCK" && selling == false) {
        setTimeout(() => {
          mcbot.chat("/skyblock");
          setTimeout(() => {
            if (!selling) {
              mcbot.chat("/is");
            }
            mcbot.setQuickBarSlot("0");
          }, 10000);
        }, 3000);
      }
    }
    return selling;
  }