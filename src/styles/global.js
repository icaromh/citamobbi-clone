import { createGlobalStyle } from "styled-components";

const color = {
  primary: "#f0b7a4"
};

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    --color-primary: ${color.primary}
    
    margin: 0;
  }

  .map {
    height: 100vh;
    width: 100vw;
    top: 0;
    position: absolute;
  }

  @media screen and (-webkit-min-device-pixel-ratio: 0) {
    select,
    textarea,
    input {
      font-size: 16px;
    }
  }
`;

export default GlobalStyles;
