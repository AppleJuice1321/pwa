async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("sw.js", {
        scope: "/",
      });
      if (registration.installing) {
        console.log("Serviceworker is installing");
      } else if (registration.waiting) {
        console.log("Serviceworker is installed");
      } else if (registration.active) {
        console.log("Serviceworker is active");
      }
    } catch (error) {
		console.log("Serviceworker registration failed", error);
	}
  }
}

(async function () {
  const pokelist = document.querySelector(".pokelist");
  
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    const data = await response.json();
    
    data.results.forEach((pokemon) => {
      const listItem = document.createElement("li");
      listItem.classList.add("pokemon");
      listItem.innerHTML = `<a href="/details.html?name=${pokemon.name}">${pokemon.name}</a>`;
      pokelist.appendChild(listItem);
    }); 
  } catch (error) {
    console.error(error);
    pokelist.innerHTML = "<li>Couldn't load the list of pokemon</li>";
  }
})();

registerServiceWorker()