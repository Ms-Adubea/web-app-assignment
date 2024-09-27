const API_BASE_URL = 'https://api.tvmaze.com';
const POPULAR_SHOWS_LIMIT = 10;  // Number of shows to display

// Function to fetch popular shows
async function fetchPopularShows() {
    try {
        const response = await fetch(`${API_BASE_URL}/shows`);
        const shows = await response.json();
        displayPopularShows(shows.slice(0, POPULAR_SHOWS_LIMIT));  // Display only the top X shows
    } catch (error) {
        console.error('Error fetching popular shows:', error);
    }
}

// Function to display popular shows
function displayPopularShows(shows) {
    const showsContainer = document.querySelector('#popular-shows .show-grid');
    showsContainer.innerHTML = '';  // Clear any previous content

    shows.forEach(show => {
        const showCard = document.createElement('div');
        showCard.classList.add('show-card');

        const showImage = document.createElement('img');
        showImage.classList.add('show-image');
        showImage.src = show.image ? show.image.medium : 'https://via.placeholder.com/250x300?text=No+Image';
        showImage.alt = `${show.name} Poster`;

        const showDetails = document.createElement('div');
        showDetails.classList.add('show-details');

        const showTitle = document.createElement('h3');
        showTitle.textContent = show.name;

        const showSummary = document.createElement('p');
        showSummary.innerHTML = show.summary ? show.summary.substring(0, 100) + '...' : 'No summary available.';

        showDetails.appendChild(showTitle);
        showDetails.appendChild(showSummary);
        showCard.appendChild(showImage);
        showCard.appendChild(showDetails);
        showsContainer.appendChild(showCard);
    });
}

// Fetch and display popular shows when the page loads
fetchPopularShows();
