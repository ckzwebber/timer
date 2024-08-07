let timerHours = document.getElementById("timer-hours");
let timerMinutes = document.getElementById("timer-minutes");
let timerSeconds = document.getElementById("timer-seconds");
let startButton = document.getElementById("start-button");
let resetButton = document.getElementById("reset-button");
let hours = 0;
let minutes = 0;
let seconds = 0;
let timer;
let timers = [timerHours, timerMinutes, timerSeconds];

editTimer();

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
        let inputInt = parseInt(input.value);
        switch (element.id) {

            case "timer-hours":
                inputInt > 99 ? input.value = "99" : input.value;
                inputInt < 0 ? input.value = "00" : input.value;
                element.textContent = `${input.value}h`;
                hours = parseInt(input.value);
                break;

            case "timer-minutes":
                inputInt > 59 ? input.value = "59" : input.value;
                inputInt < 0 ? input.value = "00" : input.value;
                element.textContent = `${input.value}m`;
                minutes = parseInt(input.value);
                break;

            case "timer-seconds":
                inputInt > 59 ? input.value = "59" : input.value;
                inputInt < 0 ? input.value = "00" : input.value;
                element.textContent = `${input.value}s`;
                seconds = parseInt(input.value);
                break;
        }
        editTimer(element);
    })
}

startButton.addEventListener("click", () => start(hours, minutes, seconds));
resetButton.addEventListener("click", reset);


function start(hours, minutes, seconds) {
    console.log("Depois do start: " + hours, minutes, seconds);
    // stop();
    // timer = setInterval(() => {
    //     startingTimer();
    // }, 1000);
}

function startingTimer() {

}

function stop() {
    clearInterval(timer);
}

function reset() {
    hours = 0;
    minutes = 0;
    seconds = 0;
    timers.forEach(element => {
        if (element.id === "timer-hours") {

            element.textContent = "00h";

        } else if (element.id === "timer-minutes") {

            element.textContent = "00m";

        } else if (element.id === "timer-seconds") {

            element.textContent = "00s";
        }
    })
}
