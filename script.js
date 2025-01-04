const apiKey = '1f68b9aa86424baaa59b4fd5520f4ff5';  // Your API key from NewsAPI
const baseUrl = 'https://newsapi.org/v2/everything';  // NewsAPI URL

// Function to fetch news articles based on search query
const fetchNews = async (query) => {
  try {
    const url = `${baseUrl}?q=${query}&sortBy=publishedAt&apiKey=${apiKey}`;
    const response = await fetch(url);
    const result = await response.json();
    
    // Check if there are articles and display them
    if (result.status === 'ok' && result.articles.length > 0) {
      displayNews(result.articles);
    } else {
      displayNoResults();
    }
  } catch (error) {
    console.error('Error fetching news:', error);
  }
};

// Function to display the news articles in the browser
const displayNews = (articles) => {
  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML = '';  // Clear any previous results

  articles.forEach((article) => {
    const card = document.createElement('div');
    card.classList.add('news-card');

    card.innerHTML = `
      <div class="news-title">${article.title}</div>
      <div class="news-description">${article.description || 'No description available'}</div>
      <a href="${article.url}" target="_blank" class="view-button">Read More</a>
    `;
    
    newsContainer.appendChild(card);
  });
};

// Function to display a "No results" message
const displayNoResults = () => {
  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML = '<p>No results found. Please try a different search.</p>';
};

// Function that triggers the news search when typing in the search bar
const searchNews = () => {
  const query = document.getElementById('search-bar').value.trim();
  
  if (query) {
    fetchNews(query);
  } else {
    document.getElementById('news-container').innerHTML = '';  // Clear if no query
  }
};


