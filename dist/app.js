const URL = 'https://corona-virus-stats.herokuapp.com/api/v1/cases/general-stats'

const countryURL = 'https://corona-virus-stats.herokuapp.com/api/v1/cases/countries-search?limit=10'

// World stats
const death_cases = document.querySelector('.death-number')
const infected_cases = document.querySelector('.infected-number')
const recovery_cases = document.querySelector('.recovery-number')

// Country stats

const dropdown = document.querySelector('.country-dropdown')
const stats = document.querySelector('.stats')
const last_updated = document.querySelector('.last-updated')

stats.classList.add('d-none')

const country_total_cases = document.querySelector('.country-total-cases')
const country_total_deaths = document.querySelector('.country-total-deaths')
const country_total_recovered = document.querySelector('.country-total-recovered')
const country_active_cases = document.querySelector('.country-active-cases')
const flag = document.querySelector('.flag')
const country_name = document.querySelector('.country-name')

async function getData(url) {
    let response = await fetch(url);

    if (response.ok) { // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа (см. про этот метод ниже)
        let json = await response.json();
        return json
    } else {
        alert("Ошибка HTTP: " + response.status);
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    let response = await getData(URL)


    
    death_cases.innerHTML = response.data.death_cases
    recovery_cases.innerHTML = response.data.recovery_cases
    infected_cases.innerHTML = response.data.currently_infected

    let country_response = await getData(countryURL)

    last_updated.innerHTML = country_response.data.last_update

    dropdown.addEventListener('change', () => {

        stats.classList.remove('d-none')

        let country = country_response.data.rows.find(x => x.country === dropdown.options[dropdown.selectedIndex].value)

        flag.src = country.flag 
        country_name.innerHTML = country.country
        country_total_cases.innerHTML = country.total_cases
        country_total_deaths.innerHTML = country.total_deaths
        country_total_recovered.innerHTML = country.total_recovered
        country_active_cases.innerHTML = country.active_cases
    })
})