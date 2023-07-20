var fishTimer;
var meatTimer;
var trophyTimer;
var monsterTimer;

function startFishTimer() {
    var startButton = document.getElementById("fishStartBtn");
    var timeLeftSpan = document.getElementById("fishTimeLeft");

    var fishEndTime = moment().add(45, "s");
    updateFishTimer();

    fishTimer = setInterval(updateFishTimer, 1000);

    function updateFishTimer() {
        let distance = fishEndTime - moment();
        var secondsLeft = Math.floor(distance / 1000);

        if (secondsLeft <= 0) {
            clearInterval(fishTimer);
            timeLeftSpan.innerText = "DONE";
            startButton.innerText = "START";
            startButton.classList.remove("active", "done");
        } else {
            timeLeftSpan.innerText = secondsLeft;
            startButton.innerText = "STOP";
            startButton.classList.add("active");
        }
    }
}

function stopFishTimer() {
    var startButton = document.getElementById("fishStartBtn");
    var timeLeftSpan = document.getElementById("fishTimeLeft");

    if (fishTimer) {
        clearInterval(fishTimer);
        startButton.innerText = "START";
        startButton.classList.remove("active", "done");
        timeLeftSpan.innerText = "";
    }
}

function startMeatTimer() {
    var startButton = document.getElementById("meatStartBtn");
    var timeLeftSpan = document.getElementById("meatTimeLeft");

    var meatEndTime = moment().add(65, "s");
    updateMeatTimer();

    meatTimer = setInterval(updateMeatTimer, 1000);

    function updateMeatTimer() {
        let distance = meatEndTime - moment();
        var secondsLeft = Math.floor(distance / 1000);

        if (secondsLeft <= 0) {
            clearInterval(meatTimer);
            timeLeftSpan.innerText = "DONE";
            startButton.innerText = "START";
            startButton.classList.remove("active", "done");
        } else {
            timeLeftSpan.innerText = secondsLeft;
            startButton.innerText = "STOP";
            startButton.classList.add("active");
        }
    }
}

function stopMeatTimer() {
    var startButton = document.getElementById("meatStartBtn");
    var timeLeftSpan = document.getElementById("meatTimeLeft");

    if (meatTimer) {
        clearInterval(meatTimer);
        startButton.innerText = "START";
        startButton.classList.remove("active", "done");
        timeLeftSpan.innerText = "";
    }
}

function startTrophyTimer() {
    var startButton = document.getElementById("trophyStartBtn");
    var timeLeftSpan = document.getElementById("trophyTimeLeft");

    var trophyEndTime = moment().add(95, "s");
    updateTrophyTimer();

    trophyTimer = setInterval(updateTrophyTimer, 1000);

    function updateTrophyTimer() {
        let distance = trophyEndTime - moment();
        var secondsLeft = Math.floor(distance / 1000);

        if (secondsLeft <= 0) {
            clearInterval(trophyTimer);
            timeLeftSpan.innerText = "DONE";
            startButton.innerText = "START";
            startButton.classList.remove("active", "done");
        } else {
            timeLeftSpan.innerText = secondsLeft;
            startButton.innerText = "STOP";
            startButton.classList.add("active");
        }
    }
}

function stopTrophyTimer() {
    var startButton = document.getElementById("trophyStartBtn");
    var timeLeftSpan = document.getElementById("trophyTimeLeft");

    if (trophyTimer) {
        clearInterval(trophyTimer);
        startButton.innerText = "START";
        startButton.classList.remove("active", "done");
        timeLeftSpan.innerText = "";
    }
}

function startMonsterTimer() {
    var startButton = document.getElementById("monsterStartBtn");
    var timeLeftSpan = document.getElementById("monsterTimeLeft");

    var monsterEndTime = moment().add(120, "s");
    updateMonsterTimer();

    monsterTimer = setInterval(updateMonsterTimer, 1000);

    function updateMonsterTimer() {
        let distance = monsterEndTime - moment();
        var secondsLeft = Math.floor(distance / 1000);

        if (secondsLeft <= 0) {
            clearInterval(monsterTimer);
            timeLeftSpan.innerText = "DONE";
            startButton.innerText = "START";
            startButton.classList.remove("active", "done");
        } else {
            timeLeftSpan.innerText = secondsLeft;
            startButton.innerText = "STOP";
            startButton.classList.add("active");
        }
    }
}

function stopMonsterTimer() {
    var startButton = document.getElementById("monsterStartBtn");
    var timeLeftSpan = document.getElementById("monsterTimeLeft");

    if (monsterTimer) {
        clearInterval(monsterTimer);
        startButton.innerText = "START";
        startButton.classList.remove("active", "done");
        timeLeftSpan.innerText = "";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("fishStartBtn").addEventListener("click", function () {
        if (fishTimer) {
            stopFishTimer();
        } else {
            startFishTimer();
        }
    });

    document.getElementById("meatStartBtn").addEventListener("click", function () {
        if (meatTimer) {
            stopMeatTimer();
        } else {
            startMeatTimer();
        }
    });

    document.getElementById("trophyStartBtn").addEventListener("click", function () {
        if (trophyTimer) {
            stopTrophyTimer();
        } else {
            startTrophyTimer();
        }
    });

    document.getElementById("monsterStartBtn").addEventListener("click", function () {
        if (monsterTimer) {
            stopMonsterTimer();
        } else {
            startMonsterTimer();
        }
    });
});
