var stopwatch = {
  swInterval: "",
  value: "",
  timerValue: {
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  },
  laps: [
    // {
    //     _id : '',
    //     lapTime : ''
    // }
  ],
  $startBtn: document.getElementById("sw_start_btn"),
  $stopBtn: document.getElementById("sw_stop_btn"),
  $resetBtn: document.getElementById("sw_reset_btn"),
  $lapBtn: document.getElementById("sw_lap_btn"),
  $hoursInput: document.getElementById("sw_hours"),
  $minutesInput: document.getElementById("sw_minutes"),
  $secondsInput: document.getElementById("sw_seconds"),
  $tableBody: document.getElementById("sw-laps-table-body"),
};
function enableDisableButtons() {
  var stopWatchTimerValid =
    JSON.stringify(stopwatch.timerValue) !==
    JSON.stringify({ hours: 0, minutes: 0, seconds: 0 });
  // stopWatchTimerValid
  //   ? stopwatch.$startBtn.removeAttribute("disabled")
  //   : stopwatch.$startBtn.setAttribute("disabled", true);
  // stopwatch.value && stopwatch.value !== "00:00:00"
  //   ? stopwatch.$stopBtn.removeAttribute("disabled")
  //   : stopwatch.$stopBtn.setAttribute("disabled", true);
  // stopwatch.value && stopwatch.value !== "00:00:00"
  //   ? stopwatch.$lapBtn.removeAttribute("disabled")
  //   : stopwatch.$lapBtn.setAttribute("disabled", true);
  // stopwatch.value && stopwatch.value !== "00:00:00"
  //   ? stopwatch.$reset.removeAttribute("disabled")
  //   : stopwatch.$resetBtn.setAttribute("disabled", true);
}
enableDisableButtons();
function padNum(v) {
  return v < 10 ? "0" + v : v.toString();
}
function onChangeTimerInput() {
  if (!stopwatch.$hoursInput.value) {
    stopwatch.$hoursInput.value = "00";
  } else {
    stopwatch.$hoursInput.value = padNum(stopwatch.$hoursInput.value);
  }
  if (!stopwatch.$minutesInput.value) {
    stopwatch.$minutesInput.value = "00";
  } else {
    stopwatch.$minutesInput.value = padNum(stopwatch.$minutesInput.value);
    stopwatch.timerValue.seconds = 60;
  }
  if (!stopwatch.$secondsInput.value) {
    stopwatch.$secondsInput.value = "00";
  } else {
    stopwatch.$secondsInput.value = padNum(stopwatch.$secondsInput.value);
  }
}

