const API_KEY = '9a95db2b7c8145f1bec90d8627168d1d';
const API_URL = 'https://api.rawg.io/api';
const platformImg = {
    4 : 'https://img.icons8.com/ios/50/windows8.png',
    PlayStation : 'https://img.icons8.com/ios/50/play-station.png',
    Xbox : 'https://img.icons8.com/ios/50/xbox.png',
    iOs : 'https://img.icons8.com/ios/50/ios-logo.png',
    Android : 'https://img.icons8.com/ios/50/android-os.png',
    'Apple Macintosh': 'https://img.icons8.com/ios/50/mac-os--v1.png',
    Linux : 'https://img.icons8.com/ios/50/mac-logo.png',
    Nintendo : 'https://img.icons8.com/ios/50/nintendo.png',
    Atari : 'https://img.icons8.com/external-those-icons-lineal-those-icons/24/external-Atari-geek-those-icons-lineal-those-icons.png',
    Commodore : 'https://img.icons8.com/color/48/000000/commodore-amiga.png',
    SEGA : 'https://img.icons8.com/external-tal-revivo-bold-tal-revivo/24/external-sega-a-japanese-multinational-video-game-developer-and-publisher-company-logo-bold-tal-revivo.png',
    Web: 'https://img.icons8.com/wired/64/domain.png'
}

const platformList = {
    4 : 'PC',
    187 : 'PlayStation',
    18 : 'PlayStation',
    1 : 'Xbox',
    186 : 'Xbox',
    7 : 'Nintendo',
    3 : 'iOS',
    21 : 'Android',
    8 : 'Nintendo',
    9 : 'Nintendo',
    13 : 'Nintendo',
    5 : 'macOS',
    6 : 'Linux',
    14 : 'Xbox',
    80 : 'Xbox',
    16 : 'PlayStation',
    15 : 'PlayStation',
    27 : 'PlayStation',
    19 : 'PS',
    17 : 'PSP',
    10 : 'Wii',
    11 : 'Wii',
    105 : 'GameCube',
    83 : 'Nintendo',
    24 : 'Game',
    43 : 'Game',
    26 : 'Game',
    79 : 'SNES',
    49 : 'NES',
    55 : 'Classic',
    41 : 'Apple',
    166 : 'Commodore',
    28 : 'Atari',
    31 : 'Atari',
    23 : 'Atari',
    22 : 'Atari',
    25 : 'Atari',
    34 : 'Atari',
    46 : 'Atari',
    50 : 'Atari',
    167 : 'Genesis',
    107 : 'https://img.icons8.com/external-tal-revivo-bold-tal-revivo/24/external-sega-a-japanese-multinational-video-game-developer-and-publisher-company-logo-bold-tal-revivo.png',
    119 : 'https://img.icons8.com/external-tal-revivo-bold-tal-revivo/24/external-sega-a-japanese-multinational-video-game-developer-and-publisher-company-logo-bold-tal-revivo.png',
    117 : 'https://img.icons8.com/external-tal-revivo-bold-tal-revivo/24/external-sega-a-japanese-multinational-video-game-developer-and-publisher-company-logo-bold-tal-revivo.png',
    74 : 'https://img.icons8.com/external-tal-revivo-bold-tal-revivo/24/external-sega-a-japanese-multinational-video-game-developer-and-publisher-company-logo-bold-tal-revivo.png',
    106 : 'Dreamcast',
    111 : '3DO',
    112 : 'Jaguar',
    77 : 'Game Gear',
    12 : 'Neo Geo',
}

let elPlatformSelect = document.querySelector('.platform-select')
let elSwitch = document.querySelector('.switch')
let genreTemplate = document.querySelector('.genre-template').content
let gameTemplate = document.querySelector('.game-template').content
let elGenreList = document.querySelector('.genre-list')
let elGameList = document.querySelector('.game-list')
let genreFragment = new DocumentFragment()
let platformFragment = new DocumentFragment()

elSwitch.addEventListener('change', evt => {
    evt.preventDefault()
    
    let elBody = document.querySelector('.be-dark')
    elBody.classList.toggle('dark-mode')
})

const renderGenre = data => {
    data.forEach(genre => {
        let newLi = genreTemplate.cloneNode(true)
        
        newLi.querySelector('.genre-img').src = genre.image_background
        newLi.querySelector('.genre-name').textContent = genre.name ? genre.name : genre.slug
        genreFragment.appendChild(newLi)
    });
    elGenreList.appendChild(genreFragment)
} 

const getGenres = async () => {
    const res = await fetch(`${API_URL}/genres?key=${API_KEY}`)
    const data = await res.json()
    renderGenre(data.results)
}

getGenres()

const renderPlatforms = data => {
    data.forEach(game => {
        let newOp = document.createElement('option')
        newOp.textContent = game.name
        newOp.value = game.id
        
        platformFragment.appendChild(newOp)
    })
    elPlatformSelect.appendChild(platformFragment)
}

const getPlatforms = async () => {
    const res = await fetch(`${API_URL}/platforms?key=${API_KEY}`)
    const data = await res.json()
    renderPlatforms(data.results);
}

getPlatforms()

document.addEventListener("DOMContentLoaded", function() {
    let contentContainer = document.getElementById('content-container');
    let loader = document.getElementById('loader');
    let isLoading = false;
    let page = 1;
    
    function loadMoreContent() {
        if (isLoading) return;
        
        isLoading = true;
        loader.style.display = 'block';
        
        // Simulate an API call to fetch more content
        setTimeout(() => {
            fetch(`${API_URL}/games?key=${API_KEY}&page=${page}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok ' + res.statusText);
                }
                return res.json();
            })
            .then(data => {
                const gameFragment = document.createDocumentFragment(); // Ensure gameFragment is defined here
                data.results.forEach(game => {
                    let newLi = gameTemplate.cloneNode(true);
                    
                    newLi.querySelector('.game-img').src = game.background_image;
                    newLi.querySelector('.game-name').textContent = game.name;
                    game.parent_platforms.slice(0,3).forEach(platform => {
                        newLi.querySelector('.game-platforms').innerHTML += `<p cllass="mx-2">${platform.platform.name}</p>`
                    })
                    gameFragment.appendChild(newLi);
                });
                elGameList.appendChild(gameFragment);
                const lastElement = elGameList.querySelector('.game-card:last-child'); // Corrected selector
                if (lastElement) {
                    infinite.observe(lastElement); // Observe the new last element
                }
            })
            
            loader.style.display = 'none';
            isLoading = false;
            page++;
        }, 1000);
    }
    
    function handleScroll() {
        let windowHeight = window.innerHeight;
        let bodyHeight = document.body.offsetHeight;
        let scrollTop = window.scrollY;
        let scrollBottom = scrollTop + windowHeight;
        
        if (scrollBottom >= bodyHeight - 100) { // Adjust threshold as needed
            loadMoreContent();
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Load initial content
    loadMoreContent();
});
