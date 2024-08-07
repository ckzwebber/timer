document.addEventListener("DOMContentLoaded", () => {
    let timerHours = document.getElementById("timer-hours");
    let timerMinutes = document.getElementById("timer-minutes");
    let timerSeconds = document.getElementById("timer-seconds");
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
        input.min = "0";

        switch (element.id)
        {
            case "timer-hours":
                input.max = "150";
                break;
                case "timer-minutes":
                    input.max = "59";
                    break;
                    case "timer-seconds":
                        input.max = "59";
        }


        input.addEventListener("blur", () => {
            let inputInt = parseInt(input.value);
            if(inputInt > 99)
            {
                input.value = "99";
            }
            else if (inputInt < 0)
            {
                input.value = "0";
            }
            save(element, input, numberOfInput);
        })
    }

    function save(element, input, numberOfInput) {
        let newTimer = input.value.trim();

        console.log(element);
        if (newTimer !== isNaN && newTimer !== "")
        {
            if (element.id === "timer-hours")
            {
                element.textContent = `${newTimer}h`;
            }
            else if (element.id === "timer-minutes")
            {
                element.textContent = `${newTimer}m`;
            }
            else if (element.id === "timer-seconds")
            {
                element.textContent = `${newTimer}s`;
            }
            else
            {
                element.textContent = `${numberOfInput}`;
            }
        }

        editTimer(element);
    }
})


