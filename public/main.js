console.log('hello, browser!');

const header = window.document.getElementsByTagName('h1')[0];

header.onclick = () => {
  header.innerText = 'Go is awesome';
}


