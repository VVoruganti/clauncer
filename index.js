import { Readability } from '@mozilla/readability';
import express from 'express'
import { JSDOM } from 'jsdom'
import DOMPurify from 'dompurify';
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Please provide a URL' });
  }

  try {
    const data = await scrape(url);

    return res.json({ data }); // Return the raw HTML data or your parsed data
  } catch (error) {
    return res.status(500).json({ error: 'Failed to scrape the URL' });
  }

})

app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));

async function scrape(url) {
  const response = await axios.get(url)
  const rawHTML = response.data
  const window = new JSDOM('', { url }).window
  const purify = DOMPurify(window)
  const clean = purify.sanitize(rawHTML)

  const dom = new JSDOM(clean, { url })

  let reader = new Readability(dom.window.document)
  let article = reader.parse()
  return article
}



