/**
 * function for get data from API
 * @param {*string} name name country for find
 * @returns promise
 */

function fetchCountries(name = "") {

    return fetch(`https://restcountries.com/v2/name/${name}`)

    .then(response => {
        console.log(response);
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        return response.json()
    })
    // .then(data=>console.log(data))
    // .catch(err=>console.error(err))
}

export { fetchCountries };

