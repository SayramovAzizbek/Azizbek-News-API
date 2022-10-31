const apiKey = "551552c7df5d430e9e59897e68d47365";
const newsForm = document.querySelector(".news-form");
const newsInput = document.querySelector(".news-input");
const newsBtn = document.querySelector(".news-btn");
const newsList = document.querySelector(".news-list");
const newsApiTemplate = document.querySelector(".newsApi-template").content;

const newsFragment = document.createDocumentFragment();
newsForm.addEventListener("keyup", (evt) => {
  evt.preventDefault();
  fetch(
    `https://newsapi.org/v2/everything?q=${newsInput.value}&from=2022-09-30&sortBy=publishedAt&apiKey=${apiKey}`
  )
    .then((res) => res.json())
    .then((data) => {
      data.articles.forEach((item) => {
        let cloneNewsApiTemplate = newsApiTemplate.cloneNode(true);
        cloneNewsApiTemplate.querySelector(".newsApi-item-link").href =
          item.url;
        cloneNewsApiTemplate.querySelector(".newsApi-img").src =
          item.urlToImage;
        cloneNewsApiTemplate.querySelector(".newsApi-item-title").textContent =
          item.title;
        cloneNewsApiTemplate.querySelector(".newsApi-item-text").textContent =
          item.source.name;
        cloneNewsApiTemplate.querySelector(
          ".news-author"
        ).textContent = `Author: ${item.author}`;
        cloneNewsApiTemplate.querySelector(
          ".newsApi-publish-time"
        ).textContent = `Published: ${item.publishedAt}`;
        newsFragment.appendChild(cloneNewsApiTemplate);
      });
      newsList.appendChild(newsFragment);
    })
    .catch((err) => console.log(err));
});
