// creates a repeating alarm for drinkTimer
chrome.alarms.create("drinkTimer", {
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "drinkTimer") {
    // creates the res obj with timer and isRunning keys.
    chrome.storage.local.get(["timer", "isRunning"], (res) => {
      // if isRunning is present is true initialize timer var with res.timer + 1
      if (res.isRunning) {
        let timer = Number(res.timer) + 1;
        // updates timer by setting timer var.
        chrome.storage.local.set({
          timer,
        });
      }
    });
  }
});
// initialize default values to the timer and isRunning keys if they don't exist
chrome.storage.local.get(["timer", "isRunning"], (res) => {
  chrome.storage.local.set({
    timer: "timer" in res ? Number(res.timer) : 0,
    isRunning: "isRunning" in res ? res.isRunning : false,
  });
});
