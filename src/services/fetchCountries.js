export default function fetchCountries(name) {
  const BASE_URI = 'https://restcountries.com/v3.1/name/';
  const FIELDS = ['name', 'capital', 'population', 'flags', 'languages'];
  const uri = BASE_URI + name + '?fields=' + FIELDS.join(',');

  return fetch(uri)
    .then(response => {
      if (!response.ok || response.status === 404) {
        const error = new Error(response.statusText);

        error.status = response.status;
        error.statusText = response.statusText;

        throw error;
      }

      return response.json();
    })
    .then(data => data);
}
