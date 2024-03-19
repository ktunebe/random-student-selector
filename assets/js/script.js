// Array
var students = ['Veysel', 'Jake', 'Nick', 'Kent', 'Caleb', 'Parker', 'Tom', 'Meg', 'Larry', 'Ryan'];
// Variables
let calledOn = 0;
let studentList = [];

// Select button and DOM objects
const button = document.querySelector("#button");
const winner = document.querySelector("#winner");
const announcement = document.querySelector("#announcement");
// Made variable for drum gif img tag to insert on click
let drumRoll = '<img src="assets/images/drum_1f941.gif" alt="image description">';

// Function to create new student object
const Student = function(studentName, calledOn) {
    this.studentName = studentName;
    this.calledOn = calledOn;
}

// Create array of Student objects by looping through the array of student strings
function createStudentList()  {
    if (localStorage.length > 0) {
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



// Function to call random student, exlcuding ones who have been called and resetting count if all students have been called
function getRandomStudent() {
    // studentList = JSON.parse(localStorage.getItem("storedList"))
    const randomIndex = Math.floor( Math.random() * studentList.length );
    let randomStudent = studentList[randomIndex];
    const allCalled = studentList.every(obj => obj.calledOn > 0);
    function displayAnnouncement() {
        announcement.textContent = "ThE lucky student is: ";
        winner.textContent = `${randomStudent.studentName}`
    }
    if (allCalled) {
        studentList.forEach((randomStudent) => randomStudent.calledOn = 0);
        getRandomStudent(studentList);
    } else if (randomStudent.calledOn === 0) {
        winner.textContent = "";
        announcement.innerHTML = `${drumRoll}`;
        setTimeout(displayAnnouncement, 1800);
        randomStudent.calledOn++;
    } else if (randomStudent.calledOn > 0) {
        getRandomStudent(studentList);
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




