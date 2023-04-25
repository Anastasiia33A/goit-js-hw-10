import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import { fetchCountries } from './fetchCountries.js';
import { countryMarkup, countriesMarkup } from './markup.js';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    listCountry: document.querySelector('.country-list'),
    infoCountry: document.querySelector('.country-info')
}

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
    const searchQuery = e.target.value.trim();

if (!searchQuery) {
        refs.listCountry.innerHTML = '';
        return;
    }

    fetchCountries(searchQuery)
        .then(data => {
            if (data.length > 10) {
                Notify.info('Too many matches found. Please enter a more specific name.');
                refs.listCountry.innerHTML = '';
                return;
            }
            refs.listCountry.innerHTML = data.length === 1
                ? countryMarkup(data[0])
                : countriesMarkup(data);
        })
        .catch(() => {
            Notify.failure('Oops, there is no country with that name');
        });
}
