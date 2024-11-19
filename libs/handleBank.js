module.exports = function handleBank(mcbot, discordbot) {
    let i;
    mcbot.on("windowOpen", (window) => {
      if (window.title.includes("Bank")) {
        console.log("bank menu opened");
        i++;
        console.log(i);
        setTimeout(() => {
          mcbot.clickWindow(11, 0, 0, (err) => {
            console.log(err);
            setTimeout(() => {
              window.close(window.id);
              console.log("successfully sold items and deposited coins");
            }, 1000);
          });
        }, 2000);
      }
    });
  }