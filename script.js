let collegesData = [];

fetch("Colleges.json")
  .then(response => response.json())
  .then(data => {
    collegesData = data.colleges;
  })
  .catch(error => console.log(error));

function sendMessage() {
  const input = document.getElementById("userInput");
  const userMessage = input.value.trim();
  if (userMessage === "") return;

  addMessage(userMessage, "user");
  input.value = "";

  const msg = userMessage.toLowerCase();
  let reply =
    "Sorry, I couldn't understand your question. Please ask about fees, hostel, location, or courses.";

  collegesData.forEach(college => {
    const shortName = college.name.toLowerCase().split(" ")[0];

    if (msg.includes(shortName)) {

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
Management Quota Fees: ₹${college.fees.Management}
        `;
      }

      // KCET FEES
      if (msg.includes("kcet")) {
        reply = `${college.name} KCET fees is ₹${college.fees.KCET}.`;
      }

      // COMEDK FEES
      if (msg.includes("comedk")) {
        reply = `${college.name} COMEDK fees is ₹${college.fees.COMEDK}.`;
      }

      // MANAGEMENT FEES
      if (msg.includes("management")) {
        reply = `${college.name} Management quota fees is ₹${college.fees.Management}.`;
      }

      // HOSTEL
      if (msg.includes("hostel")) {
        reply = `${college.name} hostel facility: ${college.hostel}.`;
      }

      // LOCATION
      if (msg.includes("location") || msg.includes("city")) {
        reply = `${college.name} is located in ${college.city}.`;
      }

      // COURSES
      if (msg.includes("course")) {
        const courses = college.courses.map(c => c.course).join(", ");
        reply = `${college.name} offers the following courses: ${courses}.`;
      }

      // FULL DETAILS
      if (msg.includes("details")) {
        reply = `
<b>${college.name}</b><br>
📍 Location: ${college.city}<br>
🏨 Hostel: ${college.hostel}<br><br>
<b>Fees:</b><br>
KCET: ₹${college.fees.KCET}<br>
COMEDK: ₹${college.fees.COMEDK}<br>
Management: ₹${college.fees.Management}
        `;
      }
    }
  });

  setTimeout(() => addMessage(reply, "bot"), 400);
}

function addMessage(text, type) {
  const chatBox = document.getElementById("chatBox");
  const div = document.createElement("div");
  div.className = type;
  div.innerHTML = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
                          }
