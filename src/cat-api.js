export function fetchBreeds() {
  const url = 'https://api.thecatapi.com/v1/breeds';
  const searchParams = new URLSearchParams({
    'x-api-key':
      'live_KxjO1LcWhjOXvVYjxbOy1HE38bZckXPzM6vXMkvoNSERNAIbkngZrerDYSAUtsy6',
  });
  return fetch(`${url}?${searchParams}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export function fetchCatByBreed(breedId) {
  const URL = 'https://api.thecatapi.com/v1/images/search';
  const searchParams = new URLSearchParams({
    'x-api-key':
      'live_KxjO1LcWhjOXvVYjxbOy1HE38bZckXPzM6vXMkvoNSERNAIbkngZrerDYSAUtsy6',
    breed_ids: breedId,
  });

  return fetch(`${URL}?${searchParams}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
