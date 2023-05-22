/**
 * function for get data from API
 * @param {*string} name name country for find
 * @returns promise
 */

function fetchCountries(name = "") {
    // const fields = 'name,capital,population,flags.svg,languages'

    // return fetch(`https://restcountries.com/v2/name/${name}?fields=${fields}`)
    return fetch(`https://restcountries.com/v2/name/${name}`)
        
    .then(response => {
        console.log(response);
        if (!response.ok) {
            throw new Error(resp.statusText)
        }
        return response.json()
    })
    .then(data=>data)
    .catch(err=>console.error(err))
}

export { fetchCountries };

