// Function to display today's date
function displayTodaysDate() {
  const todaysDate = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = todaysDate.toLocaleDateString(undefined, options);
  const todaysDateElement = document.querySelector('.todays-date');
  todaysDateElement.textContent = formattedDate;
}

// Function to refresh the articles every 5 minutes
async function refreshArticles() {
  // Call the displayArticles function to fetch and display new articles
  await displayArticles();

  // Refresh the today's date
  displayTodaysDate();
}

// RSS feed URLs
const rssFeeds = [
  'https://london.ctvnews.ca/rss/ctv-news-london-1.1073369',
  'https://globalnews.ca/london/feed/',
  'https://www.cbc.ca/cmlink/rss-canada-london',
  // Add more RSS feed URLs here
];

function fetchArticles(feedURL) {
  return fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedURL)}`)
    .then((response) => response.json())
    .then((data) => data.items)
    .catch((error) => {
      console.error(`Error fetching feed from ${feedURL}:`, error);
      return [];
    });
}

function sortByDate(articles) {
  return articles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
}

function formatPublishDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}

function getSourceFromURL(url) {
  const urlObj = new URL(url);
  return urlObj.hostname;
}

async function displayArticles() {
  const articlesList = document.getElementById('articles-list');
  articlesList.innerHTML = '';

  const row = document.createElement('div');
  row.classList.add('row');

  let displayedCards = 0;
  const olderArticles = [];

  for (const feedURL of rssFeeds) {
    const articles = await fetchArticles(feedURL);
    const sortedArticles = sortByDate(articles);

    sortedArticles.forEach((article, index) => {
      if (displayedCards >= 21) {
        if (olderArticles.length < 20) {
          olderArticles.push(article);
        }
      } else {
        const col = document.createElement('div');
        col.classList.add('col');

        const articleCard = document.createElement('div');
        articleCard.classList.add('card', 'article-card');

        const articleImage = article.enclosure
          ? `<img class="article-image" src="${article.enclosure.link}" alt="Article Image" onclick="window.open('${article.link}', '_blank')">`
          : '';
        const publishDate = formatPublishDate(article.pubDate);
        const source = getSourceFromURL(article.link);

        articleCard.innerHTML = `<div class="card-image">
                                   ${articleImage}
                                 </div>
                                 <div class="card-content">
                                   <p class="article-title"><a href="${article.link}" target="_blank">${article.title}</a></p>
                                   <p class="article-description">${article.description}</p>
                                   <div class="date-source">
                                     <p><i class="material-symbols-outlined">calendar_today</i> ${publishDate}</p>
                                     <p><i class="material-symbols-outlined">folder_open</i> ${source}</p>
                                   </div>
                                 </div>`;

        col.appendChild(articleCard);
        row.appendChild(col);
        displayedCards++;

        // Create an RSS logo element
        const rssLogo = document.createElement('img');
        rssLogo.classList.add('rss-logo');
        rssLogo.src = getRSSLogo(feedURL);
        articleCard.appendChild(rssLogo); // Append the logo to the article card
      }
    });
  }

  if (olderArticles.length > 0) {
    const olderStoriesCard = document.createElement('div');
    olderStoriesCard.id = 'older-stories';
    olderStoriesCard.classList.add('card', 'article-card');

    const olderArticlesList = olderArticles
      .map((article) => `<li><i class="material-symbols-outlined">arrow_right_alt</i> <a href="${article.link}" target="_blank">${article.title}</a><br><span class="article-date">${formatPublishDate(article.pubDate)}</span><hr class="older"></li>`)
      .join('');

    olderStoriesCard.innerHTML = `<div class="card-content">
                                     <p class="article-title">Older Stories</p>
                                     <ul class="older-articles-list">
                                       ${olderArticlesList}
                                     </ul>
                                   </div>`;

    row.appendChild(olderStoriesCard);
  }

  articlesList.appendChild(row);
}

function getRSSLogo(feedURL) {
  // Define the RSS logos for each feed URL (customize this as needed)
  const rssLogos = {
    'https://london.ctvnews.ca/rss/ctv-news-london-1.1073369': 'https://res.cloudinary.com/di8j84ent/image/upload/v1689558729/ctv_hpjfw7.png',
    'https://globalnews.ca/london/feed/': 'https://res.cloudinary.com/di8j84ent/image/upload/v1689558729/global_exvmu4.png',
    'https://www.cbc.ca/cmlink/rss-canada-london': 'https://res.cloudinary.com/di8j84ent/image/upload/v1689558729/cbc_sap98q.png',
    'http://rss.cnn.com/rss/cnn_topstories.rss': 'https://res.cloudinary.com/di8j84ent/image/upload/v1689702660/cnn-logo-red-png-3_d8zru4.png',
    // Add more logos for other feed URLs
  };

  // Return the corresponding logo for the given feedURL
  return rssLogos[feedURL] || 'default_rss_logo.png'; // Replace 'default_rss_logo.png' with a fallback logo URL
}

// Call the function to display the articles when the page loads
displayArticles();

// Call the function to display today's date when the page loads
displayTodaysDate();

// Auto-refresh the articles and today's date every 5 minutes (300,000 milliseconds)
const refreshInterval = 300000; // 5 minutes in milliseconds
setInterval(refreshArticles, refreshInterval);
