var fishTimer;
var meatTimer;
var trophyTimer;
var monsterTimer;

function startFishTimer() {
    var startButton = document.getElementById("fishStartBtn");
    var timeLeftSpan = document.getElementById("fishTimeLeft");

    startButton.innerText = "RUNNING";
    startButton.classList.add("active");
    startButton.disabled = true;

    var fishEndTime = moment().add(45, "s");

    fishTimer = setInterval(() => {
        let distance = fishEndTime - moment();
        timeLeftSpan.innerText = Math.floor(distance / 1000);

        if (distance < 0) {
            clearInterval(fishTimer);
            timeLeftSpan.innerText = "DONE";
            startButton.innerText = "DONE";
            startButton.classList.remove("active");
            startButton.classList.add("done");
        }
    }, 1000);
}

function stopFishTimer() {
    var startButton = document.getElementById("fishStartBtn");
    var timeLeftSpan = document.getElementById("fishTimeLeft");

    startButton.innerText = "START";
    startButton.classList.remove("active", "done");
    startButton.disabled = false;
    timeLeftSpan.innerText = "";

    clearInterval(fishTimer);
}

function startMeatTimer() {
    var startButton = document.getElementById("meatStartBtn");
    var timeLeftSpan = document.getElementById("meatTimeLeft");

    startButton.innerText = "RUNNING";
    startButton.classList.add("active");
    startButton.disabled = true;

    var meatEndTime = moment().add(65, "s");

    meatTimer = setInterval(() => {
        let distance = meatEndTime - moment();
        timeLeftSpan.innerText = Math.floor(distance / 1000);

        if (distance < 0) {
            clearInterval(meatTimer);
            timeLeftSpan.innerText = "DONE";
            startButton.innerText = "DONE";
            startButton.classList.remove("active");
            startButton.classList.add("done");
        }
    }, 1000);
}

function stopMeatTimer() {
    var startButton = document.getElementById("meatStartBtn");
    var timeLeftSpan = document.getElementById("meatTimeLeft");

    startButton.innerText = "START";
    startButton.classList.remove("active", "done");
    startButton.disabled = false;
    timeLeftSpan.innerText = "";

    clearInterval(meatTimer);
}

function startTrophyTimer() {
    var startButton = document.getElementById("trophyStartBtn");
    var timeLeftSpan = document.getElementById("trophyTimeLeft");

    startButton.innerText = "RUNNING";
    startButton.classList.add("active");
    startButton.disabled = true;

    var trophyEndTime = moment().add(95, "s");

    trophyTimer = setInterval(() => {
        let distance = trophyEndTime - moment();
        timeLeftSpan.innerText = Math.floor(distance / 1000);

        if (distance < 0) {
            clearInterval(trophyTimer);
            timeLeftSpan.innerText = "DONE";
            startButton.innerText = "DONE";
            startButton.classList.remove("active");
            startButton.classList.add("done");
        }
    }, 1000);
}

function stopTrophyTimer() {
    var startButton = document.getElementById("trophyStartBtn");
    var timeLeftSpan = document.getElementById("trophyTimeLeft");

    startButton.innerText = "START";
    startButton.classList.remove("active", "done");
    startButton.disabled = false;
    timeLeftSpan.innerText = "";

    clearInterval(trophyTimer);
}

function startMonsterTimer() {
    var startButton = document.getElementById("monsterStartBtn");
    var timeLeftSpan = document.getElementById("monsterTimeLeft");

    startButton.innerText = "RUNNING";
    startButton.classList.add("active");
    startButton.disabled = true;

    var monsterEndTime = moment().add(120, "s");

    monsterTimer = setInterval(() => {
        let distance = monsterEndTime - moment();
        timeLeftSpan.innerText = Math.floor(distance / 1000);

        if (distance < 0) {
            clearInterval(monsterTimer);
            timeLeftSpan.innerText = "DONE";
            startButton.innerText = "DONE";
            startButton.classList.remove("active");
            startButton.classList.add("done");
        }
    }, 1000);
}

function stopMonsterTimer() {
    var startButton = document.getElementById("monsterStartBtn");
    var timeLeftSpan = document.getElementById("monsterTimeLeft");

    startButton.innerText = "START";
    startButton.classList.remove("active", "done");
    startButton.disabled = false;
    timeLeftSpan.innerText = "";

    clearInterval(monsterTimer);
}
