import QrScanner from 'qr-scanner'
import './style.css'
import axios from 'axios'
import cheerio from 'cheerio'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<video id="video" width="300" height="300"></video>
<button id="btn">START</button>
<p id="data"></p>
`

const axiosService = axios.create()
const videoElem = document.getElementById("video") as HTMLVideoElement
const btn = document.getElementById("btn")
const pData = document.getElementById("data")
const qrScan = new QrScanner(
  videoElem,
  result => {
    console.log('REs = ', result)
    if(result.data.startsWith('https')) {
      pData!.innerHTML = 'Tem HTTPS'
      axiosService.get(`https://cors-anywhere.herokuapp.com/${result.data}`).then(
        response => {
          alert('PEGOU RESPONSE!')
          pData!.innerHTML = 'Pegando Response'
          const html = response.data
          const cheer = cheerio.load(html)
          const valores = cheer('.valor').each((_, elem) => {
            return elem.data
          })
          pData!.innerHTML = valores.text()
        }
      )
    }
  }, {highlightScanRegion:true, maxScansPerSecond: 1}
)
btn?.addEventListener("click", () => {
  qrScan.start()
})

