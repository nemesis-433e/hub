// Toggle navigation menu
document.querySelector('.hamburger').addEventListener('click', function () {
    const nav = document.querySelector('nav');
    nav.classList.toggle('show');
//    document.querySelector('.hamburger').style.display = 'none'; // Hide hamburger when nav is open
});

// Close navigation menu
document.querySelector('.close-btn').addEventListener('click', function () {
    const nav = document.querySelector('nav');
    nav.classList.toggle('show');
    document.querySelector('.hamburger').style.display = 'block'; // Show hamburger when nav is closed
});

// Handle window resize
function handleResize() {
    const nav = document.querySelector('nav');
    const hamburger = document.querySelector('.hamburger');

    if (window.innerWidth > 768) {
        // For larger screens, ensure the navbar is visible and the hamburger is hidden
        nav.classList.toggle('show'); // Remove the 'show' class if it exists
       // nav.style.transform = 'translateX(0)'; // Reset transform 
        hamburger.style.display = 'none'; // Hide the hamburger button
    } else {
        hamburger.style.display = 'block'; // Hide the hamburger button
        // For smaller screens, ensure the hamburger button is visible if the navbar is hidden
        if (nav.classList.contains('show')) {
            nav.classList.toggle('show'); // Remove the 'show' class if it exists
            
        }
    }
}

// Attach the resize event listener
window.addEventListener('resize', handleResize);

// Call handleResize on initial load to set the correct state
handleResize();

// Translation dictionary for navbar items

// Function to translate the navbar
function translateNavbar(lang) {
    const navItems = document.querySelectorAll("nav ul li[data-key]");
    navItems.forEach((item) => {
        const key = item.getAttribute("data-key");
        item.textContent = translations[lang][key] || key; // Fallback to the key if translation is missing
    });
}

// Load chapter based on language and chapter name
function loadChapter(chapter) {
    if (window.innerWidth < 768 && document.querySelector('nav').classList.contains('show')) {
        document.querySelector('nav').classList.toggle('show');
    }
    const lang = document.querySelector('.idiom-selector').getAttribute('data-lang') || 'en';
    fetch(`chapters/${lang}/${chapter}.html`)
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = data;
            window.location.hash = chapter; // Update URL hash

            // If screen width is less than 768px, toggle navigation
        })
        .catch(error => {
            document.getElementById('content').innerHTML = "<h1 style='color:red'>Error</h1><p>UNDER CONSTRUCTION</p>";
        });

}


// Load chapter based on URL hash when the page loads
window.addEventListener('load', () => {
    let chapter = window.location.hash.substring(1); // Remove the '#' from the hash
    if (!chapter) {
        chapter = 'intro'; // Default to 'intro' if no chapter is found
    }
    loadChapter(chapter);

    // Translate navbar based on the selected language
    const lang = document.querySelector('.idiom-selector').getAttribute('data-lang') || 'en';
    translateNavbar(lang);
});
