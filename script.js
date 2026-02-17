let collegesData = [];

fetch("Colleges.json")
  .then(response => response.json())
  .then(data => {
    collegesData = data.colleges;
  })
  .catch(error => console.log(error));


// FIND COLLEGE
function findCollegeByName(userText, colleges) {
  userText = userText.toLowerCase();

  return colleges.find(college =>
    userText.includes(college.name.toLowerCase()) ||
    userText.includes(college.name.toLowerCase().split(" ")[0])
  );
}


// SEND MESSAGE
function sendMessage() {

  const input = document.getElementById("userInput");
  const userMessage = input.value.trim();

  if (userMessage === "") return;

  addMessage(userMessage, "user");
  input.value = "";

  const msg = userMessage.toLowerCase();

  let reply = "Sorry, ask about fees, hostel, placement, location or courses.";

  const college = findCollegeByName(msg, collegesData);

  if (college) {

    // PLACEMENT
    if (msg.includes("placement") || msg.includes("package")) {
      reply = `
<b>${college.name} Placement</b><br>
Highest Package: ${college.placement?.highest || "NA"} LPA<br>
Average Package: ${college.placement?.average || "NA"} LPA
      `;
    }

    // FEES
    else if (msg.includes("fees")) {
      reply = `
<b>${college.name}</b><br>
KCET: ₹${college.fees.KCET}<br>
COMEDK: ₹${college.fees.COMEDK}<br>
Management: ₹${college.fees.Management}
      `;
    }

    // HOSTEL
    else if (msg.includes("hostel")) {
      reply = `${college.name} hostel: ${college.hostel}`;
    }

    // LOCATION
    else if (msg.includes("location") || msg.includes("city")) {
      reply = `${college.name} is in ${college.city}`;
    }

    // COURSES
    else if (msg.includes("course")) {
      const courses = college.courses.map(c => c.course).join(", ");
      reply = `${college.name} offers ${courses}`;
    }

  }

  setTimeout(() => addMessage(reply, "bot"), 400);
}


// ADD MESSAGE
function addMessage(text, type) {
  const chatBox = document.getElementById("chatBox");
  const div = document.createElement("div");
  div.className = type;
  div.innerHTML = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
  }
