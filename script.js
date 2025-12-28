let colleges = [];

fetch("Colleges.json")
  .then(res => res.json())
  .then(data => {
    colleges = data.colleges;
  });

function searchCollege() {
  let query = document.getElementById("query").value.toLowerCase();
  let output = "";

  colleges.forEach(college => {
    if (college.name.toLowerCase().includes(query)) {
      output += `
        <h3>${college.name}</h3>
        <p>City: ${college.city}</p>
        <p>Type: ${college.type}</p>
        <hr>
      `;
    }
  });

  document.getElementById("result").innerHTML =
    output || "❌ No college found";
}
