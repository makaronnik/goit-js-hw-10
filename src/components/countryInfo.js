export default class CountryInfo {
  constructor(country) {
    this.country = country;
  }

  compile() {
    const {
      name: { official },
      flags: { svg },
      capital,
      population,
      languages,
    } = this.country[0];

    const languagesString = Object.values(languages).join(', ');

    return `
        <div class="country-info_head">
          <img class="country-info_img" src="${svg}" alt="${official}">${official}
        </div>
        <p class="country-info_param"><b>Capital:</b> ${capital.join(', ')}</p>
        <p class="country-info_param"><b>Population:</b> ${population}</p>
        <p class="country-info_param"><b>Languages:</b> ${languagesString}</p>
      `;
  }
}
