let collegesData = [];

fetch("Colleges.json")
  .then(res => res.json())
  .then(data => {
    collegesData = data.colleges;
  })
  .catch(err => console.log(err));

function sendMessage() {
  const input = document.getElementById("userInput");
  const userText = input.value.trim();
  if (userText === "") return;

  addMessage(userText, "user");
  input.value = "";

  const msg = userText.toLowerCase();
  let reply = "Sorry 😕 mujhe samajh nahi aaya. Fees, hostel, location ya courses ke baare me puchiye.";

  collegesData.forEach(college => {
    const shortName = college.name.toLowerCase().split(" ")[0];

    if (msg.includes(shortName)) {

      // ALL FEES
      if (msg.includes("fees") && !msg.includes("kcet") && !msg.includes("comedk") && !msg.includes("management")) {
        reply = `
<b>${college.name}</b><br>
KCET Fees: ₹${college.fees.KCET}<br>
COMEDK Fees: ₹${college.fees.COMEDK}<br>
Management Fees: ₹${college.fees.Management}
        `;
      }

      // KCET
      if (msg.includes("kcet")) {
        reply = `${college.name} ki KCET fees ₹${college.fees.KCET} hai.`;
      }

      // COMEDK
      if (msg.includes("comedk")) {
        reply = `${college.name} ki COMEDK fees ₹${college.fees.COMEDK} hai.`;
      }

      // MANAGEMENT
      if (msg.includes("management")) {
        reply = `${college.name} ki Management quota fees ₹${college.fees.Management} hai.`;
      }

      // HOSTEL
      if (msg.includes("hostel")) {
        reply = `${college.name} me hostel facility: ${college.hostel}`;
      }

      // LOCATION
      if (msg.includes("location") || msg.includes("city")) {
        reply = `${college.name} ${college.city} me located hai.`;
      }

      // COURSES
      if (msg.includes("course")) {
        const courses = college.courses.map(c => c.course).join(", ");
        reply = `${college.name} me available courses: ${courses}`;
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
