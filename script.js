//created varibles
let saveBtn = $('.saveButton');
let deleteBtn = $('.deleteButton');
let savedTasks= [];

//created calendar 
$(document).ready(function () {
    let calendarDay = moment().format('MMMM Do YYYY, h:mm:ss a');

    $('#currentDay').text('Today is ' + calendarDay);
})

//created color coded time blocks
function currentHour () {
    let currentTime = moment().hour();
    let hour = $('.time-block');
    hour.each(function () {
       let thisHour = parseInt($(this).attr('id')) 
       if(thisHour === currentTime) {
           $(this).children('.col-9').attr('class', 'col-9').addClass('present');
       }
       else if (thisHour > currentTime) {
           $(this).children('.col-9').attr('class','col-9'.addClass('future'))
       }
       else {
           $(this).children('.col-9').attr('class','col-9').addClass('past')
       }
    });
}

//setup let saveButton = $('')
$(saveBtn).on('click', function (event) {
    event.preventDefault();
    let savedItems = $(this).siblings('.col-9').val();
    let time = $(this).siblings('.time-value').text();
    let timeObj = {
        hours: time,
        task: savedItems};
    console.log(savedItems);
    console.log(time);

    localStorage.setItem('saved-tasks', JSON.stringify(savedTasks))

    console.log(time);
    console.log(savedItems);
    console.log(timeObj);
    console.log(savedTasks);
    
    for (i = 0; i < savedTasks.length; i++) {
        retrievedData = JSON.parse(localStorage.getItem('saved-tasks'));
        savedItems.innerHTML = savedTasks[i].task;
    }
})
//setup let deleteButton = $('')
$(deleteBtn).on('click', function (event) {
    event.preventDefault();
    console.log(savedTasks);
    for (i = 0; i < savedTasks.length; i++) {
        localStorage.removeItem('saved-tasks');
        console.log(savedTasks[i].task)}
    $(this).siblings('.col-9').val('');
    console.log($(this).siblings());
})

$(window).on ('load', function () {
    console.log(JSON.parse(localStorage.getItem('saved-tasks')));
    let saved = JSON.parse(localStorage.getItem('saved-tasks'));
    console.log(saved);
    let taskField = $('.col-9');
    let dayHours = $('.time-value');
    if (saved) {
        for (i = 0; i < saved.length; i++) {
            savedTasks.push(saved);
            console.log(dayHours);
        if (dayHours[i].innerHTML === saved[i].hours){
            $(taskField[i]).text(saved[i].task);
        } else {
            $(taskField[i]).text();
        }

        }
    }
    currentHour();
});