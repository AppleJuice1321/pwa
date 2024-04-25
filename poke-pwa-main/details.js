(async function() {
	const details = document.querySelector('.details')

	const url = new URL(window.location)
	const pokeName = url.searchParams.get('name')

	try {
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
		const pokemon = await response.json()

		const detailItem = document.createElement('div')
		detailItem.classList.add('pokemon')
		document.title = pokemon.name + " | Pokemon!!"

		detailItem.innerHTML = `
			<h2>${pokemon.name}</h2>
			<img src="${pokemon.sprites.front_default}" />
			<p>Height: ${pokemon.height}</p>
			<p>Weight: ${pokemon.weight}</p>
		`
		details.appendChild(detailItem)
	} catch (error) {
		console.error(error)
		details.innerHTML = `<p>Couldn't find a pokemon with the name "${pokeName}"</p>`
	}
})()
