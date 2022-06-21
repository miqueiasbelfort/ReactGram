import "./EditProfile.css"

import {uploads} from "../../utils/config"

//Hooks 
import { useState, useEffect } from "react"
import {useSelector, useDispatch} from "react-redux"

// Redux
import {profile, resetMessage, updateProfile} from "../../slices/userSlice"

// Components
import Message from "../../components/Message"

const EditeProfile = () => {

  const dispatch = useDispatch()
  const {user, message, error, loading} = useSelector(state => state.user)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [profileImage, setProfileImage] = useState("")
  const [previewImage, setPreviewImage] = useState("")


  // load user data
  useEffect(() => {
    dispatch(profile())
  }, [dispatch])

  // Fill for with user data
  useEffect(() => {

    if(user){
      setName(user.name)
      setEmail(user.email)
      setBio(user.bio)
    }

  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Gether user satat from states
    const userData = {
      name
    }
    
    if(profileImage) {
      userData.profileImage = profileImage
    }
    if(bio) {
      userData.bio = bio
    }
    if(password){
      userData.password = password
    }

    // build form data
    const formData = new FormData()

    const userFormData = Object.keys(userData).forEach(key => formData.append(key, userData[key])) 


    formData.append("user", userFormData)
    await dispatch(updateProfile(formData))

    setTimeout(() => {
      dispatch(resetMessage())
    }, 2000)
  }

  const handleFile = (e) => {
    // image preview
    const image = e.target.files[0]
    setPreviewImage(image)
    setProfileImage(image) //update image state
  }

  return (
    <div id="edit-profile">
      <h2>Edite seu Perfil</h2>
      <p className="subtitle">Adicione uma Imagem de perfil e conte mais sobre você.</p>
      
      {/* Image Preview */}
      {(user.profileImage || previewImage) && (
        <img 
          src={
            previewImage 
              ? URL.createObjectURL(previewImage) 
              : `${uploads}/users/${user.profileImage}`
          } 
          alt={user.name} 
          className="profile-image"
        />
      )}

      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          placeholder="Nome"
          onChange={e => setName(e.target.value)}
          value={name || ""} 
        />
        <input 
          type="email"
          placeholder="E-mail"
          value={email || ""} 
          disabled
        />
        <label>
          <span>Imagem de Perfil:</span>
          <input type="file" onChange={handleFile}/>
        </label>
        <label>
          <span>Bio:</span>
          <input 
            type="text" 
            placeholder="Sua biografia."
            onChange={e => setBio(e.target.value)}
            value={bio || ""} 
          />
        </label>
        <label>
          <span>Deseja alterar a senha?</span>
          <input 
            type="password"
            placeholder="Digite sua nova senha"
            onChange={e => setPassword(e.target.value)}
            value={password || ""} 
          />
        </label>
        {!loading && <input type="submit" value="Editar"/> }
        {loading && <input type="submit" value="Aguarde..." disabled/>}
        {error && <Message msg={error} type="error"/>}
        {message && <Message msg={message} type="success"/>}
      </form>
    </div>
  )
}

export default EditeProfile
