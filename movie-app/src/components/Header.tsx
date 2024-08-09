import {useEffect, useState} from "react"
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(()=>{
    if(darkMode){
      document.documentElement.classList.add("dark")
    } else{
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const toggleMenu =()=>{
    setIsOpen(!isOpen)
  }
  return (
    <header className='w-full fixed py-4 flex row bg-white dark:bg-slate-800 shadow-xl justify-between z-40 md:px-16 px-5 dark:text-white text-slate-900'>
      <Link to ="/">
      <h2 className="font-bold pt-2 text-2xl text-red-500">YutaFlix</h2>
      </Link>
      <nav className="flex row space-x-6 dark:text-white">
        <ul className="md:flex row space-x-6 space-y-2 pt-2 dark:text-white hidden">
          <Link to="/about"><li>About</li></Link>
        </ul>

        <button onClick={()=>{
          setDarkMode(!darkMode)
        }}
        className="bg-black text-white py-1 px-2 md:py-2 md:px-3  hover:bg-stone-900 rounded dark:bg-indigo-500 text-sm">
          {darkMode ? "Light" : "Dark"} Mode
        </button>
        <div className="md:hidden p-1">
        <button onClick={toggleMenu} className="flex flex-col justify-center items-center z-50 pt-2">
          <span className={`block h-0.5 w-6 bg-black dark:bg-white transition-transform duration-300 ease-out ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`} />
          <span className={`block h-0.5 w-6 bg-black dark:bg-white transition-opacity duration-300 ease-out my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`block h-0.5 w-6 bg-black dark:bg-white transition-transform duration-300 ease-out ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`} />
        </button>
        {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-slate-800 shadow-md py-2">
          <nav className="flex flex-col items-center">
            <Link to="/about"><p className="py-2">About</p></Link>
          </nav>
        </div>
      )}
      </div>
      </nav>

    </header>
  )
}

export default Header
