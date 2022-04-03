const headerStyles = document.querySelector('.header-styles');
const styleOptions = document.querySelector('.style-options');

const isStyleExpend = (bool) => {
  if (bool === true) {
    styleOptions.style.display = 'flex';
    styleOptions.setAttribute('data-expended', 'true');
  } else {
    styleOptions.style.display = 'none';
    styleOptions.setAttribute('data-expended', 'false');
  }
};
headerStyles.addEventListener('click', () => {
  const expended = styleOptions.getAttribute('data-expended');
  if (expended === 'false') {
    isStyleExpend(true);
  } else {
    isStyleExpend(false);
  }
});

window.addEventListener('click', (event) => {
  if (event.target.closest('.header-styles') !== headerStyles) {
    isStyleExpend(false);
  }
});
