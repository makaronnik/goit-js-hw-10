export default class CountryList {
  constructor(countries) {
    this.countries = countries;
  }

  compile() {
    return this.countries
      .map(({ name: { official }, flags: { svg } }) => {
        return `
          <li class="country-list__item">
            <img class="country-list__img" src="${svg}" alt="${official}">${official}
          </li>
        `;
      })
      .join('');
  }
}
