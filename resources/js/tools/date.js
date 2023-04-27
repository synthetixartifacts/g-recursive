// Date

function formatDate(date) {
    const monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM';

    const formattedHour = hour % 12 || 12;
    const formattedMinute = minute < 10 ? '0' + minute : minute;

    return monthNames[monthIndex] + ' ' + day + ', ' + year + ', ' + formattedHour + ':' + formattedMinute + ' ' + ampm;
}

function getDateNow() {
    return formatDate(new Date());
}

window.getDateNow = getDateNow;