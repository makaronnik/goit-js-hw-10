export default function fetchBackgroundImage(name) {
  const API_KEY = 'lclYw7eNkHx0LOYXiShfF9YqTJcsJm5sh5QwLa9qv49V3HOrWS57P61k';
  const BASE_URI =
    'https://api.pexels.com/v1/search?orientation=landscape&per_page=1&query=';

  if (name === 'Russian Federation') {
    name = 'bloody';
  }

  const uri = BASE_URI + name.split(' ').join('+');

  return fetch(uri, {
    headers: {
      Authorization: API_KEY,
    },
  })
    .then(response => {
      return response.json();
    })
    .then(data => data.photos[0].src.landscape);
}
