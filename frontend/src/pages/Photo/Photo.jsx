import "./Photo.css"

import { uploads } from "../../utils/config"

// Components 
import Message from "../../components/Message"
import { Link, useParams } from "react-router-dom"
import PhotoItem from "../../components/PhotoItem"
import LikeContainer from "../../components/LikeContainer"


// Hooks
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

// Redux
import { getPhoto, like } from "../../slices/photoSlice"

const Photo = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)
    const {photo, loading, error, message} = useSelector(state => state.photo)

    // comentários

    //Load photo data
    useEffect(() => {
        dispatch(getPhoto(id))
    }, [dispatch, id])

    // Like and comments
    const handleLike = () => {
      dispatch(like(photo._id))
    }

    if(loading){
        return <p>Carregando...</p>
    }

  return (
    <div id="photo">
      <PhotoItem photo={photo}/>
      <LikeContainer photo={photo} user={user} handleLike={handleLike}/>
    </div>
  )
}

export default Photo
