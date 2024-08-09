import { useState } from 'react';
import { CiSearch } from "react-icons/ci";

interface HeroProps {
  onSearch: (query: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <section className="relative bg-black h-[550px] w-full pt-10">
      <img
        src="https://images.unsplash.com/photo-1524622831584-3e26ee0d2516?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="img"
        className="object-cover h-full w-full absolute top-0 left-0 z-0"
      />
      <div className="relative flex justify-center items-center top-[200px] w-full text-white z-10 flex-col">
        <h2 className="text-6xl font-bold">YutaFlix</h2>
        <p>Discover What's Trending</p>
      </div>
      <div className="relative flex justify-center items-center h-full w-full z-10">
        <div className="flex w-3/4 max-w-lg bg-white rounded-3xl shadow-lg">
          <input
            className="w-full border-none bg-transparent px-4 py-1 text-gray-400 outline-none focus:outline-none"
            type="search"
            name="search"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="button"
            className="m-2 bg-black dark:bg-indigo-500 px-4 py-2 text-white rounded-3xl"
            onClick={handleSearch}
          >
            <CiSearch/>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
