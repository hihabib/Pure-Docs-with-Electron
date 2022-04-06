window.handleFile.call(() => {
  const content = document.querySelector('.fr-element').innerHTML;
  console.log(content);
  window.handleFile.save('content', content);
});
window.handleFile.open((event, data) => {
  const placeholder = document.querySelector('.fr-placeholder');
  // eslint-disable-next-line no-param-reassign
  document.querySelector('.fr-element').innerHTML = data;
  placeholder.innerText = '';
});
window.handleFile.print(() => {
  window.print();
});
