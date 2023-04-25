export function fetchCountries(country) {
    const options = new URLSearchParams({
        fields: 'name,capital,population,flags,languages',
    });
    const url = `https://restcountries.com/v3.1/name/${country}?${options}`;

    return fetch(url).then(responce => {
        if (!responce.ok) {
            throw new Error();
        }
        return responce.json();
    });
}