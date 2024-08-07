// backend/server.js

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});


app.get('/home', async (req, res) => {
  const apiKey = process.env.API_KEY;
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&language=en-US&region=US&page=1`,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
    }
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/tv', async (req, res) => {
  const apiKey = process.env.API_KEY;
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/trending/tv/week?api_key=${apiKey}&language=en-US&region=US&page=1`,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
    }
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



app.get('/search', async (req, res) => {
  const query = req.query.q; 
  const apiKey = process.env.API_KEY;
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=1&include_adult=true&query=${encodeURIComponent(query)}
    `,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
    }
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
