const button = document.getElementById('weatherButton')
const inputField = document.getElementById('userInput')
console.log('Loaded')
const locationDisplay = document.getElementById('location')
const forecastDisplay = document.getElementById('forecast')

button.addEventListener('click', (e) => {
    e.preventDefault();

    const location = inputField.value

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error)
                locationDisplay.appendChild(document.createTextNode(data.error))
            else
                locationDisplay.appendChild(document.createTextNode(data.location))
                forecastDisplay.appendChild(document.createTextNode(data.forecast))
        })
})

    locationDisplay.textContent = " "
    forecastDisplay.textContent = " "

})




