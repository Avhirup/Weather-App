const currentDate = document.getElementById("date");
let weatherCondition = document.getElementById("weathercon");
const tempStatus = "Clouds";

// getting current Day using this function
const getCurrentDay = () => {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const d = new Date();
    let day = weekday[d.getDay()];
    return day;
}

// getting current Time using this function
const getCurrentTime = () => {
    var monthsArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var now = new Date();
    var monthNo = now.getMonth() + 1;
    var month = monthsArr[monthNo]
    var date = now.getDate();
    var year = now.getFullYear();

    if (date < 10) {
        date = "0" + date;
    }

    let hours = now.getHours();
    if (hours < 10) {
        hours = "0" + hours;
    }

    let mins = now.getMinutes();

    let period = "AM";
    if (hours > 11) {
        period = "PM";
        if (hours > 12) {
            hours -= 12;
        }
    }
    if (mins < 10) {
        mins = "0" + mins;
    }

    return `${date} - ${month} - ${year} | ${hours}:${mins} ${period}`;
};

function update() {
    currentDate.innerHTML = `${getCurrentDay()} | ${getCurrentTime()}`
}
setInterval(update, 1000);