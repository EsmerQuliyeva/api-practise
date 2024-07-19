const url = "api.json";
const title = document.getElementById("title");
const content = document.getElementById("content");
const cards = document.querySelector(".cards");
const postLists = document.querySelector(".post-lists");
const Addbtn = document.querySelector(".add-btn");

let output = "";
const getCards = (posts) => {
  posts.forEach((post) => {
    output += ` <div class="card" data-id=${post.id}>
               <h3 id="title-card">${post.title}</h3>
              <p>${post.date}</p>
              <p id="content-card">
              ${post.content}
              </p>
              <button id="edit-btn">Edit</button>
              <button id="del-btn">Delete</button>
            
              </div>`;
  });

  cards.innerHTML = output;
};

fetch(url)
  .then((res) => res.json())
  .then((data) => getCards(data));

Addbtn.addEventListener("click", (e) => {
  console.log("clicked");
  e.preventDefault();
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title.value,
      content: content.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const dataArr = [];
      dataArr.push(data);
      getCards(dataArr);
    });
});

postLists.addEventListener("click", (e) => {
  e.preventDefault();

  let delBtnPressed = e.target.id === "del-btn";
  let editBtnPressed = e.target.id === "edit-btn";
  let id = e.target.parentElement.dataset.id;
  if (delBtnPressed) {
    fetch(`${url}/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => location.reload());
  }

  if (editBtnPressed) {
    const parent = e.target.parentElement;
    const titleCard = parent.querySelector("#title-card");
    const bodyContent = parent.querySelector("#content-card");
    title.value = titleCard;
    content.value = bodyContent;

    Addbtn.addEventListener("click", (e) => {
      e.preventDefault();
      fetch(`${url}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.value,
          content: content.value,
        }),
      })
        .then((res) => res.json())
        .then(() => location.reload());
    });
  }
});
