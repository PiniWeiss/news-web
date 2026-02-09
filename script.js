const main = document.querySelector("main");
const cardsArea = document.querySelector(".cardsArea");
const homeBtn = document.getElementById("home-btn")

homeBtn.addEventListener("click", ()=> {
    main.style.display = "block"
})


async function getNews() {
  try {
    const response = await fetch(
      "https://newsapi.org/v2/everything?q=apple&from=2026-02-08&to=2026-02-08&sortBy=popularity&apiKey=644935986fcd478eaa3aedd45453e017",
    );
    const data = await response.json();
    const articles = data.articles;
    return articles;
  } catch (error) {
    console.error(error);
  }
}


    async function createCards() {
        const arts = await getNews();
  arts.forEach((art) => {
      const newsCard = document.createElement("div");
      newsCard.classList.add("card");
      cardsArea.append(newsCard);
      const topCard = document.createElement("div");
      topCard.classList.add("top-card");
      newsCard.append(topCard);
      const newsImg = document.createElement("img");
      newsImg.classList.add("card-img");
      newsImg.src = art.urlToImage;
      topCard.append(newsImg);
      const textTop = document.createElement("div");
      textTop.classList.add("text-top-card");
      const author = document.createElement("p");
      author.classList.add("author");
      author.textContent = art.author;
      textTop.append(author);
      const title = document.createElement("h2");
      author.classList.add("title");
      title.textContent = art.title;
      textTop.append(title);
      topCard.append(textTop);
      const desc = document.createElement("h3");
      author.classList.add("desc");
      desc.textContent = art.description;
      newsCard.append(desc);
      
      newsCard.addEventListener("click", (e) => {
        main.style.display = "none"
        const newsPage = document.getElementsByClassName("news-page")
        newsPage.textContent = art.content

      });
    });
}


// function displayNewa() {
//     document.
// }


createCards();
