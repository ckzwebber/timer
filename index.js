let timerHours = document.getElementById("timer-hours");
let timerMinutes = document.getElementById("timer-minutes");
let timerSeconds = document.getElementById("timer-seconds");
let startButton = document.getElementById("start-button");
let resetButton = document.getElementById("reset-button");
let pauseButton = document.getElementById("pause-button");
let hours = 0;
let minutes = 0;
let seconds = 0;
let timer;
let paused = false;
let timers = [timerHours, timerMinutes, timerSeconds];

editTimer();
disableSecondaryButtons();
pauseButton.addEventListener("click", pause)
resetButton.addEventListener("click", reset);

function editTimer() {
    timers.forEach(element => {
        element.addEventListener("click", handleClick)
    })
}

function handleClick(event) {
    editingTimer(event.target);
}

function editingTimer(element) {
    element.removeEventListener("click", handleClick);
    let numberOfInput = element.textContent.slice(0, -1);
    let input = document.createElement("input");

    element.textContent = "";
    element.appendChild(input);
    input.focus();
    input.type = "number";
    input.value = numberOfInput;
    input.className = "timer-input";

    input.addEventListener("blur", () => {
        let inputInt = parseInt(input.value.padStart(2, "0"));
        inputInt > 0 ? element.classList.add("timer-edited") : input.value;
        parseInt(input.value.padStart(2, "0"));
        input.value = input.value.replace(/^0+(?!$)/, '');
        switch (element.id) {

            case "timer-hours":
                inputInt > 99 ? input.value = "99" : input.value;
                inputInt < 0 ? input.value = "00" : input.value;
                element.textContent = `${input.value.padStart(2, "0")}h`;
                hours = parseInt(input.value);
                break;

            case "timer-minutes":
                inputInt > 59 ? input.value = "59" : input.value;
                inputInt < 0 ? input.value = "00" : input.value;
                element.textContent = `${input.value.padStart(2, "0")}m`;
                minutes = parseInt(input.value);
                break;

            case "timer-seconds":
                inputInt > 59 ? input.value = "59" : input.value;
                inputInt < 0 ? input.value = "00" : input.value;
                element.textContent = `${input.value.padStart(2, "0")}s`;
                seconds = parseInt(input.value);
                break;
        }

        editTimer(element);
        callStartButton(element);
    })
}

function callStartButton(element) {
    startButton.addEventListener("click", () => start(element));
}

function start(element) {
    stop();
    enableSecondaryButtons();
    startingTimer(element);
}

function startingTimer() {
    pauseButton.disabled = false;
    pauseButton.classList.remove("pause-disable");
    timer = setInterval(() => {
        if (paused === false) {
            if (seconds === 0) {
                if (minutes === 0) {
                    if (hours === 0) {
                        clearInterval(timer);
                    } else {
                        hours--;
                        minutes = 59;
                        seconds = 59;
                    }
                } else {
                    minutes--;
                    seconds = 59;
                }
            } else {
                seconds--;
                seconds === 0 ? disableSecondaryButtons() : null;
            }
            timerHours.textContent = `${String(hours).padStart(2, "0")}h`;
            timerMinutes.textContent = `${String(minutes).padStart(2, "0")}m`;
            timerSeconds.textContent = `${String(seconds).padStart(2, "0")}s`;

            addOrRemoveActiveColor(timerHours)
            addOrRemoveActiveColor(timerMinutes)
            addOrRemoveActiveColor(timerSeconds)
        }
    }, 1000);

}

function addOrRemoveActiveColor(element) {
    parseInt(element.textContent) > 0 ? element.classList.add("timer-edited") : element.classList.remove("timer-edited");
}

function stop() {
    clearInterval(timer);
}

function pause() {
    paused = !paused;
    if (paused === true) {
        pauseButton.textContent = "Resume";
        timers.forEach(element => {
            element.classList.add("timer-paused");
        })

    } else {
        pauseButton.textContent = "Pause";
        timers.forEach(element => {
            element.classList.remove("timer-paused");
        })
    }
}

function disableSecondaryButtons() {
    pauseButton.classList.add("disable-button");
    resetButton.classList.add("disable-button");
    startButton.classList.remove("disable-button");
    pauseButton.disabled = true;
    resetButton.disabled = true;
    startButton.disabled = false;
}

function enableSecondaryButtons() {
    pauseButton.classList.remove("disable-button");
    resetButton.classList.remove("disable-button");
    startButton.classList.add("disable-button");
    pauseButton.disabled = false;
    resetButton.disabled = false;
    startButton.disabled = true;
}

function reset() {
    stop();
    disableSecondaryButtons();
    hours = 0;
    minutes = 0;
    seconds = 0;
    timers.forEach(element => {
        element.classList.remove("timer-edited");
        switch (element.id) {

            case "timer-hours":
                element.textContent = "00h";
                break;

            case "timer-minutes":
                element.textContent = "00m";
                break;

            case "timer-seconds":
                element.textContent = "00s";
                break;
        }
    })
}
