const express = require('express')
const cors = require('cors')
const axios = require('axios')
const dotenv = require('dotenv')

const app = express()
const PORT = process.env.PORT || 3001

dotenv.config()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.render('hello world')
})

app.get('/home', async (req, res) => {
  const apiKey = process.env.API_KEY
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&language=en-US&region=US&page=1`,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
    }
  }

  try {
    const response = await axios.request(options)
    res.json(response.data);
  } catch (error) {
    console.error({ error: error.message })
  }
})

app.get('/tv', async (req, res) => {
  const apiKey = process.env.API_KEY
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/trending/tv/day?api_key=${apiKey}&language=en-US&region=US&page=1`,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
    }
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error({ error: error.message })
  }
});

app.get('/search', async (req, res) => {
  const apiKey = process.env.API_KEY
  const query = req.query.q
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${encodeURIComponent(query)}
    `,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
    }
  }

  try {
    const response = await axios.request(options)
    res.json(response.data);
  } catch (error) {
    console.error({ error: error.message })
  }
});


app.listen(PORT, () => {
  console.log(`Success`)
});
