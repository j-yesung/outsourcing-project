const firebase = require('firebase/app');
// require('firebase/database'); // Realtime Database를 사용하는 경우
const axios = require('axios');

// // Firebase 프로젝트 구성
// const firebaseConfig = {
//   apiKey: 'YOUR_API_KEY',
//   authDomain: 'YOUR_AUTH_DOMAIN',
//   databaseURL: 'YOUR_DATABASE_URL'
//   // ...
// };

// // Firebase 초기화
// firebase.initializeApp(firebaseConfig);

// // Realtime Database 참조
// const database = firebase.database();

// // 데이터 가져오기 예시
// database
//   .ref('path/to/data')
//   .once('value')
//   .then((snapshot) => {
//     const data = snapshot.val();
//     console.log('데이터:', data);
//   })
//   .catch((error) => {
//     console.error('데이터 가져오기 오류:', error);
//   });

// TODO: 나중에 해보자 크롤링...
const getHTML = async () => {
  try {
    const res = await axios.post('http://place.map.kakao.com/8191467');
    console.log('res: ', res);
  } catch (error) {
    console.log('에러..에러', error);
  }
};
getHTML();
