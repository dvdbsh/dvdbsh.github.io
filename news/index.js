const Parser = require('rss-parser');
const parser = new Parser();

const rssFeeds = [
  'https://london.ctvnews.ca/rss/ctv-news-london-1.1073369',
  'https://globalnews.ca/london/feed/',
  'https://www.cbc.ca/cmlink/rss-canada-london',
  // Add more RSS feed URLs here
];

async function fetchArticles() {
  const articles = [];
  for (const feedURL of rssFeeds) {
    try {
      const feed = await parser.parseURL(feedURL);
      articles.push(...feed.items);
    } catch (err) {
      console.error(`Error fetching feed from ${feedURL}:`, err.message);
    }
  }
  return articles;
}

function sortByDate(articles) {
  return articles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
}

async function main() {
  try {
    const articles = await fetchArticles();
    const sortedArticles = sortByDate(articles);

    // Convert sorted articles to a JSON string and print it to the console
    console.log(JSON.stringify(sortedArticles));
  } catch (err) {
    console.error('Error:', err.message);
  }
}

main();
