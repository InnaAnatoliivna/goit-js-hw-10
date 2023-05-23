/**
 * function for get data from API
 * @param {*string} name name country for find
 * @returns promise
 */

function fetchCountries(name = "") {
    // const fields = 'name,capital,population,flags.svg,languages'

    // const params = new URLSearchParams({
    //     name: name,
    //     capital: capital,
    //     population: population,
    //     flag: flags.svg,
    //     languages: languages.name,
    //     // languages: languages.map((language) => language.name),
    // })
    // const params = new URLSearchParams({ name, capital, population, flags: { svg }, languages: { name }})

    return fetch(`https://restcountries.com/v2/name/${name}`)

    // return fetch(`https://restcountries.com/v2/name/${name}?fields=${fields}`)
    // return fetch(`https://restcountries.com/v2/name/${name}?fields=${params}`)
    // return fetch(`https://restcountries.com/v2/name/${name}?fields={name};{capital};{population};{flags.svg};{languages.name};`)

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

