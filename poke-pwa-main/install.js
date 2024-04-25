let deferredPrompt
const button = document.querySelector(".installBtn")

button.style.display = "none"

window.addEventListener("beforeinstallprompt", function(event){
    deferredPrompt = event
    button.style.display ="block"
})

button.addEventListener("click", async function(event) {
    if(deferredPrompt !== null) { // Hvis prompten ikker er understøttet af browseren, så kørrer denne stykke kode i if'en ikke
        deferredPrompt.prompt()
        const { outcome } = await deferredPrompt.userChoice
        if(outcome === "accepted") {
            deferredPrompt === null
            button.style.display = "none" // skjuler knappen for at installere PWA
        }
    }
})