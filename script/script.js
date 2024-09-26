document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('Search form submitted');  // Check if the event is triggered

    const searchQuery = document.getElementById('search-input').value.trim();

    if (searchQuery === '') {
        alert('Please enter a TV show name');
        return;
    }

    // Fetch TV show data
    fetchShows(searchQuery);
});

async function fetchShows(query) {
    console.log('Fetching shows for:', query);  // Check if the function is called
    
    const url = `https://api.tvmaze.com/search/shows?q=${query}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log(data);  // Log the raw data to the console for debugging

        displayResults(data);
    } 
    catch (error) {
        console.error('Error fetching data from TVMaze API:', error);
    }
}

// async function fetchShows(url) {
//     const response = await fetch(url);
//     const data = await response.json();
//     data.map((item) => console.log(item))
//     console.log(data)
// } console.log(fetchShows('https://api.tvmaze.com'))


function displayResults(shows) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';  // Clear previous results

    shows.forEach((showData) => {
        const show = showData.show;

        // Create the show card
        const showCard = document.createElement('div');
        showCard.classList.add('show-card');

        // Show image
        const showImage = document.createElement('img');
        showImage.classList.add('show-image');
        showImage.src = show.image ? show.image.medium : 'https://via.placeholder.com/250x300?text=No+Image';
        showImage.alt = `${show.name} Poster`;

        // Show details
        const showDetails = document.createElement('div');
        showDetails.classList.add('show-details');

        const showTitle = document.createElement('h2');
        showTitle.textContent = show.name;

        const showSummary = document.createElement('p');
        showSummary.innerHTML = show.summary ? show.summary.substring(0, 150) + '...' : 'No summary available.';

        showDetails.appendChild(showTitle);
        showDetails.appendChild(showSummary);

        // Append image and details to show card
        showCard.appendChild(showImage);
        showCard.appendChild(showDetails);

        // Append show card to results container
        resultsContainer.appendChild(showCard);
    });
}

