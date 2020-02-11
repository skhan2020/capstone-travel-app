function handleClear(event, onlyResults) {
  event.preventDefault()
  // check what text was put into the form field
  if (!onlyResults) {
    let formText = document.getElementById('place')
    formText.value = '';
    let formText2 = document.getElementById('departDate')
    formText2.value = '';
    const imageBox = document.getElementById('placeImage');
    imageBox.style.backgroundImage = 'url(https://pixabay.com/get/52e0d2434c5ab108f5d084609629327f123ed8e05b4c704c7d2e7fd5964cc15c_1280.jpg)';
  }
  document.getElementById('placeDetail').innerHTML = '';
  document.getElementById('weather').innerHTML = `Typical weather for then is:`;
  document.getElementById('temp').innerHTML = '';
  document.getElementById('details').innerHTML = '';
}

export { handleClear }