
import { useState, useEffect } from 'react';
import './home.css';
import './input.css';

const Input = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchTerm.trim() === '') {
          setMovies([]);
          return;
        }

        const response = await fetch(`https://api.tvmaze.com/singlesearch/shows?q=${searchTerm}`);
        
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }

        const data = await response.json();
        setMovies([data]);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [searchTerm]); 

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
        <h1 className='centro'>IMBD</h1>
        <form className='centro' onSubmit={handleSubmit}>
          <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Buscar películas..."
          />
        </form>
        <div className="movie-grid">
          {movies.map(movie => (
            <div key={movie.id} className="movie-item imagen-con-efecto" onClick={() => handleMovieClick(movie)}>
              <img src={movie.image.medium} alt={`Imagen de ${movie.name}`} />
            </div>
          ))}
        </div>
      </div>
        )}
    </div>
  );
};

export default Input;
