// creates a repeating alarm for drinkTimer
chrome.alarm.create("drinkTimer", {
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "drinkTimer") {
    console.log("alarm rang");
  }
});

chrome.storage.local.get([]);
