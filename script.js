var gifLinks = [
  "./gif/1152147517169814440.gif",
  "./gif/1152147517169814442.gif",
  "./gif/1152147517169814445.gif",
  "./gif/1152147517169814449.gif",
  "./gif/1152147517169814451.gif",
  "./gif/1152147517169814454.gif",
  "./gif/1152147517169814456.gif",
  "./gif/1152147517169814458.gif",
  "./gif/1152147517169814459.gif",
  "./gif/1152147517169814460.gif",
  "./gif/1152147517169814461.gif",
  "./gif/1152147517169814462.gif",
  "./gif/1152147517169814467.gif",
  "./gif/1152147517169814469.gif",
  "./gif/1152147517169814471.gif",
  "./gif/1152147517169814473.gif",
  "./gif/1152147517169814474.gif",
  "./gif/1152147517169814477.gif",
  "./gif/1152147517169814482.gif",
  "./gif/1152147517169814487.gif",
  "./gif/1152147517169814489.gif",
  "./gif/1152147517169814491.gif",
  "./gif/1152147517169814493.gif",
  "./gif/1152147517169814505.gif",
  "./gif/1152147517169814508.gif",
  "./gif/1152147517169814510.gif",
  "./gif/1152147517169814511.gif",
  "./gif/1152147517169814513.gif",
  "./gif/1152147517169814516.gif",
  "./gif/1152147517169814520.gif",
  "./gif/1152147517169814522.gif",
  "./gif/1152147517169814529.gif",
  "./gif/1152147517169814533.gif",
  "./gif/1152147517169814535.gif",
  "./gif/1152147517169814541.gif",
  "./gif/1152147517169814543.gif",
  "./gif/1152147517169814544.gif",
  "./gif/1152147517169814548.gif",
  "./gif/1152147517169814550.gif",
  "./gif/1152147517169814552.gif",
  "./gif/1152147517169814896.gif",
  "./gif/1152147517169814898.gif",
  "./gif/1152147517169814899.gif",
  "./gif/1152839429392847293.gif"
];

function setRandomGif() {
  var randomGif = gifLinks[Math.floor(Math.random() * gifLinks.length)];
  document.getElementById('gif-background').style.backgroundImage = 'url(' + randomGif + ')';
}

window.onload = setRandomGif;
function searchForMovies() {
  var searchText = document.getElementById('search-input').value.trim();
  if (searchText length > 0) {
    var url = 'https://api.themoviedb.org/3/search/multi?api_key=e6cd252a87b876cd536ccfd719f4483f&query=' + encodeURIComponent(searchText);
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        var movieContainer = document.getElementById('movie-container');
        movieContainer.innerHTML = '';
        if (data.results.length > 0) {
          data.results.forEach(function(movie) {
            var movieItem = createMovieItem(movie);
            movieContainer.appendChild(movieItem);
          });
        } else {
          movieContainer.innerHTML = '<h2>No movies or shows found.</h2>';
        }
      })
      .catch(function() {
        document.getElementById('movie-container').innerHTML = '<h2>Error fetching movies or shows.</h2>';
      });
  }
}

document.getElementById('search-button').addEventListener('click', searchForMovies);

function createMovieItem(movie) {
  var movieItem = document.createElement('div');
  movieItem.classList.add('movie-item');
  var title = movie.title || movie.name;
  movieItem.innerHTML = '<h3>' + title + '</h3>';
  return movieItem;
}
