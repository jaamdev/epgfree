import type { IGame } from '../types.ts'

type Props = {
  list: IGame[]
}

export default function GameList({ list }: Props) {

  if (list.length === 0) {
    return (
      <h3
        className='py-4 text-center text-xl font-semibold'
      >
        No hay juegos disponibles en este momento
      </h3>
    )
  }

  return <ul
    className='
      size-full m-auto p-2 max-w-6xl
      flex flex-col sm:flex-row flex-nowrap justify-center gap-2
    '
  >
    {list.map(({ titleGame, urlGame, urlImg, currentFree }) => (
      <a
        key={urlGame}
        href={urlGame}
        rel='noopener noreferrer nofollow external'
        target='_blank'
        className='size-full sm:max-w-80 group hover:scale-102 rounded-t-md overflow-hidden transition duration-300'
      >
        <h3 className={`w-full p-2 text-center uppercase tracking-wide font-semibold ${currentFree ? 'bg-primary' : 'bg-black'}`}>{currentFree ? 'gratis ahora' : 'próximamente'}</h3>
        <img alt={titleGame} src={urlImg} className='size-full object-fill' />
        <h2 className='
            w-full p-2 text-left text-xl font-semibold
          '>{titleGame}</h2>
      </a>
    ))}
  </ul>
}
