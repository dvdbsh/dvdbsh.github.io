Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function renderToday(){
	//Greet
	var currentTime = new Date();
	var h = currentTime.getHours();
	var greet;
		if (h >= 4 && h < 12)
			greet = "Good Morning ☀️";
		else if (h >= 12 && h < 17)
			greet = "Good Afternoon ☕️";
		else if (h >= 17 && h < 24)
			greet = "Good Evening 🌙";
		else
			greet = "Go to sleep.. 😴";
	document.getElementById("greeting").innerHTML = greet;
	//Today
	var myDate = new Date();
	var day = myDate.getDay();
	var month = myDate.getMonth();
	var date = myDate.getDate();

	const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	const days_sh = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	var tdate = "It's " + days[day] + ", " + months[month] + " " + date;
	document.getElementById("today").innerHTML = tdate;
	//x days from Today
	function addToday(x){
		var myDatex = myDate.addDays(x);
		var dayx = myDatex.getDay();
		var monthx = myDatex.getMonth();
		var datex = myDatex.getDate();
		var tdatex = days_sh[dayx] + ", " + months[monthx] + " " + datex;
		return tdatex;
	}
	document.getElementById("days2").innerHTML = addToday(2);
	document.getElementById("days3").innerHTML = addToday(3);
	document.getElementById("days5").innerHTML = addToday(5);
	document.getElementById("days7").innerHTML = addToday(7);
	document.getElementById("days14").innerHTML = addToday(14);
	document.getElementById("days30").innerHTML = addToday(30);
}
renderToday();