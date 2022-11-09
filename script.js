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
    event.target.innerText = "Show less"
    extraDiv.innerHTML = `
      <p>Rank:\ ${person.type}</p>
      <p>Admin:\ ${person.site_admin}</p>
    `;
  } else {
    event.target.innerText = "Show more"
    extraDiv.innerHTML = "";
  }
};

// search button handling
const search = (cards) => (event) => {
  const searchText = String(event.target.value)
  console.log(searchText)
  if (searchText === "") {
    loading.innerHTML = "<strong>Loading...<strong>"
    root.innerHTML = ""
    loadData()
  } else {
  let newCards = cards.filter((card)=>{
    const index = String(card).indexOf("<span>") + 6 //login begins from here
    return card.slice(index,index+searchText.length) === searchText
  })
  console.log("newCards",newCards);
  if (newCards.length === 0) {
    root.innerHTML = "<h1>Nothing found</h1>"
  } else {
    root.innerHTML = newCards.join("");
    for (const person of data) {
      showButton = document.getElementById(`show${person.id}`);
      if (showButton !== null) {     // enélkül miért nem működik a listener...?
      console.log(showButton);
      showButton.addEventListener("click", showExtraInfo(person));
      }
    }
  }}
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
  searchButton.addEventListener("input",search(cards))
}


