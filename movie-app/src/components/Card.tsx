import { cardProps } from "../types"

const Card = ({title,name,
  overview,
  poster_path}: cardProps) => {
  return (
    <div className="relative max-w-[16rem] rounded-2xl overflow-hidden shadow-lg m-2 flex-none group">
      <img className="w-full" src={poster_path} alt={title || name} />
      <div className="absolute bottom-0 left-0 w-full bg-opacity-45 bg-black text-white px-6 py-4 transition-transform transform translate-y-full group-hover:translate-y-0">
        <div className="font-bold text-xl mb-2">{title || name}</div>
        <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity">
          {overview}
        </p>
      </div>
    </div>
  )
}

export default Card
