import displayWeather from './WeatherApi.js';

// function to take an optional object and a template and insert the objects as HTML into the DOM
export function renderWithTemplate(template, parentElement, data, callback) {
    parentElement.insertAdjacentHTML("afterbegin", template);
    //if there is a callback...call it and pass data
    if (callback) {
      callback(data);
    }
  }
  

  export function toCapital(str) {
    return str.toLowerCase().split(' ').map(function(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  }

  async function loadTemplate(path) {
    const res = await fetch(path);
    const template = await res.text();
    return template;
  }
  
  // function to dynamically load the header and footer into a page
  export async function loadHeaderFooter() {
    const headerTemplate = await loadTemplate("../partials/header.html");
    const headerElement = document.querySelector("#main-header");
    const footerTemplate = await loadTemplate("../partials/footer.html");
    const footerElement = document.querySelector("#main-footer");
  
    renderWithTemplate(headerTemplate, headerElement);
    renderWithTemplate(footerTemplate, footerElement);
    displayWeather();
  }



  export function getTiemeLimit(level,operator='math') {


   if(operator==='tri'){
    
 //   console.log(`function getTiemeLimit(level):${level}   operator:${operator}` );

    if(level==='easy') return 22 * 2 ;
    if(level==='medium') return 12 * 2;
    return 7 *2;

    
   }else{

     if(level==='easy') return 22 ;
     if(level==='medium') return 12;
    return 7;


   }
    
  }
                
 