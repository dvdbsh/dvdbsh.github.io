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

  // Create a row to contain the columns
  const row = document.createElement('div');
  row.classList.add('row');

  let displayedCards = 0;
  const olderArticles = [];

  for (const feedURL of rssFeeds) {
    const articles = await fetchArticles(feedURL);
    const sortedArticles = sortByDate(articles);

    sortedArticles.forEach((article, index) => {
      if (displayedCards >= 12) {
        if (olderArticles.length < 5) {
          olderArticles.push(article);
        }
      } else {
        // Create a column for each article card
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
      }
    });
  }

  if (olderArticles.length > 0) {
    // Add "Older Stories" card with links to remaining articles
    const olderStoriesCard = document.createElement('div');
    olderStoriesCard.id = 'older-stories';
    olderStoriesCard.classList.add('card', 'article-card');

    const olderArticlesList = olderArticles
      .map((article) => `<li><i class="material-symbols-outlined">arrow_right_alt</i> <a href="${article.link}" target="_blank">${article.title}</a><br><span class="article-date">${formatPublishDate(article.pubDate)}</span><hr></li>`)
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

// Call the function to display the articles when the page loads
displayArticles();
