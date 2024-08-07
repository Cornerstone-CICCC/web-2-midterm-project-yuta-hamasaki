// src/App.tsx

import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Card from './components/Card';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { cardProps } from './types/index';

function App() {
  const [movies, setMovies] = useState<cardProps[]>([]);
  const [tvs, setTvs] = useState<cardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<cardProps[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:3001/home');
        setMovies(response.data.results);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch movies');
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const fetchTvs = async () => {
      try {
        const response = await axios.get('http://localhost:3001/tv');
        setTvs(response.data.results);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch TV series');
        setLoading(false);
      }
    };

    fetchTvs();
  }, []);

  const handleSearch = async (query: string) => {
    if (!query) return;
    
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('http://localhost:3001/search', {
        params: { q: query }
      });
      setSearchResults(response.data.results || []);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch search results');
      console.error(error)
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  const defaultImage = "https://linkworld.us/article/img/no-image.png";

  return (
    <>
      <Header />
      <Hero onSearch={handleSearch} />
      {searchResults.length > 0 ?(<>
        <h1 className='text-center'>{searchResults.length} Found</h1>
      </>):(<></>)}
      <div className="flex flex-wrap items-center justify-center">
      {searchResults.length > 0 ?
      (
        searchResults.map((movie) => (
            <Card
                key={movie.id}
                title={movie.title}
                overview={movie.overview}
                poster_path={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : defaultImage}
              />
            ))
            
          ) : (<></>)
      }
      </div>
      <div className="w-full bg-red-50 py-6">
        <div className="flex justify-start items-center text-3xl pl-8">
          <h3 className="font-bold">Movies</h3>
        </div>
        <div className="flex justify-start items-center my-3 overflow-x-auto">
            {movies.map((movie)=>(
              <Card
                key={movie.id}
                title={movie.title}
                overview={movie.overview}
                poster_path={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              />
            ))}
        </div>
        <div className="flex justify-center items-center pt-4 font-bold">
          <button className="bg-black py-2 px-4 rounded-full text-white">
            Discover more
          </button>
        </div>
      </div>
      <div className="w-full py-6">
        <div className="flex justify-start items-center text-3xl pl-8">
          <h3 className="font-bold">TV Series</h3>
        </div>
        <div className="flex justify-start items-center my-3 overflow-x-auto">
          {tvs.map((tv) => (
            <Card
              key={tv.id}
              title={tv.name}
              overview={tv.overview}
              poster_path={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`}
            />
          ))}
        </div>
        <div className="flex justify-center items-center pt-4">
          <button className="bg-black py-2 px-4 rounded-full text-white">
            Discover more
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
