chrome.alarm.create("drinkTimer", {
  periodInMIns: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "drinkTimer") {
  }
});

chrome.storage.local.get([]);
