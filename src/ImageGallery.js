import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
  font-family: 'NanumSquareNeo-Variable';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/NanumSquareNeo-Variable.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}

  body {
    font-family: 'NanumSquareNeo-Variable';
    background-image: linear-gradient(120deg, #a6c0fe 0%, #f68084 100%);
  }

  #root {
    height: 100vh;
    overflow: hidden; 
  }
`;

const Container = styled.div`
    background-color: #fff;
    min-height: 50vh;
    max-width: 450px;
    padding: 2rem;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    position: absolute;
    top: 2rem; bottom: 3rem; left: 2rem; right: 2rem;

    /* 모바일 화면 */
    @media (max-width: 600px) {
        font-size: 16px;
        color: navy;
    }
`;

const SearchContainer = styled.div`
    height: 2rem;
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
`

const Button = styled.button`
    width: 50px;
    height: 50px;
    padding: 5px;
    background-color: #a6c0fe;
    color: #FFF;
    font-weight:bold;
    font-size: 15px;
    margin-left: 10px;
    border-radius: 10px;
    border: #a4a4a4 1px solid;
`

const Input = styled.input`
    width: 12rem;
    height: 35px;
    padding: 7px;
    border-radius: 10px;
    border: #a4a4a4 1px solid;
    font-size: 15px;
`
const Result = styled.div`
    display: 'flex';
    flex-wrap: wrap;
`
const ResultText = styled.p`
    font-size: 14px;
    margin-top: 5px;
    color: #f68084;
`
const IMG = styled.img`
    width: 140px;
    height: 100px;
    margin: 5px;
    border-radius: 5px;

    @media (max-width: 900px) {
        width: 12rem;
        height: 10rem;
        margin: 5px;
    }

    @media (max-width: 600px) {
        width: 8rem;
        height: 6rem;
        margin: 2px;
    }

    @media (max-width: 400px) {
        width: 7rem;
        height: 5rem;
        margin: 2px;
    }
`
const Footer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 0;  
    width: 100%;   
`;

const FooterText = styled.p`
    font-size: 15px;
    color: #fff;
    font-weight: bold;
`

const ImageGallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [images, setImages] = useState([]);

  const accessKey = '9uKXRDQYOg9lnoGQ9uJsJzr3Ol11UYePc7A2_gn-aP0';

  const searchImages = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${searchTerm}&client_id=${accessKey}`
      );
      setImages(response.data.results);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchImages();
    }
  };

  return (
    <>
    <GlobalStyle/>        
        <Container>
            <SearchContainer>
                <Input
                    type="text"
                    placeholder='검색어를 입력하세요'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <Button onClick={searchImages}>검색</Button>
            </SearchContainer>
            <Result>
                <ResultText>Results for {searchTerm} ...</ResultText>
                {images.map((image) => (
                <IMG
                    key={image.id}
                    src={image.urls.thumb}
                    alt={image.alt_description}
                />
                ))}
            </Result>
        </Container>
        <Footer>
          <FooterText>@ M E G U M M Y 1</FooterText>
        </Footer>
    </>
  );
};

export default ImageGallery;
