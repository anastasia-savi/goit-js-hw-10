import { fetchBreeds, fetchCatByBreed } from './cat-api';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  div: document.querySelector('.cat-info'),
};

refs.breedSelect.addEventListener('change', handleSelectChange);

fetchBreeds()
  .then(cats => {
    renderCatsSelector(cats);
  })
  .catch(error => console.log(error));

function renderCatsSelector(cats) {
  const markup = cats
    .map(cat => {
      return `<option value=${cat.id} >${cat.name}</option>`;
    })
    .join('');
  refs.breedSelect.innerHTML = markup;
}

function handleSelectChange(event) {
  let selectElement = event.target;
  let idValue = selectElement.value;
  fetchCatByBreed(idValue)
    .then(cat => {
      refs.div.innerHTML = `<img src="${cat[0].url}" alt="${cat[0].name}" width='500'><h2>${cat[0].name}</h2><p>${cat[0].description}</p><p>${cat[0].temperament}</p>`;
    })
    .catch(error => console.log(error));
}
