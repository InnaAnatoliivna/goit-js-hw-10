import { fetchCountries } from './fetchCountries/fetchCountries.js';
import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const inputSearch = document.querySelector('#search-box');
const listCountry= document.querySelector('.country-list');
const info = document.querySelector('.country-info');

inputSearch.addEventListener('input', debounce(handlerInputSearch, DEBOUNCE_DELAY));

/**==============================================================
 * function for handler event on input
 * @param {*string} evt 
 */
function handlerInputSearch(evt) {
    evt.preventDefault();

    const searchValue = evt.target.value.trim();

    if (searchValue === '') {
        clearResults();
        return
    }

    fetchCountries(searchValue)

        .then((data) => {
            return data.map((country) => ({
                name: country.name,
                capital: country.capital,
                population: country.population,
                flag: country.flags.svg,
                languages: country.languages.map((language) => language.name)
            }));
        })
        .then(data => {
            if ( data.length === 1 ) {
                showCountryInfo(data[0]);
            } else if ( data.length > 1 && data.length <= 10 ) {
                showCountryList(data);
            } else if ( data.length > 10 ) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
                clearResults();
            }
            else if ( data.length === 0 ){
                Notiflix.Notify.failure('Oops, there is no country with that name');
                clearResults();
            }
        })
        .catch(error => {
            console.error(error);
            // Notiflix.Notify.failure('Oops, there is no country with that name');
            // clearResults();
        })
}

/**==============================================================
 * Function for show found one country 
 * @param {*string} country 
 */
function showCountryInfo(country) {
    // arrayCountries.forEach((country) => {});
    const markup = `
            <div class="wrap-info">
                <img class="img-info" src="${country.flag}" alt="flag of ${country.name}" width="100">
                <h1 class="title-info">${country.name}</h1>
            </div>
            <ul class="list list-info">
                <li class="item-info"><span class="item-wrap-info">Capital:</span>${country.capital}</li>
                <li class="item-info"><span class="item-wrap-info">Population:</span>${country.population}</li>
                <li class="item-info"><span class="item-wrap-info">Languages:</span>${country.languages}</li>
            </ul>
        `;
    info.innerHTML = markup;
    listCountry.innerHTML = '';
}

/**==============================================================
 * Function for show found many of country
 * @param {string} countries 
 */
function showCountryList(countries) {
    // name, capital, population, flags: { svg }, languages: { name }
    const markup = countries
        .map(country => `
            <li class="item-list">
                <img src="${country.flag}" alt="flag of ${country.name}" width="50" height="40">
                <h3 class="title-list">${country.name}</h3>
            </li>
        `)
        .join('');
    
    info.innerHTML = '';
    listCountry.innerHTML = markup;
}

/**==============================================================
 * function for clearing created markup in this file
 */
function clearResults() {
    listCountry.innerHTML = '';
    info.innerHTML = '';
}