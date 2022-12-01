import React, { useMemo } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { getHeroById } from '../helpers/getHeroById'
import { getHeroImgUrl } from '../helpers/getHeroImgUrl'

export const HeroPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const hero = useMemo(() => getHeroById(id), [id])

  if (!hero) return <Navigate to={'/marvel'} />

  const {
    superhero,
    publisher,
    alter_ego,
    first_appearance,
    characters
  } = hero

  const heroImgUrl = useMemo(() => getHeroImgUrl(id), [id])

  const handleNavigateBack = () => {
    navigate(publisher === 'DC Comics' ? '/dc' : '/marvel')
  }

  return (
    <div className="row mt-5">
      <div className="col-4">
        <img src={heroImgUrl} alt={superhero} className="img-thumbnail animate__animated animate__fadeInLeft" />
      </div>

      <div className='col-8'>
        <h3>{superhero}</h3>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'><b>Alter ego:</b> {alter_ego}</li>
          <li className='list-group-item'><b>Publisher:</b> {publisher}</li>
          <li className='list-group-item'><b>First appearance:</b> {first_appearance}</li>
        </ul>

        <h5 className='mt-3'>Characters</h5>
        <p>{characters}</p>

        <button className='btn btn-outline-primary' onClick={handleNavigateBack}>Go back</button>
      </div>
    </div>
  )
}
