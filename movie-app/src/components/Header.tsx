

const Header = () => {
  return (
    <header className='w-full fixed py-4 flex row bg-slate-200 justify-between z-40 px-16'>
      <h2>LOGO</h2>
      <nav>
        <ul className="flex row space-x-6">
          <li>Movies</li>
          <li>TV series</li>
          <li>About</li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
