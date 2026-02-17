let collegesData = [];

fetch("Colleges.json")
  .then(response => response.json())
  .then(data => {
    collegesData = data.colleges;
  })
  .catch(error => console.log(error));


// ===== FIND COLLEGE FUNCTION =====
function findCollegeByName(userText, colleges) {
  userText = userText.toLowerCase();

  return colleges.find(college =>
    userText.includes(college.name.toLowerCase()) ||
    userText.includes(college.name.toLowerCase().split(" ")[0])
  );
}


// ===== SEND MESSAGE =====
function sendMessage() {

  const input = document.getElementById("userInput");
  const userMessage = input.value.trim();

  if (userMessage === "") return;

  addMessage(userMessage, "user");
  input.value = "";

  const msg = userMessage.toLowerCase();

  let reply =
    "Sorry, I couldn't understand. Ask about fees, hostel, location or courses.";

  const college = findCollegeByName(msg, collegesData);

  if (college) {

    // ALL FEES
    if (
      msg.includes("fees") &&
      !msg.includes("kcet") &&
      !msg.includes("comedk") &&
      !msg.includes("management")
    ) {
      reply = `
<b>${college.name}</b><br>
KCET Fees: ₹${college.fees.KCET}<br>
COMEDK Fees: ₹${college.fees.COMEDK}<br>
Management Fees: ₹${college.fees.Management}
      `;
    }

    // KCET
    else if (msg.includes("kcet")) {
      reply = `${college.name} KCET fees is ₹${college.fees.KCET}.`;
    }

    // COMEDK
    else if (msg.includes("comedk")) {
      reply = `${college.name} COMEDK fees is ₹${college.fees.COMEDK}.`;
    }

    // MANAGEMENT
    else if (msg.includes("management")) {
      reply = `${college.name} Management fees is ₹${college.fees.Management}.`;
    }

    // HOSTEL
    else if (msg.includes("hostel")) {
      reply = `${college.name} hostel facility: ${college.hostel}.`;
    }

    // LOCATION
    else if (msg.includes("location") || msg.includes("city")) {
      reply = `${college.name} is located in ${college.city}.`;
    }

    // COURSES
    else if (msg.includes("course")) {
      const courses = college.courses.map(c => c.course).join(", ");
      reply = `${college.name} offers: ${courses}`;
    }

    // DETAILS
    else if (msg.includes("details")) {
      reply = `
<b>${college.name}</b><br>
Location: ${college.city}<br>
Hostel: ${college.hostel}<br><br>
KCET: ₹${college.fees.KCET}<br>
COMEDK: ₹${college.fees.COMEDK}<br>
Management: ₹${college.fees.Management}
      `;
    }
  }

  setTimeout(() => addMessage(reply, "bot"), 400);
}


// ===== ADD MESSAGE =====
function addMessage(text, type) {
  const chatBox = document.getElementById("chatBox");
  const div = document.createElement("div");
  div.className = type;
  div.innerHTML = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}


// ===== HEADER QUICK ASK =====
function quickAsk(text){

  document.getElementById("userInput").value = text;

  let chatBox = document.getElementById("chatBox");

  chatBox.innerHTML += `<div class="user">${text}</div>`;

  let reply = "";

  if(text.includes("top colleges")){
    reply = "Top Colleges:<br>• RV College<br>• BMS College<br>• MS Ramaiah<br>• PES University";
  }
  else if(text.includes("courses")){
    reply = "Available Courses:<br>• BE<br>• BTech";
  }
  else if(text.includes("admission")){
    reply = "Admission Help:<br>• KCET<br>• COMEDK<br>• Management";
  }

  setTimeout(()=>{
    chatBox.innerHTML += `<div class="bot">${reply}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  },500);

        }
