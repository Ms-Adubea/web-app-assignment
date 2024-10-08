// // Function to fetch shows based on a query
// async function fetchShows(query, containerId) {
//     const url = `https://api.tvmaze.com/search/shows?q=${query}`;

//     try {
//         const response = await fetch(url);
//         const data = await response.json();

//         displayResults(data, containerId);
//     } catch (error) {
//         console.error('Error fetching data from TVMaze API:', error);
//     }
// }

// // Function to display the fetched TV shows
// function displayResults(shows, containerId) {
//     const resultsContainer = document.getElementById(containerId);
//     resultsContainer.innerHTML = '';  // Clear any previous results

//     shows.forEach((showData) => {
//         const show = showData.show;

//         // Create the show card
//         const showCard = document.createElement('div');
//         showCard.classList.add('show-card');

//         // Show image
//         const showImage = document.createElement('img');
//         showImage.classList.add('show-image');
//         showImage.src = show.image ? show.image.medium : 'https://via.placeholder.com/250x300?text=No+Image';
//         showImage.alt = `${show.name} Poster`;

//         // Show details
//         const showDetails = document.createElement('div');
//         showDetails.classList.add('show-details');

//         const showTitle = document.createElement('h2');
//         showTitle.textContent = show.name;

//         const showSummary = document.createElement('p');
//         showSummary.innerHTML = show.summary ? show.summary.substring(0, 150) + '...' : 'No summary available.';

//         // Append the elements together
//         showDetails.appendChild(showTitle);
//         showDetails.appendChild(showSummary);
//         showCard.appendChild(showImage);
//         showCard.appendChild(showDetails);
//         resultsContainer.appendChild(showCard);
//     });
// }

// // Function to handle the search form submission
// document.getElementById('search-form').addEventListener('submit', function (e) {
//     e.preventDefault(); // Prevent the form from reloading the page

//     const searchInput = document.getElementById('search-input').value.trim();
//     if (searchInput) {
//         fetchShows(searchInput, 'search-results');
//     }
// });

// // Initial fetch for popular shows
// fetchShows('popular', 'popular-shows');

// // Initial fetch for trending shows
// fetchShows('trending', 'trending-shows');


// // Hiding the second navbar after the hero section on scroll
// window.onscroll = function() {
//     const hero = document.querySelector('.hero');
//     const secondNav = document.querySelector('.second-navbar');
//     const heroHeight = hero.offsetHeight;
    
//     if (window.pageYOffset > heroHeight) {
//         secondNav.classList.add('sticky');
//     } else {
//         secondNav.classList.remove('sticky');
//     }
// };



// Select necessary elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchResultsContainer = document.getElementById('search-results');
const trendingContainer = document.getElementById('trending-shows');

// Function to fetch and display search results
async function fetchSearchResults(query) {
    try {
        const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
        const data = await response.json();

        // Clear previous results
        searchResultsContainer.innerHTML = '';

        if (data.length === 0) {
            searchResultsContainer.innerHTML = `<p>No results found for "${query}".</p>`;
            return;
        }

        // Display the search results
        data.forEach(item => {
            const show = item.show;
            const showCard = `
                <div class="show-card">
                    <img src="${show.image ? show.image.medium : 'https://img.freepik.com/free-photo/modern-television-broadcasting-movie-wide-screen-generative-ai_188544-33322.jpg?t=st=1727392505~exp=1727396105~hmac=2fe59800112615e450d858c948a6c3ff36bccb7990c43c6f6fad4b5744cd4766&w=740'}" alt="${show.name}">
                    <div class="show-details">
                        <h4>${show.name}</h4>
                        <p>Genres: ${show.genres.join(', ')}</p>
                        <p>Rating: ${show.rating.average ? show.rating.average : 'N/A'}</p>
                        <p>${show.summary ? show.summary.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 100) + '...' : 'No summary available.'}</p>
                    </div>
                </div>
            `;

            searchResultsContainer.insertAdjacentHTML('beforeend', showCard);
        });
    } catch (error) {
        console.error('Error fetching search results:', error);
        searchResultsContainer.innerHTML = `<p>There was an error fetching search results. Please try again later.</p>`;
    }
}

// Fetch and display trending (currently scheduled) shows
async function fetchTrendingShows() {
    try {
        const response = await fetch(`https://api.tvmaze.com/schedule?country=US`);
        const data = await response.json();

        // Clear previous results
        trendingContainer.innerHTML = '';

        if (data.length === 0) {
            trendingContainer.innerHTML = `<p>No trending shows available.</p>`;
            return;
        }

        // Display the trending shows
        data.forEach(item => {
            const show = item.show;
            const trendingCard = `
                <div class="show-card">
                    <img src="${show.image ? show.image.medium : 'https://via.placeholder.com/210x295?text=No+Image'}" alt="${show.name}">
                    <div class="show-details">
                        <h4>${show.name}</h4>
                        <p>Genres: ${show.genres.join(', ')}</p>
                        <p>Rating: ${show.rating.average ? show.rating.average : 'N/A'}</p>
                        <p>${show.summary ? show.summary.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 100) + '...' : 'No summary available.'}</p>
                    </div>
                </div>
            `;

            trendingContainer.insertAdjacentHTML('beforeend', trendingCard);
        });
    } catch (error) {
        console.error('Error fetching trending shows:', error);
        trendingContainer.innerHTML = `<p>There was an error fetching trending shows. Please try again later.</p>`;
    }
}

// Handle the search form submission
searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const query = searchInput.value.trim();
    
    if (query) {
        fetchSearchResults(query);
    }
});

// Fetch trending shows on page load
fetchTrendingShows();


