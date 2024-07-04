import axios from 'axios'
import cheerio from 'cheerio'

const BASE1 = 'http://localhost:5173'
const BASE2 = 'https://diego-rapoport.expos.es'
const FILE = '/test.html'
const URL = `${BASE1}${FILE}`
export function test() {
  axios.get(URL).then((res) => {
    const html = cheerio.load(res.data)
    const div = document.getElementById('html')
      div!.innerHTML = `<table>${html('table').html()!}</table>`
    console.log('HTML TBL= ', html('table').html())

  })
}
