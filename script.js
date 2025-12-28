let colleges = [];

fetch("Colleges.json")
  .then(r => r.json())
  .then(d => colleges = d.colleges);

function searchCollege() {
  let text = document.getElementById("query").value.toLowerCase();
  let chat = document.getElementById("chat");

  if (text === "") return;

  chat.innerHTML += `<div class="user">${text}</div>`;

  let found = false;

  colleges.forEach(c => {
    if (c.name.toLowerCase().includes(text)) {
      found = true;
      chat.innerHTML += `<div class="bot">
        <b>${c.name}</b><br>
        City: ${c.city}<br>
        Type: ${c.type}
      </div>`;
    }
  });

  if (!found) {
    chat.innerHTML += `<div class="bot">College not found</div>`;
  }

  document.getElementById("query").value = "";
}
