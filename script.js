let colleges = [];

fetch("Colleges.json")
  .then(res => res.json())
  .then(data => {
    colleges = data.colleges;
  });

function searchCollege() {
  const query = document.getElementById("search").value.toLowerCase();
  let output = "";

  colleges.forEach(college => {
    if (college.name.toLowerCase().includes(query)) {
      output += `
        <h3>${college.name}</h3>
        <p><b>City:</b> ${college.city}</p>
        <p><b>Type:</b> ${college.type}</p>
        <p><b>Courses:</b></p>
        <ul>
          ${college.courses.map(c =>
            `<li>${c.course} - ₹${c.fees_per_year}/year</li>`
          ).join("")}
        </ul>
        <hr>
      `;
    }
  });

  document.getElementById("result").innerHTML =
    output || "❌ No college found";
}
