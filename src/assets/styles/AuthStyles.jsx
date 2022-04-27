import { createGlobalStyle } from 'styled-components';
import '@fontsource/inter';

const Auth = createGlobalStyle`
  @font-face {
    font-family: 'Airbnb Cereal App Medium';
    src: url(fonts/AirbnbCereal_W_Md.woff) format('woff');
  }

  .full,
  .custom {
    min-height: 150vh;
  }

  .title {
    font-family: "Inter", sans-serif;
    font-weight: 700;
  }

  .description {
    font-family: "Inter", sans-serif;
    font-weight: 400;
  }

  .label {
    font-family: "Inter", sans-serif;
    font-weight: 400;
    color: #696F79;
  }

  .forgot {
    font-family: 'Airbnb Cereal App Medium';
    color: #999999;
    font-weight: 500;
    font-size: 14px;
    text-decoration: none;
  }

  .forgot:hover {
    color: #888888;
  }

  .alternative {
    font-family: 'Airbnb Cereal App Medium';
    color: #999999;
    font-weight: 500;
    font-size: 14px;
  }

  .banner {
    object-fit: cover;
    object-position: center;
    transform: rotate(-180deg);
  }

  .mask {
    background-color: #efc81a9d;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
  }

  .main-color {
    color: #efc81a;
  }

  .secondary-color {
    color: #8692a6;
  }

  .separator {
    margin-left: 0;
    border: 1px solid #f5f5f5;
  }

  .input-auth {
    background-color: #ffffff !important;
    box-sizing: border-box;
    border-radius: 6px;
  }

  .input-auth:hover,
  .input-auth:focus {
    box-shadow: 0px 4px 10px 3px rgba(0, 0, 0, 0.11) !important;
    border: 1px solid #efc81a !important;
  }

  .terms {
    display: flex;
    gap: 10px;
  }

  input[type="checkbox"] {
    width: 15px;
    height: 15px;
  }

  input[type="checkbox"]:hover {
    cursor: pointer;
  }

  input[type="checkbox"]:checked {
    background-color: #EFC81A;
    border: none;
  }

  .btn-main {
    border: 0;
    box-shadow: none;
    border-radius: 6px;
    background-color: #efc81a;
    color: #ffffff;
    font-family: "Inter", sans-serif;
    font-weight: 500;
  }

  .btn-main:hover {
    background-color: #cea905;
  }

  .clicked:hover {
    color: #cea905;
  }

  @media screen and (max-width: 767px) {
    .full {
      min-height: 100vh;
    }
    .custom {
      min-height: 150vh;
    }
    .description {
      text-align: center;
    }
  }
`;

export default Auth;
