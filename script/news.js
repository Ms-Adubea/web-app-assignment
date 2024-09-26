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
                    <img src="${show.image ? show.image.medium : 'https://via.placeholder.com/210x295?text=No+Image'}" alt="${show.name}">
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


