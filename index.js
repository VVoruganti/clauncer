import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom'
import DOMPurify from 'dompurify';
import axios from "axios";

let url = "https://fly.io/blog/building-clusters-with-serf/"
const response = await axios.get(url)
const rawHTML = response.data
const window = new JSDOM('', { url }).window
const purify = DOMPurify(window)
const clean = purify.sanitize(rawHTML)

const dom = new JSDOM(clean, { url })

let reader = new Readability(dom.window.document)
let article = reader.parse()
console.log(article)



