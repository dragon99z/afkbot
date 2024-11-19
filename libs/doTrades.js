const bzsell = require("./bzsell.js")

module.exports = function doTrades(mcbot, discordbot) {
    let windowid;
    mcbot.chat("/l");
    setTimeout(() => {
      mcbot.chat("/skyblock");
      setTimeout(() => {
        mcbot.chat("/hub");
        setTimeout(() => {
          console.log("opening trades menu");
          mcbot.chat("/trades");
          mcbot.on("windowOpen", (window) => {
            if (
              window.type === "minecraft:chest" &&
              window.title.includes("Trades")
            ) {
              windowid = window.id;
              console.log("---Trades menu opened successfully---");
              const sulfurItems = [{ name: "glowstone_dust" }, { name: "skull" }];
              let slots = [];
              window.items().forEach((item) => {
                sulfurItems.forEach((sulfurItem) => {
                  if (item.name === sulfurItem.name) {
                    slots.push(item.slot);
                  }
                });
              });
              if (slots.length === 0) {
                bzsell(mcbot, discordbot, windowid);
              } else {
                let slotIndex = 1;
                slots.forEach((slot) => {
                  let localSlotIndex = slotIndex;
                  setTimeout(() => {
                    mcbot.clickWindow(slot, 0, 0, (err) => {
                      if (err) {
                        console.log(err);
                      } else {
                        console.log("sulfur sold successfully");
                      }
                    });
                    if (localSlotIndex == slots.length) {
                      bzsell(mcbot, discordbot, windowid);
                    }
                  }, 1000 * slotIndex);
                  slotIndex++;
                });
              }
            }
          });
        }, 5000);
      }, 3000);
    }, 3000);
    return windowid;
  }