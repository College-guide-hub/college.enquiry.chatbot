let colleges = [];

fetch("Colleges.json")
  .then(res => res.json())
  .then(data => colleges = data);

function searchCollege() {
  let query = document.getElementById("search").value.toLowerCase();
  let output = "";

  colleges.forEach(college => {
    if (
      college.city.toLowerCase().includes(query) ||
      college.courses.join(" ").toLowerCase().includes(query)
    ) {
      output += `
        <h3>${college.name}</h3>
        <p>City: ${college.city}</p>
        <p>Courses: ${college.courses.join(", ")}</p>
        <p>Fees: ${college.fees}</p>
        <hr>
      `;
    }
  });

  document.getElementById("result").innerHTML =
    output || "No college found";
}
