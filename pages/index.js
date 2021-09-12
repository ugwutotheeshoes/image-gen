import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import { Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
// import Image from 'next/image'
import styles from '../styles/Home.module.css';


export default function Home() {
  const [pushedData, setPushedData] = useState()
  const [text, setText] = useState(false)
  const [avatarText, setAvatarText] = useState({
    firstInitial: '',
    secondInitial: ''
  })
  const [formData, setFormData] = useState({
      firstName: '',
      lastName: ''
    })
    
  const handleSubmit = (e) => {
    e.preventDefault();
    getInitials(formData)
    setPushedData(formData)
    setFormData({
      firstName : '',
      lastName: ''
    })
  }

  const getInitials = (e) => {
    const firstName = e.firstName.split('');
    const lastName = e.lastName.split('');
    console.log(firstName[0])
    setAvatarText({
      firstInitial: firstName[0],
      secondInitial: lastName[0]
    })
    setText(true)
    console.log(avatarText.secondInitial)
  }

  const handleChange = (e) =>{
    setFormData( {...formData, [e.target.name] : e.target.value})
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Avatar Generator</title>
      </Head>

      <main className={styles.main}>
      <form className={styles.form} >
        <h1 className={styles.title}>
          Avatar Generator
        </h1>
        <div className={styles.image}>
        <CloudinaryContext cloudName="ugwutotheeshoes">
                    <Image publicId="sample" alt="profile">
                    <Transformation width="150" height="150" gravity="face" effect="blur:200" radius="max" crop="thumb" />
                    <Transformation background="#C5E5FC" />
	                  <Transformation overlay={{fontFamily: "Arial", fontSize: 50, fontWeight: "bold", text: `${text ? avatarText.firstInitial : "A"}${text ? avatarText.secondInitial : "B"}`}} color="white" />
                    </Image>
                </CloudinaryContext>
        </div>

        <p className={styles.description}>
        {`${pushedData ? pushedData.firstName : ''}  ${ pushedData ? pushedData.lastName: ''}`}
        </p>

        <div className={styles.column}>
          <input 
          className={styles.input} 
          placeholder="First Name" 
          type='text'
          name="firstName"
          onChange={handleChange}
          value={formData.firstName}
          />

          <input 
          className={styles.input} 
          placeholder="Last Name" 
          type='text'
          name="lastName" 
          onChange={handleChange}
          value={formData.lastName}
            />

          <button 
          className={styles.button}
          type='submit'
          onClick={handleSubmit}
          >
            Add
          </button>
        </div>
        </form>
      </main>

    </div>
  )
}
