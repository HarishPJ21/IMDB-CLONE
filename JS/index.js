// title: https://www.omdbapi.com/?apikey=4e0d0187&t=rrr
// search: https://www.omdbapi.com/?apikey=4e0d0187&s=rrr

const movieSearchBar = document.getElementById('movie-search-bar');
const movieSearchList = document.getElementById('movie-search-list');
const movieResultList = document.getElementById('movie-result-list');
const movieFavoriteList = document.getElementById('movie-favorite-list');
const searchButton = document.querySelector('.search-button');

arrayList = [];
favArray=[];
let movieDetails={};
// assigning value fromm local storage

if(localStorage.getItem("array")!="[]"){
    // console.log("local")
    favArray = JSON.parse(localStorage.getItem("array"));
    addFavList(favArray);
}

// search the item from the array of results
const search=(array,searchID)=>{
    console.log(array," ",searchID);
    for(let j=0;j<array.length;j++){
        if(searchID == array[j].imdbID) return j;
    }
    return -1;
}

// Delete the item from the fav array 

delClick=(e)=>{
    console.log(e);
    const searchID=e.target.parentElement.parentElement.parentElement.parentElement.getAttribute("data-id")
            
    const i = search(favArray,searchID);
    // console.log(i);
    if(i!=-1){
        e.target.parentElement.parentElement.parentElement.parentElement.remove();
        this.favArray.splice(i,1);
        localStorage.setItem("array", JSON.stringify(favArray));
        console.log(this.favArray);
    }
    if(favArray.length==0) movieFavoriteList.innerHTML='<img src="https://cdn-icons-png.flaticon.com/512/9427/9427538.png " alt="">'
    e.stopPropagation();
}

//ading/removing class on hover
mouseOver=(e)=>e.classList.add("fa-solid");
mouseOut=(e)=>e.classList.remove("fa-solid");

//adding to favorite on click of favorite icon
favClick=(e)=>{

    let i=e.target.getAttribute("data-id")
    favArray.push(arrayList[i]);
    localStorage.setItem("array", JSON.stringify(favArray));
    addFavList(favArray);
    console.log(favArray);
    e.stopPropagation();
}


//fetch the list of movies from the name searched

async function MovieList(name) {
    const URL = `https://www.omdbapi.com/?apikey=4e0d0187&s=${name}`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    console.log(data);
    arrayList=data.Search;
    if (data.Response) SearchList(data.Search);
    // return data.Search;
}

//fetch the movie details from the id searched

async function MovieDetail(ImdbId) {
    const URL = `https://www.omdbapi.com/?apikey=4e0d0187&i=${ImdbId}`;
    const res = await fetch(`${URL}`);
    movieDetails = await res.json();
    localStorage.setItem('movieDetails',JSON.stringify(movieDetails));
    console.log("data:",movieDetails);
    window.location.href="movie.html";
    moviePage();
    // return data;
}
// MovieDetail('tt4244162')

//rendering the page with the search resutls
function SearchList(array) {
    movieSearchList.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
        let MovieListItem = document.createElement("div");
        MovieListItem.classList.add("card", "movie-search-list-item", "movie-details");
        MovieListItem.setAttribute("data-id", array[i].imdbID);
        MovieListItem.addEventListener("click", () => console.log(MovieDetail(arrayList[i].imdbID)));
        MovieListItem.innerHTML = `
        <div class="row no-gutters ">
        <div class="col-sm-3">
            <img class="card-img"
                src="${array[i].Poster}"
            >
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

//getting data from text typed and calling the movielist function
if(movieSearchBar!=undefined){
    movieSearchBar.addEventListener('keyup', () => {
        // const SearchTerm=movieSearchBar.value.trim();
        MovieList(movieSearchBar.value);
    })    
}

//rendering the dropdown below search bar with the word typed

    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        movieSearchList.innerHTML = '';
        movieResultList.innerHTML = '';
        console.log(e);
        let array = arrayList;
        for (let i = 0; i < array.length; i++) {
            let MovieListItem = document.createElement("div");
            MovieListItem.classList.add("g-col-4","space-align");
            MovieListItem.setAttribute("data-id", array[i].imdbID);
            MovieListItem.addEventListener("click", () => console.log(MovieDetail(arrayList[i].imdbID)));
            MovieListItem.innerHTML = `
            <div class="card movie-details bg-color" style="width: 15rem">
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

// rendering the add favorite part of the page    
function addFavList(array) {
    console.log(array);
    if(movieFavoriteList==undefined) return;
    movieFavoriteList.innerHTML='';
    for (let i = 0; i < array.length; i++) {
        let MovieListItem = document.createElement("div");
        MovieListItem.classList.add("card", "movie-details","space-align","bg-color");
        MovieListItem.setAttribute("data-id", array[i].imdbID);
        MovieListItem.addEventListener("click", () => console.log(MovieDetail(array[i].imdbID)));
        MovieListItem.innerHTML = `
        <div class="row no-gutters ">
            <div class="col-sm-5">
                <img class="card-img"
                src="${array[i].Poster}"
                >
            </div>
            <div class="col-sm-7">
                <div class="card-body">
                    <h5 class="card-title">${array[i].Title}</h5>
                    <p class="card-text">${array[i].Year}</p>
                    <i class="fa-regular fa-trash-can"                  
                    onmouseover=mouseOver(this)
                    onmouseout=mouseOut(this)
                    onclick=delClick(event)>
                    </i>
            </div>
        </div>
        `;
        movieFavoriteList.appendChild(MovieListItem);
    }
}
