// Get all the checkboxes and masonry items
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const masonryItems = document.querySelectorAll('.masonry-item');

// Function to handle checkbox change event
function handleCheckboxChange() {
  masonryItems.forEach(item => {
    const checkboxId = item.id + '-masonry-item';
    const checkbox = document.getElementById(checkboxId);
    item.style.display = checkbox.checked ? 'block' : 'none';
  });
}

// Attach the handleCheckboxChange function to each checkbox's change event
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', handleCheckboxChange);
});
