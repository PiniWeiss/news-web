
let articlesList = [];


const main = document.querySelector("main");
const cardsArea = document.querySelector(".cardsArea");
const newsPage = document.querySelector(".news-page");
const createStoryPage = document.querySelector(".create-story-page"); 

const homeBtn = document.getElementById("home-btn");
const createStoryBtn = document.getElementById("create-story-btn");


function showView(viewName) {

    main.style.display = "none";
    newsPage.style.display = "none";
    createStoryPage.style.display = "none";

    if (viewName === 'home') {
        main.style.display = "block";
    } else if (viewName === 'article') {
        newsPage.style.display = "block";
    } else if (viewName === 'create') {
        createStoryPage.style.display = "block";
    }
}


async function fetchNews() {
    const API_KEY = "644935986fcd478eaa3aedd45453e017";
    const URL = `https://newsapi.org/v2/everything?q=apple&sortBy=popularity&apiKey=${API_KEY}`;
    
    try {
        const response = await fetch(URL);
        const data = await response.json();
        articlesList = data.articles;
        renderCards(articlesList);
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}


function renderCards(articles) {
    cardsArea.innerHTML = "";
    articles.forEach(art => {
        const card = createCardElement(art);
        cardsArea.appendChild(card);
    });
}


function createCardElement(art) {
    const newsCard = document.createElement("div");
    newsCard.classList.add("card");

    newsCard.innerHTML = `
        <div class="top-card">
            <img class="card-img" src="${art.urlToImage || 'https://via.placeholder.com/150'}" alt="news">
            <div class="text-top-card">
                <p class="author">${art.author || 'Anonymous'}</p>
                <h2 class="title">${art.title}</h2>
            </div>
        </div>
        <h3 class="desc">${art.description || ''}</h3>
    `;

    newsCard.addEventListener("click", () => renderFullArticle(art));
    return newsCard;
}


function renderFullArticle(art) {
    newsPage.innerHTML = `
        <h1>${art.title}</h1>
        <h3>${art.author}</h3>
        <img src="${art.urlToImage || 'https://via.placeholder.com/600x400'}"">
        <p class="content">${art.content || 'No content available.'}</p>
    `;
    showView('article');
}


function handleCreateStory(e) {
    e.preventDefault();
    
    
    const newArticle = {
        title: document.getElementById("input-title").value,
        author: document.getElementById("input-author").value,
        description: document.getElementById("input-desc").value,
        content: document.getElementById("input-content").value,
        urlToImage: document.getElementById("input-img").value || 'https://via.placeholder.com/150',
        publishedAt: new Date().toISOString()
    };

    
    articlesList.unshift(newArticle);
    
    
    renderCards(articlesList);
    showView('home');
    
    
    e.target.reset();
}



homeBtn.addEventListener("click", () => showView('home'));

createStoryBtn.addEventListener("click", () => {
   
    if (createStoryPage.innerHTML === "") {
        renderCreateForm();
    }
    showView('create');
});

function renderCreateForm() {
    createStoryPage.innerHTML = `
        <h2>Create New Story</h2>
        <form id="story-form">
            <input type="text" id="input-title" placeholder="Article Title" required>
            <input type="text" id="input-author" placeholder="Author Name">
            <input type="text" id="input-img" placeholder="Image URL">
            <textarea id="input-desc" placeholder="Short Description"></textarea>
            <textarea id="input-content" placeholder="Full Article Content" required></textarea>
            <button type="submit">Publish Story</button>
            <button type="button" onclick="showView('home')">Cancel</button>
        </form>
    `;
    
    document.getElementById("story-form").addEventListener("submit", handleCreateStory);
}


fetchNews();