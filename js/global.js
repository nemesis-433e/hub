// Toggle idiom dropdown on click
const idiomSelector = document.querySelector('.idiom-selector');
idiomSelector.addEventListener('click', function (event) {
    event.stopPropagation(); // Prevent the click from bubbling up
    const dropdown = this.querySelector('.idiom-dropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});
// Close the dropdown when clicking outside
document.addEventListener('click', function () {
    const dropdown = document.querySelector('.idiom-dropdown');
    dropdown.style.display = 'none';
});
// Handle idiom selection
document.querySelectorAll('.idiom-option').forEach(option => {
    option.addEventListener('click', () => {
        const lang = option.getAttribute('data-lang');
        document.querySelector('.idiom-selector').setAttribute('data-lang', lang);

        // Update the selected idiom flag
        const selectedFlag = document.querySelector('.selected-idiom img');
        selectedFlag.src = `../files/flags/${lang === 'en' ? 'en' : 'br'}.svg`;
        localStorage.setItem('lang', lang);
        
        changeLanguage(lang);
        // Reload the current chapter in the new language
        const chapter = window.location.hash.substring(1);
        if (chapter) {
            loadChapter(chapter);
        }
    });
});

function changeLanguage(lang) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });
}

// Toggle theme button icon
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Update the icon
    const icon = themeToggle.querySelector('i');
    icon.classList.toggle('fa-moon', newTheme === 'dark');
    icon.classList.toggle('fa-sun', newTheme === 'light');

});

// Set initial theme icon
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
const icon = themeToggle.querySelector('i');
icon.classList.toggle('fa-moon', savedTheme === 'dark');
icon.classList.toggle('fa-sun', savedTheme === 'light');

// Set initial language
const savedLang = localStorage.getItem('lang') || 'en';
document.querySelector('.idiom-selector').setAttribute('data-lang', savedLang);
document.querySelector('.selected-idiom img').src= `../files/flags/${savedLang === 'en' ? 'en' : 'br'}.svg`;
changeLanguage(savedLang);