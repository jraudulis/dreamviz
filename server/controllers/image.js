import FormData from 'form-data';
import axios from 'axios';

const handleImageGeneration = async (req, res, db) => {
    const { prompt } = req.body;
    const user_id = req.user.id;

  if (!prompt) return res.status(400).json({ error: 'Description is required' });

  const imageGenerationCount = await db('users')
            .select('id', 'images_generated')
            .where({id: user_id});

    if(imageGenerationCount[0].images_generated >= 5) {
      return res.status(400).json({error: 'Beta version image generation limit reached'})
    };
  

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
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
          Accept: 'image/*',
        },
        responseType: 'arraybuffer',
      }
    );

    const base64Image = Buffer.from(response.data).toString('base64');

     try {

  // response with added prefix for image data to display immediately on frontend, not related with image history.
    res.json({ image: `data:image/webp;base64,${base64Image}` }); 

    // Stores all the image related data in to history database. and image file is base64 string
    await db('history').insert({
      user_id,
      prompt,
      image: base64Image,
      created_at: new Date()
    });

  } catch (dbErr) {
    console.error(' Database insert failed:', dbErr.message);
    console.error('Full error:', dbErr);
  }

  // Increment image generation count
  await db('users')
  .where({id: user_id})
  .increment('images_generated', 1);

  } catch (err) {
    console.error(err.response?.status, err.response?.data?.toString());
    if (err.response?.status === 403){
      console.log('Sending 403 response');
      return res.status(403).json({error: 'Image generation failed due to our content policy'});
    }
     console.log('Sending 500 response');
     return res.status(500).json({error: 'Image generation failed'});
  }
  
}

export default handleImageGeneration;