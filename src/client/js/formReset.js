function handleClear(event, onlyResults) {
  event.preventDefault()
  // check what text was put into the form field
  if (!onlyResults) {
    let formText = document.getElementById('place')
    formText.value = '';
    let formText2 = document.getElementById('departDate')
    formText2.value = '';
    const imageBox = document.getElementById('placeImage');
    imageBox.style.backgroundImage = '';
    imageBox.classList.add("placeImage", "newImage");
  }
  document.getElementById('placeDetail').innerHTML = '';
  document.getElementById('weather').innerHTML = `Typical weather for then is:`;
  document.getElementById('temp').innerHTML = '';
  document.getElementById('details').innerHTML = '';
}

export { handleClear }