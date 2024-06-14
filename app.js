import express from 'express'
import dotenv from 'dotenv'
import { getMedia, getMedias, createMedia } from './database.js'
import OpenAI from 'openai';

const app = express()

app.use(express.json())

dotenv.config()

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});


app.post("/find-complexity", async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { "role": "user", "content": "Who won the world series in 2020?" },
      ]
    });
    return res.status(200).json({
      success: true,
      data: response.choices[0].message.content
    });
  } catch (error) {
    if (error.response) {
      console.error('Error status:', error.response.status);
      console.error('Error data:', error.response.data);
      if (error.response.status === 429) {
        return res.status(429).json({
          success: false,
          message: 'Rate limit exceeded, please try again later',
        });
      }
    }
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message
    });
  }
});

app.get("/media", async (req,res)=>{
   const medias = await getMedias()
    res.send(medias)
})

app.get("/media/:id", async (req,res)=>{
  const id = req.params.id
  const media = await getMedia(id)
   res.send(media)
})

/*
app.post("/media",async (req,res)=>{
  const {title} = req.body 
  const media = await createMedia(title)
  res.status(201).send(media)
})*/


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })


  app.listen(5000, ()=>{
    console.log('Server is running on port 5000')
  })
