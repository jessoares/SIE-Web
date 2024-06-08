import express from 'express'

import { getMedia, getMedias, createMedia } from './database.js'

const app = express()

app.use(express.static("public"))

app.get("/media", async (req,res)=>{
   const medias = await getMedias()
    res.send(medias)
})

app.get("/media/:id", async (req,res)=>{
  const id = req.params.id
  const media = await getMedia(id)
   res.send(media)
})

app.post("/media",async (req,res)=>{
  const {title} = req.body 
  const media = await createMedia(title)
  res.status(201).send(media)
})


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })


  app.listen(8080, ()=>{
    console.log('Server is running on port 8080')
  })
