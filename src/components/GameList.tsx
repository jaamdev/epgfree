import type { IGame } from '../types.ts'

type Props = {
  list: IGame[]
}

export default function GameList({ list }: Props) {
  return <ul
    className='
      size-full m-auto px-2 py-1 max-w-6xl
      grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]
      justify-center items-center gap-2
    '
  >
    {list.map(({ titleGame, urlGame, urlImg, currentFree }) => (
      <a
        key={urlGame}
        href={urlGame}
        rel='noopener noreferrer nofollow external'
        target='_blank'
        className='
          size-full m-auto group hover:scale-102 rounded-md overflow-hidden
          transition duration-300
          flex flex-col flex-nowrap justify-center items-center
        '
      >
        <h3 className={`w-full px-1 py-2 m-auto text-center uppercase tracking-wide font-semibold ${currentFree ? 'bg-primary' : 'bg-black'}`}>{currentFree ? 'gratis ahora' : 'próximamente'}</h3>
        <img alt={titleGame} src={urlImg} className='size-full object-cover aspect-video' />
        <h2 className='
            w-full px-1 py-2 text-center bg-secondary
            group-hover:bg-primary text-xl font-semibold
            transition duration-300
          '>{titleGame}</h2>
      </a>
    ))}
  </ul>
}
