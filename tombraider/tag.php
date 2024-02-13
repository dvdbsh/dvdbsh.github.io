<?php
include 'news.php';

$tag = isset($_GET['tag']) ? $_GET['tag'] : '';

$filteredArticles = array_filter($newsArticles, function($article) use ($tag) {
    return in_array($tag, $article['tags']);
});

include 'header.php';
?>

<h2>Articles tagged with '<?php echo $tag; ?>'</h2>

<div class="flex-container">
    <?php
    foreach ($filteredArticles as $article) {
        echo '<div class="flex-item article">';
        echo '<h3 class="article-heading">' . $article['title'] . '</h3>';
        echo '<h4 class="article-subheading">' . $article['subtitle'] . '</h4>';
        echo '<p class="article-text">' . $article['text'] . '</p>';
        echo '<div class="article-tags">';
        foreach ($article['tags'] as $articleTag) {
            echo '<span class="tag">' . $articleTag . '</span>';
        }
        echo '</div>';
        echo '<a href="#" class="read-more">Read more</a>';
        echo '</div>';
    }
    ?>
</div>

<?php
include 'footer.php';
?>
