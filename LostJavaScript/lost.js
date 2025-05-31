// Sticky Navigation Show/Hide on Scroll
if (document.body.classList.contains("index-page")) {
  let lastScrollTop = 0;
  const nav = document.getElementById("navigation");

  window.addEventListener("scroll", function () {
    let currentScroll =
      window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll < lastScrollTop) {
      nav.style.display = "block";
    } else {
      nav.style.display = "none";
    }
    lastScrollTop = Math.max(0, currentScroll);
  });
}

// Slideshow
if (document.body.classList.contains("index-page")) {
  let slideIndex = 0;
  function showSlides() {
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");

    for (let slide of slides) slide.style.display = "none";
    slideIndex = slideIndex + 1 > slides.length ? 1 : slideIndex + 1;

    for (let dot of dots) dot.classList.remove("active");

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add("active");

    setTimeout(showSlides, 4000);
  }
  showSlides();
}

// Saving Item Functionality
function saveItem(title, description, imageUrl = "", tag = "") {
  let savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];
  const exists = savedItems.some((item) => item.title === title);

  if (!exists) {
    savedItems.push({ title, description, imageUrl, tag });
    localStorage.setItem("savedItems", JSON.stringify(savedItems));

    const itemCount = savedItems.length;
    alert(
      `"${title}" saved for later! You now have ${itemCount} item(s) in your "Save for Later" folder.`
    );
  } else {
    alert(`"${title}" is already in your saved list.`);
  }

  renderSavedItems(); // Ensuring the page is updated after saving an item
}

// Render Saved Items
function renderSavedItems() {
  let container = document.getElementById("saved-items-container");
  if (!container) return;

  const savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];
  container.innerHTML =
    savedItems.length === 0 ? "<p>No saved items yet.</p>" : "";

  savedItems.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "saved-card";
    itemDiv.style = `
      border: 1px solid #ccc;
      padding: 15px;
      margin: 10px auto;
      max-width: 600px;
      text-align: left;
    `;

    itemDiv.innerHTML = `
      <h2>${item.title}</h2>
      <p><strong>Tag:</strong> ${item.tag || "N/A"}</p>
      <p>${item.description}</p>
      ${
        item.imageUrl
          ? `<img src="${item.imageUrl}" alt="${item.title}" style="width:100%;max-height:200px;object-fit:cover;" />`
          : ""
      }
      <button class="remove-btn" onclick="removeItem('${
        item.title
      }')">Remove</button>
    `;
    container.appendChild(itemDiv);
  });
}

// Removing Item
function removeItem(title) {
  let savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];
  savedItems = savedItems.filter((item) => item.title !== title);
  localStorage.setItem("savedItems", JSON.stringify(savedItems));
  renderSavedItems(); // Re-rendering after removing the item
}

// Add General Comment Functionality
function addComment(commentText) {
  // Retrieve the comments stored in localStorage
  let comments = JSON.parse(localStorage.getItem("comments")) || [];

  // Add the new comment to the comments array
  comments.push(commentText);

  // Save the updated comments array to localStorage
  localStorage.setItem("comments", JSON.stringify(comments));

  // Re-render the comments after adding the new one
  renderComments();
}

// Render Comments
function renderComments() {
  let commentsContainer = document.getElementById("comments-list");
  if (!commentsContainer) return;

  // Retrieve the comments stored in localStorage
  let comments = JSON.parse(localStorage.getItem("comments")) || [];
  commentsContainer.innerHTML = ""; // Clearing previous comments

  // Render each comment
  comments.forEach((comment, index) => {
    const commentDiv = document.createElement("div");
    commentDiv.className = "comment";
    commentDiv.style = `
      border: 1px solid #ccc;
      padding: 10px;
      margin: 10px 0;
      background-color: #f9f9f9;
    `;
    commentDiv.innerHTML = `
      <p>${comment}</p>
      <p><small>Comment #${index + 1}</small></p>
    `;
    commentsContainer.appendChild(commentDiv);
  });
}

// Handle General Comment Form Submission
document
  .getElementById("comment-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from reloading the page

    const commentText = document.getElementById("comment-text").value.trim();
    if (!commentText) return; // If the comment is empty, do nothing

    addComment(commentText);

    // Clear the textarea after submission
    document.getElementById("comment-text").value = "";
  });

// Initialize Render on Page Load
document.addEventListener("DOMContentLoaded", () => {
  renderSavedItems(); // Ensuring saved items are displayed on page load
  renderComments(); // Ensuring comments are displayed on page load
});

// Likes
function likeEpisodes(event, episodeTitle) {
  event.preventDefault(); // Stops the form from reloading the page

  // Create a safe ID by replacing spaces and colons with dashes
  const safeId =
    "like-count-" + episodeTitle.replace(/\s+/g, "-").replace(/:/g, "");

  const likeCountElement = document.getElementById(safeId);

  // Get the current number of likes from the text (e.g., "3 Likes")
  let currentLikes = parseInt(likeCountElement.textContent) || 0;

  // Increase the like count by 1
  currentLikes++;

  // Update the text content
  likeCountElement.textContent = `${currentLikes} Like${
    currentLikes !== 1 ? "s" : ""
  }`;

  // Optional: Save likes in localStorage to remember them across page refreshes
  localStorage.setItem(safeId, currentLikes);
}

// When the page loads, restore previous like counts from localStorage
document.addEventListener("DOMContentLoaded", () => {
  const likeSpans = document.querySelectorAll("span[id^='like-count-']");

  likeSpans.forEach((span) => {
    const savedLikes = localStorage.getItem(span.id);
    if (savedLikes !== null) {
      span.textContent = `${savedLikes} Like${savedLikes !== "1" ? "s" : ""}`;
    }
  });
});

// Contact form
function handleContactForm(event) {
  event.preventDefault();

  let name = document.getElementById("name").value.trim();
  let subject = document.getElementById("subject").value.trim();
  let email = document.getElementById("email").value.trim();
  let message = document.getElementById("message").value.trim();

  document.getElementById(
    "contactResponse"
  ).textContent = `Thank you for contacting us, ${name}! We’ll get back to you shortly.`;

  //  Clearing the form
  document.getElementById("contactForm").reset();
}
// JQuery to handle Upcoming TV Series

$(document).ready(function () {
  // Animate upcoming series images when the page loads
  $(".upcoming-img").each(function (index) {
    $(this)
      .delay(500 * index) // Staggered animation (500ms delay between each)
      .fadeIn(1000) // Fade in smoothly
      .slideDown(800); // Then slide down a bit
  });

  // Chained effect function for fun
  function animateUpcomingImages() {
    $(".upcoming-img").each(function (index) {
      $(this)
        .delay(400 * index)
        .fadeOut(500)
        .fadeIn(1000)
        .slideUp(500)
        .slideDown(800);
    });
  }

  // OPTIONAL: trigger this chained animation after a few seconds automatically
  setTimeout(animateUpcomingImages, 4000);
});
