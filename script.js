const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
var errorCount = 0;

function showLoaderSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoaderSpinner() {
    if (!loader.hidden) {
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}

// Get Quote from API
async function getQuote() {
    showLoaderSpinner();
    const proxyUrl = 'https://aqueous-chamber-41304.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        if (data.quoteAuthor === '') {
            authorText.innerHTML = '';
        } else {
            authorText.innerHTML = data.quoteAuthor;
        }
        if (data.quoteText.lenght > 50) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        errorCount = 0;
        removeLoaderSpinner();
    } catch (error) {
        errorCount += 1;    
        if (errorCount<10) {
            getQuote();
        } else {
            console.log(error);
        }
    }
}

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = 'https://twitter.com/intent/tweet?text=${quote} - ${author}'
    .replace('{quote}', quote)
    .replace('{author}', author);

    window.open(twitterUrl, '_blank');
}

// Event Listener
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();
