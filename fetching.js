const express = require('express');
const app = express();
const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

// TODO: 나중에 해보자 크롤링...
// app.get('/get-data', async (req, res) => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   // 페이지가 로딩 될때까지 기다리기
//   await Promise.all([
//     page.goto('https://news.naver.com', {
//       waitUntil: 'networkidle2',
//       timeout: 0
//     }),
//     page.waitForNavigation()
//   ]);

//   const content = await page.content();
//   const $ = cheerio.load(content);

//   // 연합뉴스 해드라인
//   const title = $('#NM_ONELINE_ROLLING').text();
//   console.log('title: ', title);

//   await page.close();
//   await browser.close();
//   res.send(title);
// });

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   await page.goto('http://place.map.kakao.com/8191467');

//   // 페이지가 로드될 때까지 기다림
//   let temp = await page
//     .$('#mArticle > div.cont_essential > div.details_placeinfo > div:nth-child(6) > div > div > span > a:nth-child(1)')
//     .text();
//   console.log('temp: ', temp);

//   const data = await page.evaluate(() => {
//     // 여기서 JavaScript를 실행하여 페이지에서 원하는 데이터를 추출
//     // 예시: document.querySelector('.your-selector').innerText;
//     // 숨겨진 데이터에 접근하여 추출
//   });

//   console.log('추출된 데이터:', data);

//   await browser.close();
// })();
