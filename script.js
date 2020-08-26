const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById('loader');

function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
function removeLoadingSpinner(){
    if(!loader.hidden)
    quoteContainer.hidden = false;
    loader.hidden = true;

}


async function getQuote(){
    showLoadingSpinner();
    const proxyURL = 'https://cors-anywhere.herokuapp.com/'
    const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyURL + apiURL);
        const data = await response.json();

        //check if quote has an author
         if(data.quoteAuthor === ''){
             quoteAuthor.innerText = 'Unknown';
        }else{
             quoteAuthor.innerText = data.quoteAuthor;

        }

        //check the length of the quote and change font accordingly
        if(data.quoteText > 120){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        removeLoadingSpinner();
    } catch (error) {
        getQuote();
    }
}

function tweetQuote(){
    const quote = quoteText.innerText;
    const author = quoteAuthor.innerText;
    const tweetURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(tweetURL, '_blank');
}

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);
getQuote();