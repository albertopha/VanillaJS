const API_BASE_URL = 'https://api.frontendexpert.io/api/fe/testimonials';

// Write your code here.
const state = {
  after: '',
  hasNext: false,
  testimonials: [],
  readyToSend: true
};

// Elements
const container = document.querySelector('#testimonial-container');

// Unitility functions
const fetchTestimonials = ({ url, limit, after }) => {
  if (!state.readyToSend) return;
  let formattedURL = `${url}?limit=${limit}`;
  if (after) formattedURL = `${formattedURL}&after=${after}`;
  state.readyToSend = false;
  return fetch(formattedURL)
    .then(response => response.json())
    .catch((error) => null);
};

const updateTestimonials = (data) => {
  if (Array.isArray(data.testimonials) && data.testimonials.length > 0) {
    state.hasNext = data.hasNext;
    state.testimonials = data.testimonials;
    state.after = state.testimonials[state.testimonials.length - 1].id;
    const testimonialElements = state.testimonials.map((testimonial) => {
      const p = document.createElement('p');
      p.classList.add('testimonial');
      p.setAttribute('id', testimonial.id);
      p.textContent = testimonial.message;
      return p;
    });
    container.append(...testimonialElements);
    state.readyToSend = true;
  }
};

// Event listeners
container.addEventListener('scroll', (event) => {
  if (!event || !event.target) return;
  const container = event.target;
  if (container.scrollHeight - container.scrollTop <= container.clientHeight) {
    fetchTestimonials({
      url: API_BASE_URL,
      limit: 5,
      after: state.after
    }).then(data => updateTestimonials(data));
  }
});

// Initial loading
fetchTestimonials({
  url: API_BASE_URL,
  limit: 5
}).then(data => updateTestimonials(data));

