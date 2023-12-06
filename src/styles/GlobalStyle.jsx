const { createGlobalStyle } = require('styled-components');

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'establishRetrosansOTF';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2112@1.0/establishRetrosansOTF.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  body {
    font-family: 'Pretendard-Regular';
  }
`;

export default GlobalStyle;
