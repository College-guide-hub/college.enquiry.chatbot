let allColleges = [];

fetch("Colleges.json")
  .then(res => res.json())
  .then(data => {
    allColleges = data.colleges;
    displayColleges(allColleges);
  });

function displayColleges(colleges) {
  const list = document.getElementById("collegeList");
  list.innerHTML = "";

  colleges.forEach(college => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <h3>${college.name}</h3>
      <p><b>City:</b> ${college.city}</p>
      <p><b>Type:</b> ${college.type}</p>
      <p><b>Hostel:</b> ${college.hostel}</p>
    `;
    list.appendChild(div);
  });
}

document.getElementById("search").addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  const filtered = allColleges.filter(c =>
    c.name.toLowerCase().includes(value) ||
    c.city.toLowerCase().includes(value)
  );
  displayColleges(filtered);
});