function validateInput(elem) {
  let elemId = elem.getAttribute("id");
  let value = elem.value || "";
  elem.value = value.substr(0, 2);
  if (elemId === "sw_hours" && elem.value) {
    stopwatch.timerValue.hours = elem.value ? parseInt(elem.value) : 0;
    stopwatch.timerValue.minutes = 60;
    stopwatch.timerValue.seconds = 60;
  } else if (elemId === "sw_minutes" && elem.value) {
    stopwatch.timerValue.minutes = elem.value ? parseInt(elem.value) : 0;
    stopwatch.timerValue.seconds = 60;
  } else if (elemId === "sw_seconds" && elem.value) {
    stopwatch.timerValue.seconds = elem.value ? parseInt(elem.value) : 0;
    milliseconds = 100;
  }
  enableDisableButtons();
}
function toggleCircles() {
  var $circles = document.querySelectorAll(".circle");
  $circles.forEach((c) => c.classList.toggle("hide"));
}
function startStopWatchFn() {

  stopwatch.timerValue.milliseconds++;
  if (stopwatch.timerValue.milliseconds == 100) {
    stopwatch.timerValue.seconds++;
    stopwatch.timerValue.milliseconds = 0;
  }
  if (stopwatch.timerValue.seconds == 60) {
    stopwatch.timerValue.minutes++;
    stopwatch.timerValue.seconds = 0;
  }
  if (stopwatch.timerValue.minutes == 60) {
    stopwatch.timerValue.hours++;
    stopwatch.timerValue.minutes = 0;
  }
  // if (stopwatch.timerValue.hours > 0 && stopwatch.timerValue.minutes == 0) {
  //   stopwatch.timerValue.minutes = 60;
  // }

  // if (
  //   stopwatch.timerValue.hours > 0 &&
  //   stopwatch.timerValue.minutes > 0 &&
  //   stopwatch.timerValue.seconds == 0
  // ) {
  //   stopwatch.timerValue.seconds = 60;
  // }

  // if (
  //   stopwatch.timerValue.hours > 0 &&
  //   stopwatch.timerValue.minutes > 0 &&
  //   stopwatch.timerValue.seconds > 0 &&
  //   milliseconds == 0
  // ) {
  //   milliseconds = 100;
  // }

  // //decreament milliseconds
  // milliseconds -= 1;

  // //decreament seconds
  // if (milliseconds === 0 && stopwatch.timerValue.seconds > 0) {
  //   stopwatch.timerValue.seconds -= 1;
  // }

  // //decreament minutes
  // if (
  //   stopwatch.timerValue.minutes > 0 &&
  //   stopwatch.timerValue.seconds === 0 &&
  //   milliseconds == 0
  // ) {
  //   stopwatch.timerValue.minutes -= 1;
  // }

  // //decreament hours
  // if (
  //   milliseconds == 0 &&
  //   stopwatch.timerValue.seconds === 0 &&
  //   stopwatch.timerValue.minutes === 0 &&
  //   stopwatch.timerValue.hours > 0
  // ) {
  //   stopwatch.timerValue.hours -= 1;
  // }
  // // if(stopwatch.timerValue.seconds === 59){
  // //   stopwatch.timerValue.minutes -= 1;
  // //   stopwatch.timerValue.hours -= 1;
  // // }
 swBoxPrintTime();
}
function swBoxPrintTime(){
  var $hours = document.getElementById("hour__box");
  var $minutes = document.getElementById("min__box");
  var $seconds = document.getElementById("seconds__box");
  var $milliseconds = document.getElementById("milliseconds__box");
  printTimeComponents($milliseconds, padNum(stopwatch.timerValue.milliseconds));
  printTimeComponents($seconds, padNum(stopwatch.timerValue.seconds));
  printTimeComponents($minutes, padNum(stopwatch.timerValue.minutes));
  printTimeComponents($hours, padNum(stopwatch.timerValue.hours));
}
var stopwatchRunning, toggleCirclesSI;
function startSw() {
  if (!toggleCirclesSI && !stopwatchRunning) {
    toggleCirclesSI = setInterval(toggleCircles, 1000);
    stopwatchRunning = setInterval(startStopWatchFn, 10);
  }
}
function stopSw() {
  clearInterval(toggleCirclesSI);
  clearInterval(stopwatchRunning);
  stopwatchRunning = toggleCirclesSI = undefined;
}
function resetSw() {
  stopwatch.timerValue.hours  = 0;
  stopwatch.timerValue.minutes  = 0;
  stopwatch.timerValue.seconds  = 0;
  stopwatch.timerValue.milliseconds  = 0;
  stopwatch.$tableBody.innerHTML = ''
  stopSw();
  swBoxPrintTime();
}
function lapSw(e) {
  var stopWatchTimerValid =
    JSON.stringify(stopwatch.timerValue) !==
    JSON.stringify({ hours: 0, minutes: 0, seconds: 0 });
  if (stopWatchTimerValid) {
    stopwatch.laps.push({
      _id: "sw_" + (stopwatch.laps.length + 1),
      lap: { ...stopwatch.timerValue },
    });
    console.log(stopwatch.laps);
    stopwatch.$tableBody.innerHTML = "";
    stopwatch.laps.map((i) => {
      stopwatch.$tableBody.innerHTML += `
        <tr>
          <td>${i._id}</td>
          <td>${i.lap.hours}</td>
          <td>${i.lap.minutes}</td>
          <td>${i.lap.seconds}</td>
          <td>${i.lap.milliseconds}</td>
        </tr> 
      `;
    });
  }
}
