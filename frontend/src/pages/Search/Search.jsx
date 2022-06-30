import './Search.css'

// hooks
import { useEffect } from 'react'
import {useSelector, useDispatch} from "react-redux"
import {useResetComponentMessage} from "../../hooks/useResetComponentMessage"
import { useQuery } from '../../hooks/useQuery'

// Components
import LikeContainer from "../../components/LikeContainer"
import PhotoItem from "../../components/PhotoItem"
import { Link } from 'react-router-dom'

// redux
import { searchPhotos, like } from '../../slices/photoSlice'



const Search = () => {
  const query = useQuery()
  const search = query.get("q") // Pegando tudo o que vem depois do q

  const dispatch = useDispatch()
  const resetMessage = useResetComponentMessage(dispatch)

  const {user} = useSelector(state => state.auth)
  const {photos, loading} = useSelector(state => state.photo)

  // Load photos
  useEffect(() => {
    dispatch(searchPhotos(search))
  }, [dispatch])

  // Like a photo
  const handleLink = (photo = null) => {
    dispatch(like(photo._id))
    resetMessage()
  }
  if(loading){
    return <p>Carregando...</p>
  }

  return (
    <div id="search">
      <h2>Você está buscando por: {search}</h2>
      {photos && photos.map(photo => (
         <div key={photo._id}>
          <PhotoItem photo={photo}/>
          <LikeContainer photo={photo} user={user} handleLink={handleLink}/>
          <Link className="btn" to={`/photos/${photo._id}`}>Ver Mais</Link>
        </div>
      ))}
      {photos && photos.length === 0 && (
        <h2 className="no-photos">
          Não foi encontrado os resutados para sua busca!
        </h2>
      )}
    </div>
  )
}

export default Search
