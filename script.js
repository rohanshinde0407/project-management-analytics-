// Function to generate random color for chart datasets
function randomColor() {
    return '#' + Math.random().toString(16).substr(-6);
  }
  
  // Initialize Charts
  document.addEventListener("DOMContentLoaded", function () {
    // Monthly Leads Count Pie Chart
    var monthlyLeadsData = {
      labels: ["January", "February", "March", "April", "May"],
      datasets: [{
        data: [20, 15, 30, 25, 10], // Sample monthly leads count data
        backgroundColor: [
          randomColor(),
          randomColor(),
          randomColor(),
          randomColor(),
          randomColor()
        ]
      }]
    };
  
    var monthlyLeadsCtx = document.getElementById("monthlyLeadsChart").getContext("2d");
    var monthlyLeadsChart = new Chart(monthlyLeadsCtx, {
      type: 'pie',
      data: monthlyLeadsData
    });
  
    // Project Progress Bar Chart
    var projectProgressData = {
      labels: ["Project A", "Project B", "Project C", "Project D"],
      datasets: [{
        label: 'Progress',
        data: [75, 45, 90, 60], // Sample project progress data (in percentage)
        backgroundColor: [
          randomColor(),
          randomColor(),
          randomColor(),
          randomColor()
        ]
      }]
    };
  
    var projectProgressCtx = document.getElementById("projectProgressChart").getContext("2d");
    var projectProgressChart = new Chart(projectProgressCtx, {
      type: 'bar',
      data: projectProgressData,
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              max: 100
            }
          }]
        }
      }
    });
  
    // Leads Chart (Sample chart data)
    var leadsData = {
      labels: ["January", "February", "March", "April", "May"],
      datasets: [{
        label: "Leads",
        data: [10, 15, 20, 25, 30], // Sample leads count data
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1
      }]
    };
  
    var leadsCtx = document.getElementById("leadsChart").getContext("2d");
    var leadsChart = new Chart(leadsCtx, {
      type: 'line',
      data: leadsData,
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  });
  
//   --------------------------------------------------------------------------------------------


// -------------------------------------------------------------------------------------------------
// JavaScript for Speech Recognition and Response
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// Initialize speech recognition
let recognition = new SpeechRecognition();
recognition.lang = 'en-US';

// Reference to the mic status element
let micStatus = document.getElementById('micStatus');
let micAlert = document.getElementById('micAlert');

// Function to update mic status
function updateMicStatus(status) {
  micStatus.textContent = status;
}

// Start recognition
recognition.onstart = function() {
  console.log('Voice recognition activated. Speak your command.');
  updateMicStatus('Microphone is ON'); // Update mic status
  micAlert.style.display = 'block'; // Show mic alert
};

// Stop recognition
recognition.onend = function() {
  console.log('Voice recognition deactivated.');
  updateMicStatus('Microphone is OFF'); // Update mic status
  micAlert.style.display = 'none'; // Hide mic alert
};

// Process user's speech
recognition.onresult = function(event) {
  const transcript = event.results[0][0].transcript.toLowerCase();
  console.log('User said:', transcript);
  respondToQuestion(transcript);
};

// Function to respond to user's questions
function respondToQuestion(question) {
  let response = 'Sorry, I did not understand that.';
  const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  
  // Answer based on the user's question
  switch(question) {
    case 'total projects':
      response = 'There are 30 projects in total.';
      break;
    case 'active projects':
      response = 'There are 15 active projects.';
      break;
    case 'completed projects':
      response = 'There are 15 completed projects.';
      break;
    case 'tasks due today':
      response = `There are 8 tasks due on ${today}.`;
      break;
    case 'total leads':
      response = 'There are 50 total leads.';
      break;
    case 'new leads':
      response = 'There are 12 new leads.';
      break;
    case 'converted leads':
      response = 'There are 8 converted leads.';
      break;
    case 'task list':
      response = 'Here is the task list: Task 1 is in progress and due on May 15, Task 2 is completed and was due on May 20.';
      break;
  }
  
  // Speak the response in a female voice
  speak(response);
}

// Function to speak the response in a female voice
function speak(message) {
  let speech = new SpeechSynthesisUtterance();
  speech.lang = 'en-US';
  speech.text = message;
  speech.voiceURI = 'Google UK English Female';
  window.speechSynthesis.speak(speech);
}

// Start/stop recognition when the button is clicked
document.getElementById('toggleSpeechRecognition').addEventListener('click', function() {
  if (!recognizing) {
    recognition.start();
    recognizing = true;
    this.textContent = 'Stop Listening';
  } else {
    recognition.stop();
    recognizing = false;
    this.textContent = 'Start Listening';
  }
});

let recognizing = false;
