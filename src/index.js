import './css/styles.css';
import fetchCountries from './services/fetchCountries';
import fetchBackgroundUrl from './services/fetchBackgroundUrl';
import CountryInfo from './components/countryInfo';
import CountryList from './components/countryList';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
  searchBox: document.querySelector('#search-box'),
  countryInfo: document.querySelector('.country-info'),
  countryList: document.querySelector('.country-list'),
};

let lastSingleCountryName = '';

refs.searchBox.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput({ target: { value } }) {
  value = value.trim();

  if (value === '') {
    clearElements();

    return;
  }

  fetchCountries(value.trim()).then(handleResult).catch(handleError);
}

function handleResult(data) {
  if (data.length === 1) {
    renderCountryInfo(data);
  } else if (data.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else {
    renderCountryList(data);
  }
}

function handleError(error) {
  clearElements();

  if (error.status === 404) {
    Notify.failure('Oops, there is no country with that name');
  } else {
    Notify.warning(error.statusText || error.message);
    console.error(error);
  }
}

function renderCountryInfo(data) {
  let countryName = data[0].name.official;

  if (countryName === lastSingleCountryName) {
    return;
  }

  clearElements();
  lastSingleCountryName = countryName;
  refs.countryInfo.innerHTML = new CountryInfo(data).compile();
  changeBodyBackground(countryName);
}

function renderCountryList(data) {
  clearElements();
  refs.countryList.innerHTML = new CountryList(data).compile();
}

function changeBodyBackground(countryName) {
  fetchBackgroundUrl(countryName)
    .then(imgUrl => {
      // Preloading image to browser cash
      fetch(imgUrl)
        .catch()
        .finally(() => {
          document.body.style.backgroundImage = `url(${imgUrl})`;
          refs.countryInfo.classList.add('country-info--lightened');
        });
    })
    .catch(console.error);
}

function clearElements() {
  lastSingleCountryName = '';
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
  refs.countryInfo.classList.remove('country-info--lightened');
  document.body.style.backgroundImage = null;
}
