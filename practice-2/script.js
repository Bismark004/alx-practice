document.addEventListener('DOMContentLoaded', function() { 
    const quote = document.getElementById('quote');
    const author = document.getElementById('author');
    const submit = document.getElementById('submit');
    const display = document.getElementById('display');

    submit.addEventListener('click', function() {
        const quoteText = quote.value.trim();
        const authorText = author.value.trim();

        if (quoteText && authorText) {
            const quoteObject = { quote: quoteText, author: authorText };
            const quoteKey = `quote_${new Date().getTime()}`;
            localStorage.setItem(quoteKey, JSON.stringify(quoteObject));
            quote.value = '';
            author.value = '';
            displayQuotes();
        }
    });

    function displayQuotes() {
        display.innerHTML = '';
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('quote_')) {
                const quoteObject = JSON.parse(localStorage.getItem(key));
                const quoteItem = document.createElement('div');
                quoteItem.classList.add('quote-item');
                quoteItem.innerHTML = `
                    <span>"${quoteObject.quote}" - ${quoteObject.author}</span>
                    <button onclick="removeQuote('${key}')">Remove</button>
                `;
                display.appendChild(quoteItem);
            }
        }
    }

    window.removeQuote = function(key) {
        localStorage.removeItem(key);
        displayQuotes();
    };

    displayQuotes();
});
