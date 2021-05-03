let index = 1;

// Fetch images from API
var images = null;
xmlhttp=new XMLHttpRequest();
xmlhttp.onreadystatechange=function() {
  if (xmlhttp.readyState==4 && xmlhttp.status==200) {
    // images = JSON.parse(xmlhttp.responseText).slice(0,50);
    images = JSON.parse(xmlhttp.responseText);
    initGallery();
  }
}
xmlhttp.open("GET","https://jsonplaceholder.typicode.com/photos", true);
xmlhttp.send();

function initGallery() {
  const container = document.querySelector('.gallery-container');
  const template = document.getElementById('image-template');
  let clone = null;
  images.forEach( image => {
    clone = template.content.cloneNode(true);
    let imageContainerElem = clone.querySelector('.image-container');
    let titleElem = clone.querySelector('.title');
    let imageElem = clone.querySelector('.image img');
    let albumElem = clone.querySelector('.album');
    let testId = clone.querySelector('.text-id');
    imageContainerElem.dataset.id = image.id;
    titleElem.textContent = image.title;
    imageElem.src = image.url;
    albumElem.textContent = `Album ID: ${image.albumId}`;
    testId.textContent = image.id;
    // add the clone element to the container element
    container.appendChild(clone);
  });
  // make the first photo visible by default
  document.querySelector('[data-id="1"]').classList.add('active');

  // add event listeners to control buttons
  document.querySelector('.controls .previous').addEventListener('click', function () {
    document.querySelector(`[data-id="${index}"]`).classList.remove('active');
    if (index === 1) {
      index = images.length
    } else {
      index--;
    }
    document.querySelector(`[data-id="${index}"]`).classList.add('active');
  });
  document.querySelector('.controls .next').addEventListener('click', function () {
    document.querySelector(`[data-id="${index}"]`).classList.remove('active');
    if (index === images.length) {
      index = 1;
    } else {
      index++;
    }
    document.querySelector(`[data-id="${index}"]`).classList.add('active');
  });
}
