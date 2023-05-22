import { fetchCountries } from './fetchCountries/fetchCountries.js';
import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const inputSearch = document.querySelector('#search-box');
const listCountry= document.querySelector('.country-list');
const info = document.querySelector('.country-info');


inputSearch.addEventListener('input', debounce(handlerInputSearch, 1000));

// fetchCountries('poland')


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
    // console.dir(evt)
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
            if (data.length === 1) {
                showCountryInfo(data[0]);
                // info.innerHTML = creatMarkupCountry(data);
            } else if (data.length > 1 && data.length <= 10) {
                showCountryList(data);
                // listCountry.innerHTML = creatMarkupCards(data);
            } else if (data.length > 10) {
                // showTooManyMatchesMessage();
                Notiflix.Notify.failure('Too many matches found. Please enter a more specific name.')
                clearResults();
            }
            else {
                Notiflix.Notify.info('No matches found');
                clearResults();
            }
        })
        // .catch(error => console.error(error));
}

/**==============================================================
 * Function for show found one country 
 * @param {*string} country 
 */
function showCountryInfo(country) {

    // arrayCountries.forEach((country) => {});
        markup = `
            <img src="${country.flag}" alt="flag of ${country.name}">
            <h2>${country.name}</h2>
            <ul>
                <li><span>Capital:</span>${country.capital}</li>
                <li><span>Population:</span>${country.population}</li>
                <li><span>Languages:</span>${country.languages}</li>
            </ul>
        `;
    info.innerHTML = markup;
    listCountry.innerHTML = '';
    // return markup;
}

/**==============================================================
 * Function for show found many of country
 * @param {string} countries 
 */
function showCountryList(countries) {
    // name, capital, population, flags: { svg }, languages: { name }
    const markup = countries
        .map(country => `
            <li>
                <img src="${country.flag}" alt="flag of ${country.name}">
                <h3>${country.name}</h3>
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