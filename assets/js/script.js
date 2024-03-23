// Array
var students = ['Veysel', 'Jake', 'Nick', 'Kent', 'Caleb', 'Parker', 'Tom', 'Meg', 'Larry', 'Ryan'];
// Variables
let calledOn = 0;
let studentList = [];

// Select button and DOM objects
const button = document.querySelector("#button");
const winner = document.querySelector("#winner");
const announcement = document.querySelector("#announcement");

// Set effect transition time if wanting to change all animations
let textTransitionTime = 600;
winner.style.transition = `all ${textTransitionTime}ms ease-in-out`;

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

//Function to pop winner text
function popText() {
    winner.style.fontSize = "10rem";
    setTimeout(function() {
        winner.style.fontSize = "5rem";
    }, textTransitionTime)
}

//Function to swing winner text
function swingText() {
    winner.style.transformOrigin = "bottom left";
    winner.style.transform = "rotate(130deg)";
    setTimeout(function() {
        winner.style.transform = "rotate(60deg)";
    }, textTransitionTime)
    setTimeout(function() {
        winner.style.transform = "rotate(75deg)";
    }, (textTransitionTime * 2))
}



// Function to call random student, exlcuding ones who have been called and resetting count if all students have been called
function getRandomStudent() {
    const randomIndex = Math.floor( Math.random() * studentList.length );
    let randomStudent = studentList[randomIndex];
    const allCalled = studentList.every(obj => obj.calledOn > 0);
    function displayAnnouncement() {
        announcement.textContent = "ThE lucky student is: ";
        winner.textContent = `${randomStudent.studentName}`
    }
    if (allCalled) {
        studentList.forEach((randomStudent) => randomStudent.calledOn = 0);
        getRandomStudent();
    } else if (randomStudent.calledOn === 0) {
        winner.textContent = "";
        winner.style.transform = "rotate(0deg)";
        drumSound.play();
        announcement.innerHTML = `${drumRoll}`;
        setTimeout(displayAnnouncement, 1950);
        setTimeout(popText, 2000);
        setTimeout(swingText,3200);
        randomStudent.calledOn++;
    } else if (randomStudent.calledOn > 0) {
        getRandomStudent();
    } 
    localStorage.setItem("storedList", JSON.stringify(studentList))
}

// Create the student list on load
createStudentList();
// Button click to run everything else
button.addEventListener('click', function e() {
    getRandomStudent();
    console.log(studentList);
});




