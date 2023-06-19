// title: https://www.omdbapi.com/?apikey=4e0d0187&t=rrr
// search: https://www.omdbapi.com/?apikey=4e0d0187&s=rrr

const movieSearchBar = document.getElementById('movie-search-bar');
const movieSearchList = document.getElementById('movie-search-list');
const movieResultList = document.getElementById('movie-result-list');
const movieFavoriteList = document.getElementById('movie-favorite-list');
const movieDetailPage = document.getElementById('movie-detail-page');
const searchButton = document.querySelector('.search-button');


async function MovieList(name){
    const URL=`https://www.omdbapi.com/?apikey=4e0d0187&s=${name}`;
    const res= await fetch(`${URL}`);
    const data= await res.json();
    console.log(data);
    if(data.Response) SearchList(data.Search);
}

async function MovieDetail(ImdbId){
    const URL=`https://www.omdbapi.com/?apikey=4e0d0187&i=${ImdbId}`;
    const res= await fetch(`${URL}`);
    const data= await res.json();
    console.log(data);
    return data;
}
function SearchList(array){
    movieSearchList.innerHTML='';
    for(let i=0;i<array.length;i++){
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

movieSearchBar.addEventListener('keyup',()=>{
    // const SearchTerm=movieSearchBar.value.trim();
    MovieList(movieSearchBar.value);
})
MovieList('rrr');
// MovieDetail("tt2631186");

searchButton.addEventListener('click',()=>{console.log('e')});


// searchButton.addEventListener('click',()=>{
//     for(let i=0;i<array.length;i++){
//         let MovieListItem = document.createElement("div");
//         MovieListItem.classList.add("cards-align", "col-sm-8 ");
//         MovieListItem.setAttribute("data-id", array[i].imdbID);
//         MovieListItem.addEventListener("click", () => console.log(array[i].imdbID));
//         MovieListItem.innerHTML = `
//         <div class="g-col-4 ">
//             <div class="card movie-details" style="width: 15rem">
//                 <img src="${array[i].Poster}"
//                     class="card-img-top" alt="..." />
//                 <div class="card-body">
//                     <h5 class="card-title">${array[i].Title}</h5>
//                     <p class="card-text">
//                         Some quick example text to build on the card title and make up
//                         the bulk of the card's content.
//                     </p>
//                 </div>
//                 <div class="card-body">
//                     <p class="card-link">${array[i].Year}</p>
//                     <a href="#" class="card-link">Another link</a>
//                 </div>
//             </div>
//         </div>
//         `;
//         movieResultList.appendChild(MovieListItem);
//     }
        
// })
