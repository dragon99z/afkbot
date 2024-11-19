module.exports = function confirmsell(mcbot, discordbot) {
    let windowid;
    mcbot.on("windowOpen", (window) => {
      if (window.title.includes("sure?")) {
        windowid = window.id;
        console.log("confirm sell menu opened");
        setTimeout(() => {
          mcbot.clickWindow(11, 0, 0, (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("sell confirmed");
            }
          });
        }, 500);
        // console.log(window);
      }
    });
    return windowid;
  }