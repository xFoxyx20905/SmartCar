console.clear();

const list = document.querySelectorAll('.list');
const nav = document.querySelector('.navigation');

list.forEach(item => item.addEventListener('click', function(e) {
  // Remove 'active' class from all list items
  list.forEach(li => li.classList.remove('active'));

  // Add 'active' class to the clicked item
  e.currentTarget.classList.add('active');

  // Prevent the default behavior (opening the link) temporarily
  e.preventDefault();

  // Get the href attribute of the clicked link
  const href = e.currentTarget.querySelector('a').getAttribute('href');

  // Delay opening the link by 500 milliseconds (adjust the delay as needed)
  setTimeout(function() {
    // Navigate to the href after the delay
    window.location.href = href;
  }, 500); // Adjust the delay time in milliseconds
}));