// creates a repeating alarm for drinkTimer
chrome.alarms.create("drinkTimer", {
  periodInMinutes: 1 / 60,
});

// notification for drink timer
const createNotification = function () {
  chrome.notifications.create({
    type: "basic",
    title: "Timer Notification",
    message: "Your timer has completed!",
    iconUrl: "./images/bottle.png",
  });
};

// notification for reaching drink goal
const drinkFinish = function () {
  chrome.notifications.create({
    type: "basic",
    title: "You are fully HYDRATED!",
    message: "You have reached your goal.",
    iconUrl: "./images/bottle.png",
  });
};

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "drinkTimer") {
    // creates the res obj with timer and isRunning keys.
    chrome.storage.local.get(
      // Added drinkNum to allow background service to track user's drink num
      ["timer", "isRunning", "minute", "drinkNum"],
      (res) => {
        // start timer condition
        if (res.isRunning) {
          let timer = Number(res.timer) + 1;
          let minute = Number(res.minute);
          let drinkNum = Number(res.drinkNum);
          // Finish timer condition
          if (timer === minute * 60) {
            createNotification();
            chrome.storage.local.set({
              isRunning: false,
              timer: 0,
              drinkNum: drinkNum++,
            });
            // drink goal condition
            if (drinkNum === 7) {
              drinkFinish();
            }
          }
          // updates timer.
          chrome.storage.local.set({
            timer,
            minute,
            drinkNum,
          });
        }
      }
    );
  }
});
// initialize default values to the timer and isRunning keys if they don't exist
chrome.storage.local.get(
  ["timer", "isRunning", "minute", "drinkNum"],
  (res) => {
    chrome.storage.local.set({
      timer: "timer" in res ? Number(res.timer) : 0,
      isRunning: "isRunning" in res ? res.isRunning : false,
      minute: "minute" in res ? Number(res.minute) : 0,
      drinkNum: "drinkNum" in res ? Number(res.drinkNum) : 0,
    });
  }
);
