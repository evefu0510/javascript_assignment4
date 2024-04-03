// Grab references to all the DOM elements you'll need to manipulate
const submitBtn = document.querySelector('.submit'); // Reference to the submit button
const section = document.querySelector('section'); // Reference to the section where results will be displayed

// STEP 2: Add a submit event listener for the search form,
// referencing the fetchResults function as the callback
submitBtn.addEventListener("click", fetchResults);

// Function to fetch search results from the API
function fetchResults(e) { // Removed unused parameter
    e.preventDefault(); // Prevent the default form submission behavior
    const searchTerm = document.querySelector('.search').value; // Get the search term entered by the user
    const url = `https://imdb188.p.rapidapi.com/api/v1/searchIMDB?query=${searchTerm}`; // URL for the API request
    const options = { // Options for the fetch request
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5cf86471c2msh958146c18b4e7d5p1ade46jsn613a9d3e3f99',
            'X-RapidAPI-Host': 'imdb188.p.rapidapi.com'
        }
    };

    // Fetch data from the API
    fetch(url, options)
        .then(response => response.json()) // Parse the response as JSON
        .then(json => displayResults(json)) // Call displayResults function with the JSON data
        .catch(error => console.error('Error fetching data:', error)); // Handle any errors that occur during fetching
}

// Function to display search results in the section
function displayResults(json) {
    console.log(json); // Log the JSON data to the console

    // Remove any existing child elements from the section
    while (section.firstChild) {
        section.removeChild(section.firstChild);
    };

    let movieResult = json.data; // Extract movie results from the JSON data

    // Check if there are no results returned
    if (movieResult.length === 0) {
        // Display a message indicating no results
        const para = document.createElement('p');
        para.textContent = 'No results returned.'
        section.appendChild(para);
    } else {
        // Loop through each movie result and display its information
        for (let i = 0; i < movieResult.length; i++) {
            const article = document.createElement('div'); // Create a div for each movie
            const title = document.createElement('h2'); // Create an h2 element for the movie title
            const img = document.createElement('img'); // Create an img element for the movie poster
            const year = document.createElement('p'); // Create a p element for the movie year
            const stars = document.createElement('p'); // Create a p element for the movie stars
            const q = document.createElement('p'); // Create a p element for the movie q
            const para1 = document.createElement('p'); // Create a p element for the movie para1

            const current = movieResult[i]; // Get the current movie data
            console.log(current);

            // Set the text content and image source for each element
            title.textContent = current.title;
            year.textContent = current.year;
            stars.textContent = current.stars;
            para1.textContent = current.para1;
            q.textContent = current.q;
            img.src = current.image;

            // Append each element to the article div
            article.appendChild(title);
            article.appendChild(year);
            article.appendChild(stars);
            article.appendChild(q);
            article.appendChild(img);
            article.appendChild(para1);

            // Append the article to the section
            section.appendChild(article);
        };
    };
};
