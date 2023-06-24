// title: https://www.omdbapi.com/?apikey=4e0d0187&t=rrr
// search: https://www.omdbapi.com/?apikey=4e0d0187&s=rrr

const movieSearchBar = document.getElementById('movie-search-bar');
const movieSearchList = document.getElementById('movie-search-list');
const movieResultList = document.getElementById('movie-result-list');
const movieFavoriteList = document.getElementById('movie-favorite-list');
const movieDetailPage = document.getElementById('movie-detail-page');
const searchButton = document.querySelector('.search-button');
arrayList = [];
favArray=[];
if(localStorage.getItem("array")!="[]"){
    console.log("local")
    favArray = JSON.parse(localStorage.getItem("array"));
    addFavList(favArray);
    // window.location.href="movie.html";
}
const search=(array,searchID)=>{
    console.log(array," ",searchID);
    for(let j=0;j<array.length;j++){
        if(searchID == array[j].imdbID) return j;
    }
    return -1;
}
delClick=(e)=>{
    // console.log(e);
    const searchID=e.parentElement.parentElement.parentElement.parentElement.getAttribute("data-id")
            
    const i = search(favArray,searchID);
    // console.log(i);
    if(i!=-1){
        e.parentElement.parentElement.parentElement.parentElement.remove();
        this.favArray.splice(i,1);
        localStorage.setItem("array", JSON.stringify(favArray));
        console.log(this.favArray);
    }
}
mouseOver=(e)=>e.classList.add("fa-solid");
mouseOut=(e)=>e.classList.remove("fa-solid");
favClick=(e)=>{

    let i=e.target.getAttribute("data-id")
    favArray.push(arrayList[i]);
    let MovieListItem = document.createElement("div");
    MovieListItem.classList.add("card", "movie-details");
    MovieListItem.setAttribute("data-id", arrayList[i].imdbID);
    MovieListItem.addEventListener("click", () => console.log(arrayList[i].imdbID));
    MovieListItem.innerHTML = `
    <div class="row no-gutters ">
        <div class="col-sm-5">
            <img class="card-img"
            src="${arrayList[i].Poster}"
            alt="Suresh Dasari Card">
        </div>
        <div class="col-sm-7">
            <div class="card-body">
                <h5 class="card-title">${arrayList[i].Title}</h5>
                <p class="card-text">${arrayList[i].Year}</p>
                <i class="fa-regular fa-trash-can"                  
                onmouseover=mouseOver(this)
                onmouseout=mouseOut(this)
                onclick=delClick(this)>
                </i>
            </div>
        </div>
    </div>
    `;
    movieFavoriteList.appendChild(MovieListItem);

    localStorage.setItem("array", JSON.stringify(favArray));
    console.log(favArray);
    e.stopPropagation();
    // e.e.stopPropogation(); 
}



async function MovieList(name) {
    const URL = `https://www.omdbapi.com/?apikey=4e0d0187&s=${name}`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    console.log(data);
    arrayList=data.Search;
    if (data.Response) SearchList(data.Search);
    // return data.Search;
}

async function MovieDetail(ImdbId) {
    const URL = `https://www.omdbapi.com/?apikey=4e0d0187&i=${ImdbId}`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    console.log(data);
    return data;
}

function SearchList(array) {
    movieSearchList.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
        let MovieListItem = document.createElement("div");
        MovieListItem.classList.add("card", "movie-search-list-item", "movie-details");
        MovieListItem.setAttribute("data-id", array[i].imdbID);
        MovieListItem.addEventListener("click", () => console.log(array[i].imdbID));
        MovieListItem.innerHTML = `
        <div class="row no-gutters ">
        <div class="col-sm-3">
            <img class="card-img"
                src="${array[i].Poster}"
                alt="Suresh Dasari Card">
        </div>
        <div class="col-sm-9">
            <div class="card-body">
                <h5 class="card-title">${array[i].Title}</h5>
                    <p class="card-text">${array[i].Year}</p>
                </div>
            </div>
        </div>
        `;
        movieSearchList.appendChild(MovieListItem);
    }
}

movieSearchBar.addEventListener('keyup', () => {
    // const SearchTerm=movieSearchBar.value.trim();
    MovieList(movieSearchBar.value);
})
MovieList('rrr');
// MovieDetail("tt2631186");

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    movieSearchList.innerHTML = '';
    movieResultList.innerHTML = '';
    console.log(e);
    let array = arrayList;
    for (let i = 0; i < array.length; i++) {
        let MovieListItem = document.createElement("div");
        MovieListItem.classList.add("g-col-4");
        MovieListItem.setAttribute("data-id", array[i].imdbID);
        MovieListItem.addEventListener("click", () => console.log(array[i].imdbID));
        MovieListItem.innerHTML = `
        <div class="card movie-details" style="width: 15rem">
            <img class="card-img-top"
            src="${array[i].Poster}"
            />
            <div class="card-body">
                <h5 class="card-title">${array[i].Title}</h5>
            </div>
            <div class="card-body">
                <p >${array[i].Year}</p>
                <i class="fa-regular fa-heart" 
                data-id="${i}"
                onmouseover=mouseOver(this)
                onmouseout=mouseOut(this)
                onclick=favClick(event)
                style="color: #e7390d;"></i>
            </div>
        </div>
`;
        movieResultList.appendChild(MovieListItem);
    }
});

function addFavList(array) {
    console.log(array);
    movieFavoriteList.innerHTML='';
    for (let i = 0; i < array.length; i++) {
        let MovieListItem = document.createElement("div");
        MovieListItem.classList.add("card", "movie-details");
        MovieListItem.setAttribute("data-id", array[i].imdbID);
        MovieListItem.addEventListener("click", () => console.log(array[i].imdbID));
        MovieListItem.innerHTML = `
        <div class="row no-gutters ">
            <div class="col-sm-5">
                <img class="card-img"
                src="${array[i].Poster}"
                alt="Suresh Dasari Card">
            </div>
            <div class="col-sm-7">
                <div class="card-body">
                    <h5 class="card-title">${array[i].Title}</h5>
                    <p class="card-text">${array[i].Year}</p>
                    <i class="fa-regular fa-trash-can"                  
                    onmouseover=mouseOver(this)
                    onmouseout=mouseOut(this)
                    onclick=delClick(this)>
                    </i>
            </div>
        </div>
        `;
        movieFavoriteList.appendChild(MovieListItem);
    }
}
function moviePage(array) {
    movieDetailPage.innerHTML = '';
    // for (let i = 0; i < array.length; i++) {
        let MovieListItem = document.createElement("div");
        MovieListItem.classList.add("container");
        // MovieListItem.setAttribute("data-id", array[i].imdbID);
        // MovieListItem.addEventListener("click", () => console.log(array[i].imdbID));
        MovieListItem.innerHTML = `
        <div class="col-sm-5">
            <img
            class="card-img"
            src="${array[i].Poster}"
            alt="Suresh Dasari Card"
            />
        </div>
        <div class="col-sm-7">
            <div class="card-body">
            <h5 class="card-title">${array[i].Title}</h5>
            <p class="card-text">${array[i].Year}</p>
            </div>
        </div>
        `;
        movieDetailPage.appendChild(MovieListItem);
    // }
}
