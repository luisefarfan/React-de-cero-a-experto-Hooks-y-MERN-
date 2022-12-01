import React, { useMemo } from 'react'
import { getHeroesByPublisher } from '../helpers/getHeroesByPublisher'
import { HeroCard } from './HeroCard'

export const HeroList = ({ publisher }) => {
  // Mini optimizacion, porque los resultados seran los mismos, pero la posicion en memoria de la funcion
  // cambiara
  const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher])

  return (
    <div className='row'>
      {heroes.map((hero) => (
        <div className='col-md-3 col-12 mb-md-0 mb-3' key={hero.id}>
          <HeroCard {...hero} />
        </div>
      ))}
    </div>
  )
}
