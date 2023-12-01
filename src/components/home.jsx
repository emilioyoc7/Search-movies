import { useState, useEffect } from 'react';
import './home.css';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.tvmaze.com/shows?page=1');
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }

        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const goBackToList = () => {
    setSelectedMovie(null);
  };

  return (
    <div>
      {selectedMovie ? (
        <div>
          <button onClick={goBackToList}>Volver a la lista</button>
          <h1>{selectedMovie.name}</h1>
          <div className='box-movie'>
            <img
            className="imagen-con-efecto"
            src={selectedMovie.image.medium} 
            alt={`Imagen de ${selectedMovie.name}`}
            />
            <p>{selectedMovie.summary}</p>
          </div>
        </div>
      ) : (
        <div>
          <h1>Lista de Películas</h1>
          <div className="movie-grid">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="movie-item"
                onClick={() => handleMovieClick(movie)}
              >
                <img
                  className="imagen-con-efecto"
                  src={movie.image.medium}
                  alt={`Imagen de ${movie.name}`}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieList;
