import Hero from '../components/Hero';
import Card from '../components/Card';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { cardProps } from '../types/index';
import Loading from '../components/Loading';

function Home() {
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

  const search = async (query: string) => {
    if (!query) return
    setLoading(true)
    setError(null)
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

  if (loading){
    return <Loading/>
  }
  if (error){
    return <div className='text-red-500'>Error occers {error}</div>
  }


  return (
    <>
      <Hero onSearch={search} />
      {searchResults.length > 0 ?(
      <>
        <h1 className='text-center dark:text-white bg-white dark:bg-slate-800'>{searchResults.length} Found</h1>
      </>
      ):(<></>)}
      <div className="grid grid-cols-2 md:flex md:flex-wrap items-center justify-center bg-white dark:bg-slate-800">
      {searchResults.length > 0 ?
      (
        searchResults.map((movie) => (
            <Card
                key={movie.id}
                title={movie.title || movie.name}
                overview={movie.overview}
                poster_path={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` :  "https://linkworld.us/article/img/no-image.png"}
              />
        ))
      ):(<></>)}
      </div>
      <div className="w-full bg-white dark:bg-slate-800 py-6">
        <div className="flex justify-start items-center text-3xl pl-8">
          <h3 className="font-bold text-slate-900 dark:text-white" id="movies">Movie Trends</h3>
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
      </div>
      <div className="w-full py-6 bg-white dark:bg-slate-800">
        <div className="flex justify-start items-center text-3xl pl-8">
          <h3 className="font-bold dark:text-white text-slate-900" id="tvseries">TV Series Trends</h3>
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
      </div>
    </>
  );
}

export default Home;
