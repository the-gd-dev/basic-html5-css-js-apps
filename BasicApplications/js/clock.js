/**
 * digital clock printer
 */
function digitalClock() {
  var $dateMonthYearDiv = document.getElementById("dateMonthYear");
  var $circles = document.querySelectorAll(".circle");
  var $hours = document.querySelector("#hour__box");
  var $minutes = document.querySelector("#min__box");
  var $seconds = document.querySelector("#seconds__box");
  $circles.forEach((c) => c.classList.toggle("hide"));
  const [day, month, monthDate, fullYear, fullTime, timeZoneValue, timezoneName] = new Date()
    .toString()
    .split(" ");
  const dateString = `${day}, ${monthDate} ${month} ${fullYear}`;
  $dateMonthYearDiv.innerHTML = dateString;
  const [hours, min, seconds] = fullTime.split(":");
  printTimeComponents($hours, hours);
  printTimeComponents($minutes, min);
  printTimeComponents($seconds, seconds);
}

function analogClock() {
  const [day, month, monthDate, fullYear, fullTime, timeZoneValue, timezoneName] = new Date()
    .toString()
    .split(" ");
  const [hours, min, seconds] = fullTime.split(":");
  const hoursInt = parseInt(hours);
  const minutesInt = parseInt(min);
  const secondsInt = parseInt(seconds);
  const [$hour, $minute, $second] = document.querySelectorAll(".needles_style");
  $hour.setAttribute("style", `transform: rotate(${90 + hoursInt * 30}deg);`);
  $minute.setAttribute("style", `transform: rotate(${90 + minutesInt * 15}deg);`);
  $second.setAttribute("style", `transform: rotate(${90 + secondsInt * 6}deg);`);
}
// set intervals to show time
setInterval(() => {
  digitalClock();
  analogClock();
}, 1000);
