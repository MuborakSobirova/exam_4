const elsearchForm = document.querySelector(".header-form");
const elSearchInput = document.querySelector(".search-input");
const elResult = document.querySelector(".result")
const elBookmarkList = document.querySelector(".bookmark-list")

const token = localStorage.getItem("token");
if (!token) {
  window.location.replace("./login.html");
}
function LogOut() {
  localStorage.removeItem("token");
  window.location.replace("./login.html");
}

const BOOKS_URL = `https://www.googleapis.com/books/v1/volumes?q=search+terms`;

let books = [];

const RenderBooks = (data) => {

    elResult.innerHTML += data.length

 for(let i of data){
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
          <div class="card-img">
              <img src="${i.volumeInfo.imageLinks.smallThumbnail}" alt="img">
          </div>
          <div>
              <h3 class="item-title">${i.volumeInfo.title}</h3>
              <p class="item-subtitle">${i.volumeInfo.authors?i.volumeInfo.authors: "Peter-Kent"}</p>
              <p class="item-subtitle">${i.volumeInfo.publishedDate?i.volumeInfo.publishedDate: 1998}</p>
          </div>
          <div class="card-btns">
          <button class="bookmark-btn" onclick=BookMark("${i.id}")>Bookmark</button>
          <button class="maore-info-btn">More info</button>
          <button class="read-btn" onclick="Read()">Read</button>
          </div>
          `;
    document.querySelector(".cards").append(card);
 }
}

function renderData(data){
    return (books = data.items)
}

let bookMarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

function BookMark(id){
    let bookedBook = books.find((book) => book.id == id);
    if(!bookMarks.includes(bookedBook)){
        bookMarks.push(bookedBook);
    }

    localStorage.setItem("bookmaks", JSON.stringify(bookMarks));
    bookMarks = [...JSON.parse(localStorage.getItem("bookmarks"))];

    RenderBookMarks(bookMarks)
}

RenderBookMarks(bookMarks)

function RenderBookMarks(item){
    console.log(item);
    let res = "";
    for(let i of item){
    res += `
    <li class="item">
    <div>
    <h3 class="item-title">${i.volumeInfo.title}</h3>
    <p class="item-subtitle">${i.volumeInfo.authors}</p>
</div>
    <div class="btns">
        <button class="read-book" onclick="Read()"></button>
        <button class="delete-book" onclick="Del()"></button>
    </div>
    </li>
    `;  
}
    elBookmarkList.innerHTML = res;
}


elsearchForm.addEventListener("submit", (e) => {

e.preventDefault()

InputVal = elSearchInput.value.trim();

searchedBooks = books.forEach((book) => {
    regex = new RegExp (InputVal, "gi")
    if(book.volumeInfo.title.match(regex) ){
        console.log(book);
    }        
})

})


const getItem = () => {
    const options = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    };
  
    fetch(BOOKS_URL, options)
      .then((response) => response.json())
      .then((response) => {
        RenderBooks(response.items);
        renderData(response);
      })
      .catch((err) => console.error(err));
  };
  
  getItem()