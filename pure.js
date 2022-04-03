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
const isOverflown = ({
  clientWidth, clientHeight, scrollWidth, scrollHeight,
}) => scrollHeight > clientHeight || scrollWidth > clientWidth;

['keypress', 'change', 'paste'].forEach((_event) => {
  window.addEventListener(_event, (e) => {
    // check the classname first 'editor'
    if (e.target.className === 'editor') {
      // get current element where user typing
      const currentElement = e.target;
      const allElement = document.querySelectorAll('.editor');
      const allElementArray = [];
      allElement.forEach((el) => allElementArray.push(el));
      const nextElementIndex = allElementArray.indexOf(currentElement) + 1;
      const nextElement = allElementArray[nextElementIndex];

      // stop typing if a new page already created and it is crosing the height
      if (isOverflown(currentElement)) {
        // it only prevent hitting "enter" key from keyboard.
        // make it more flexible. Because not if a user don't
        // hit enter key from keyboad, but keep writing, it will cross the line
        // and it will increate the page or div height.
        // e.preventDefault();

      }
      if (isOverflown(currentElement) && !nextElement) {
        // add new page

        currentElement.insertAdjacentHTML(
          'afterend',
          '<div class="editor" contenteditable></div>',
        );

        // focus on new page
        const newElement = document.querySelectorAll('.editor')[nextElementIndex];
        newElement.focus();
      }
    }
  });
});

window.addEventListener('click', (event) => {
  if (event.target.closest('.header-styles') !== headerStyles) {
    isStyleExpend(false);
  }
});
