let searchInputEl = document.getElementById("searchInput");
let spinnerEl = document.getElementById("spinner");
let resultCountriesEl = document.getElementById("resultCountries");

let searchInputVal = "";
let countrytestList = [];

function createAndAppendCountry(country) {
    let countryEl = document.createElement("div");
    countryEl.classList.add("country-card", "col-11", "col-md-5", "mr-auto", "ml-auto", "d-flex", "flex-row")
    resultCountriesEl.appendChild(countryEl);

    let couuntryflagEl = document.createElement("img");
    couuntryflagEl.src = country.flag;
    couuntryflagEl.classList.add("country-flag", "mt-auto", "mb-auto");
    countryEl.appendChild(couuntryflagEl);

    let countryText = document.createElement("div");
    //countryText.textContent = ("d-flex", "flex-column");
    countryEl.appendChild(countryText);

    let countryNameEl = document.createElement("p");
    countryNameEl.textContent = country.name;
    countryNameEl.classList.add("country-name");
    countryText.appendChild(countryNameEl);

    let countrypopulationEl = document.createElement("p");
    countrypopulationEl.textContent = country.population;
    countrypopulationEl.classList.add("country-population");
    countryText.appendChild(countrypopulationEl);

}

function displaySearchResults() {
    resultCountriesEl.textContent = "";
    for (let country of countrytestList) {
        let countryName = country.name;
        if (countryName.includes(searchInputVal)) {
            createAndAppendCountry(country);
        }
    }
}

function getCountries() {
    let url = "https://apis.ccbp.in/countries-data";
    let options = {
        method: "GET",
    };
    spinnerEl.classList.remove("d-none");
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            spinnerEl.classList.add("d-none");
            countrytestList = jsonData;
            displaySearchResults();
        });
}

function searchWikipedia(event) {
    searchInputVal = event.target.value;
    displaySearchResults();

}
getCountries();
searchInputEl.addEventListener("keyup", searchWikipedia);