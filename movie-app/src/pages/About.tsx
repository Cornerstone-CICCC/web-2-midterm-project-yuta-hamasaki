import {Link} from "react-router-dom"

const About = () => {
  return (
<div className="min-h-screen pt-28 bg-gradient-to-b from-navy-900 to-navy-700 dark:text-white text-black dark:bg-slate-600">
  <div className="max-w-2xl mx-auto text-center px-6">
    <h2 className="text-4xl font-bold mb-4">Discover What's Trending</h2>
    <p className="text-lg leading-relaxed mb-8">
      Welcome to YutaFlix, you can find the hottest movies and TV series trending this week. Explore our curated selection of the most popular titles and find your next favorite.
    </p>
    <div className="border-t border-gray-500 mt-8 pt-8">
      <h3 className="text-2xl font-semibold mb-2">What Can You Do Here?</h3>
      <ul className="text-lg space-y-2">
        <li>
          <strong>Trending Movies & TV Series:</strong> Get a quick overview of what's trending in the entertainment world. Updated weekly to bring you the latest hits.
        </li>
        <li>
          <strong>Search & Explore:</strong> Looking for something specific? Use our search feature to find any movie or TV series instantly.
        </li>
      </ul>
      <Link to="/"><button className="mt-7 rounded px-2 py-3 dark:bg-indigo-500 bg-black text-white ">Home page</button></Link>
    </div>
  </div>


</div>

  )
}

export default About
