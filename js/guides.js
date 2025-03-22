// Toggle navigation menu
document.querySelector('.hamburger').addEventListener('click', function () {
    const nav = document.querySelector('nav');
    if (window.innerWidth > 950){
        if(nav.classList.contains('show')){
            nav.classList.toggle('show');
            setTimeout(() => {
                nav.classList.toggle('invisible');
            }, 90);
        }else{
            nav.classList.toggle('invisible');
            setTimeout(() => {
                nav.classList.toggle('show');
            }, 1);
        }
    }else{
        if(nav.classList.contains('invisible')){
            nav.classList.toggle('invisible');
        };
        nav.classList.toggle('show');
    }
    
//    document.querySelector('.hamburger').style.display = 'none'; // Hide hamburger when nav is open
});

// Close navigation menu
document.querySelector('.close-btn').addEventListener('click', function () {
    const nav = document.querySelector('nav');
    nav.classList.toggle('show');
    document.querySelector('.hamburger').style.display = 'block'; // Show hamburger when nav is closed
});

// window resize
function handleResize() {
    const nav = document.querySelector('nav');

    if (window.innerWidth > 950) {
        if(!nav.classList.contains('show'))
        {
            nav.classList.toggle('show');
        }
    } else {
        // hamburger.style.display = 'block'; 
        // For smaller screens, ensure the hamburger button is visible if the navbar is hidden
        if (nav.classList.contains('show')) {
            nav.classList.toggle('show');
        }
    }
}
// Attach the resize event listener
window.addEventListener('resize', handleResize);
handleResize();

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
    // translateNavbar(lang);
    generateNavbar();
});

function generateNavbar() {
    const navList = document.querySelector("nav");
    navList.innerHTML = ""; // Clear previous items

    const language = localStorage.getItem("lang") || "en";
    // if (!translations[language]) return;

    translations[language].forEach(section => {
        // Add section title
        let sectionTitle = document.createElement("li");
        sectionTitle.classList.add("section-title");
        sectionTitle.textContent = section.title;
        navList.appendChild(sectionTitle);

        // Add chapters
        section.chapters.forEach(chapter => {
            let chapterItem = document.createElement("li");
            chapterItem.setAttribute("data-i18n", chapter.id);
            chapterItem.textContent = chapter.title;
            chapterItem.onclick = () => {
                window.location.hash = chapter.id;
                loadChapter(chapter.id);
            };
            navList.appendChild(chapterItem);
        });
    });
}
generateNavbar();

document.querySelectorAll('.idiom-option').forEach(option => {
    option.addEventListener('click', () => {
        generateNavbar();
    });
});