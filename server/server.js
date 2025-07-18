import express from 'express';
import axios from 'axios';
import FormData from 'form-data';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/generate-image', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

  const form = new FormData();
  form.append('prompt', prompt);
  form.append('output_format', 'webp');

  try {
    const response = await axios.post(
      'https://api.stability.ai/v2beta/stable-image/generate/ultra',
      form,
      {
        headers: {
          ...form.getHeaders(),
          Authorization: process.env.STABILITY_API_KEY,
          Accept: 'image/*',
        },
        responseType: 'arraybuffer',
      }
    );

    const base64Image = Buffer.from(response.data).toString('base64');

    res.json({ image: `data:image/webp;base64,${base64Image}` });
  } catch (err) {
    console.error(err.response?.status, err.response?.data?.toString());
    res.status(500).json({ error: 'Image generation failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
