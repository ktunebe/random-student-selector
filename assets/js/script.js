// Array
var students = ['Veysel', 'Jake', 'Nick', 'Kent', 'Caleb', 'Parker', 'Tom', 'Meg', 'Larry', 'Ryan'];
// Variables
let calledOn = 0;
let studentList = [];

// Select button and DOM objects
const button = document.querySelector("#button");
const winner = $('#winner');
const announcement = document.querySelector("#announcement");

// Set effect transition time if wanting to change all animations
let textTransitionTime = 600;

// Made variables for drum gif img tag and drum roll sound effect
let drumRoll = '<img src="assets/images/drum_1f941.gif" alt="image description">';
let drumSound = new Audio('assets/sounds/drum-roll.mp3');

// Function to create new student object
const Student = function(studentName, calledOn) {
    this.studentName = studentName;
    this.calledOn = calledOn;
}

// Create array of Student objects by looping through the array of student strings
function createStudentList()  {
    if (localStorage.getItem("storedList") !== null) {
        studentList = JSON.parse(localStorage.getItem("storedList"));
    } else {
        for (let i = 0; i < students.length; i++) {
            studentName = students[i];
            calledOn = 0;
            student = new Student(studentName, calledOn);
            studentList.push(student);
        }
    }
    return studentList;
}

// Reset announcement holder
function reset() {
    winner.text('');
    winner.animate({
        rotate: '0deg'
    }, 0);
}

//Function to pop winner text
function popText() {
    winner.animate ({
        fontSize: '10rem'
    }, textTransitionTime)
    winner.animate ({
        fontSize: '5rem'
    }, textTransitionTime)
}

//Function to swing winner text
function swingText() {
    winner.css('transform-origin', 'bottom left');
    winner.animate({
        rotate: '130deg',
    }, textTransitionTime)
    winner.animate({
        rotate: '60deg',
    }, textTransitionTime)
    winner.animate({
        rotate: '75deg',
    }, textTransitionTime)
}



// Function to call random student, exlcuding ones who have been called and resetting count if all students have been called
function getRandomStudent() {
    const randomIndex = Math.floor( Math.random() * studentList.length );
    let randomStudent = studentList[randomIndex];
    const allCalled = studentList.every(obj => obj.calledOn > 0);
    function displayAnnouncement() {
        announcement.textContent = "ThE lucky student is: ";
        winner.text(`${randomStudent.studentName}`);
    }
    if (allCalled) {
        studentList.forEach((randomStudent) => randomStudent.calledOn = 0);
        getRandomStudent();
    } else if (randomStudent.calledOn === 0) {
        reset();
        drumSound.play();
        announcement.innerHTML = `${drumRoll}`;
        setTimeout(displayAnnouncement, 1950);
        setTimeout(popText, 2000);
        setTimeout(swingText, (3200));
        randomStudent.calledOn++;
    } else if (randomStudent.calledOn > 0) {
        getRandomStudent();
    } 
    localStorage.setItem("storedList", JSON.stringify(studentList))
}

// Create the student list on load
createStudentList();
// Button click to run everything else
button.addEventListener('click', function () {
    getRandomStudent();
    console.log(studentList);
});



