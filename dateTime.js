
document.addEventListener("DOMContentLoaded", function () {
    var currentTime = document.getElementById("current-time"),
        currentDate = document.getElementById("current-date");  

if(currentTime) {
    setInterval(function updateTime() {
        // get date (object)
        var d = new Date();

        var hours = d.getHours(),
            minutes = d.getMinutes(),
            month = formatMonth(d.getMonth()),
            date = d.getDate(),
            ampm = 'AM';

        // change 24 hour clock to standard time
        if (hours > 12) {
            hours -= 12;
            ampm = "PM";
        } else if (hours === 0) {
            hours = 12;
        }

        // put 0 in front of minutes that are less than 10
        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        // display hours and minutes using modulus operator %
        // 2 divided by 2 remainder 0 is even, 1 is odd
        // flashing every odd second 
        var sep = ":";
        if (d.getSeconds() % 2 === 1) sep = " ";
        currentTime.innerHTML = hours + sep + minutes + ' ' + ampm;
        currentDate.textContent = month + " " + date;
  
    }, 1000);
}

    // transform month into a number

    function formatMonth(m) {
        m = parseInt(m, 10); // this function parses a string and returns an integer

        if (m < 0) {
            m = 0;
        } else if (m > 11) {
            m = 11;
        }

        var monthNames = [
            "January", "February", "March", "April", "May", "June", "July", "August", "September",
            "October", "November", "December"];

        return monthNames[m];
    }


});
