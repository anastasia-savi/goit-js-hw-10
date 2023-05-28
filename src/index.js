import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';

const refs = {
  breedSelect: document.querySelector('.form-select'),
  load: document.querySelector('.load'),
  div: document.querySelector('.cat-info'),
  div1: document.querySelector('.cat-photo'),
  div2: document.querySelector('.cat-info1'),
  error: document.querySelector('.error'),
};

refs.breedSelect.addEventListener('change', handleSelectChange);
let catsInfo = [];
refs.breedSelect.classList.add('visible-no');
fetchBreeds()
  .then(cats => {
    refs.breedSelect.classList.remove('visible-no');
    refs.load.classList.add('visible-no');
    renderCatsSelector(cats);
    catsInfo = cats;
  })
  .catch(error => {
    console.log(error), refs.error.classList.remove('visible-no');
    refs.breedSelect.classList.add('visible-no');
  });

function renderCatsSelector(cats) {
  const markup = cats
    .map(cat => {
      return `<option value=${cat.id} >${cat.name}</option>`;
    })
    .join('');
  refs.breedSelect.innerHTML = markup;
}

function handleSelectChange(event) {
  refs.load.classList.remove('visible-no');
  let selectElement = event.target;
  let idValue = selectElement.value;
  fetchCatByBreed(idValue)
    .then(cat => {
      refs.load.classList.add('visible-no');
      renderCatPhoto(cat);
    })
    .catch(error => console.log(error));

  const catInfo = catsInfo.find(cat => cat.id === idValue);
  renderCatInfo(catInfo);
}

function renderCatPhoto(cat) {
  refs.div1.innerHTML = `<img src="${cat[0].url}" alt="" width='900'>`;
}

function renderCatInfo(catInfo) {
  refs.div2.innerHTML = `<h2>${catInfo.name}</h2><p>${catInfo.description}</p><p><strong>Temperament: </strong>${catInfo.temperament}</p>`;
}
