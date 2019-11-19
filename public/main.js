$(document).ready(() => {
    const search = document.querySelector('#search');
    const quickSearch = document.querySelector('#quickSearch');

    search.addEventListener("click", event => {
        console.log('it works')
        
    });
    
    quickSearch.addEventListener("click", event => {
        console.log('it also works')
    });
});