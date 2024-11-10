// URL to fetch to the JSON CRN exam-time pairs
const examsJsonUrl = "https://raw.githubusercontent.com/vincentdinic/FinalExamScheduleGenerator/refs/heads/main/CRNsAndExams.json";
// Initiallize the var to hold the JSON data
//
// Potentially problematic if user tries to search json
// before it is downloaded and parsed, for now we 
// assume that is impossible
var CRNsAndExams = '';
// Fetch the data and store it in the above variable
fetch(examsJsonUrl)
	.then((response) => response.json())
	.then((examTimes) => {
		CRNsAndExams= examTimes
	});

var courseCount = 0;

function init() {
	addCourseEntryBlock(courseCount);
}

function addCourseEntryBlock() {
	courseBlockIDNumber = courseCount;
	let allCourses = document.getElementById("allCourses");
	let courseContainerDiv = document.createElement("div");  // The div that wraps each CRN entry block
	courseContainerDiv.setAttribute("id", "course"+courseBlockIDNumber);

	let spacer = document.createElement("br");
	let CRNLabel = document.createElement("label");
	CRNLabel.setAttribute("for", "crn"+courseBlockIDNumber);
	CRNLabel.textContent = "CRN:";
	let CRNField = document.createElement("input");
	CRNField.setAttribute("type", "text");
	CRNField.setAttribute("id", "crn"+courseBlockIDNumber);
	
	let resultField = document.createElement("b");
	resultField.setAttribute("id", "examTime"+courseBlockIDNumber);

	// Add all these elements to the div
	courseContainerDiv.appendChild(spacer);
	courseContainerDiv.appendChild(CRNLabel);
	courseContainerDiv.appendChild(CRNField);
	courseContainerDiv.appendChild(resultField);

	// add this course block to allCourses
	allCourses.appendChild(courseContainerDiv);

	courseCount = courseBlockIDNumber+1;
}

function deleteCourseEntry() {
	if (courseCount != 1) {
		document.getElementById("course"+(courseCount-1)).remove();
		courseCount--;
	}
}

function generate() {
	for (var i = 0; i < courseCount; i++) {
		// takes in CRN from text box,
		let CRN = document.getElementById("crn"+i).value;
		display(CRNsAndExams[CRN], i);					
	}
}

function display(examDateTime, courseNumber) {
	let textElement = document.getElementById("examTime"+courseNumber);
	if (examDateTime == undefined) {					// Only try to display the 
		textElement.textContent = "Course not found";	// course if it exists
	} else {
		textElement.textContent = examDateTime[0] + "'s exam is at " + examDateTime[1];
	}
}
