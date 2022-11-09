const root = document.getElementById("root");
const loading = document.getElementById("loading");
let data; // all array is global

//show buttons handler
const showExtraInfo = (person) => (event) => {
  const personID = event.target.id.slice(4);
  const extraDiv = document.getElementById(`extraInfo${personID}`);
  console.log(extraDiv);
  console.log(person);
  if (extraDiv.innerHTML === "") {
    extraDiv.innerHTML = `
      <p>Rank:\ ${person.type}</p>
      <p>Admin:\ ${person.site_admin}</p>
    `;
  } else {
    extraDiv.innerHTML = "";
  }
};

// search button handling
const search = (cards) => (event) => {
  const searchText = String(event.target.value)
  console.log(searchText)
  let newCards = cards.filter((card)=>String(card).includes(searchText))
  if (newCards.length === 0) {
    root.innerHTML = "<h1>Nothing found</h1>"
  } else {
  root.innerHTML = newCards.join("");
  }
  
}


// loading starts...
setTimeout(loadData, 1000);

async function loadData() {
  let response = await fetch("http://api.github.com/users");
  data = await response.json();

  console.log(data);
  let cards = [];
  for (const person of data) {
    cards.push(`<div id="card${person.id}" class="card">
      <img src="${person.avatar_url}">
      <span>${person.login}</span>
      <button id="show${person.id}" class="show">Show more</button>
      <div id="extraInfo${person.id}"></div>
    </div>
    `);
  }
  loading.innerHTML = "";
  root.innerHTML = cards.join("");

  for (const person of data) {
    showButton = document.getElementById("show" + person.id);
    showButton.addEventListener("click", showExtraInfo(person));
  }

  const searchButton = document.getElementById("search")
  searchButton.addEventListener("change",search(cards))
}


