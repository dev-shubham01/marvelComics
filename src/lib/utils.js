import md5 from "md5";
//Here we need to use environment varibales but for simplicity I am using this method

const REACT_APP_API_KEY='74ff816c637f745c2b508c43e08f45d5'
const REACT_APP_PRIVATE_KEY='b2072dc3d6aaa50f7395d1ccc89bbfb573ed72c9'
const REACT_APP_BASE_URL='http://gateway.marvel.com'

const getHash = (ts, privateKey, publicKey) => {
  return md5(ts + privateKey + publicKey).toString();
};

let API_URL =REACT_APP_BASE_URL;
let ts = Date.now().toString();
let apiKey = REACT_APP_API_KEY;
let privateKey = REACT_APP_PRIVATE_KEY;

const fetchCharacters = async () => {
    let heroUrl = `${API_URL}/v1/public/characters`;
  
    let hash = getHash(ts, privateKey, apiKey);
    let url = `${heroUrl}?ts=${ts}&apikey=${apiKey}&hash=${hash}`;
  
    try {
      let response = await fetch(url);
      let data = await response.json();
    
      return data;
    } catch (err) {
      console.error(err);
      return;
    }
  };

const fetchComics = async () => {
  let heroUrl = `${API_URL}/v1/public/comics?limit=100`;

  let hash = getHash(ts, privateKey, apiKey);
  let url = `${heroUrl}?ts=${ts}&apikey=${apiKey}&hash=${hash}`;

  try {
    let response = await fetch(url);
    let data = await response.json();
 
    return data;
  } catch (err) {
    console.error(err);
    return;
  }
};
const fetchComicsByName = async (name) => {
  let heroUrl = `${API_URL}/v1/public/comics`;

  let hash = getHash(ts, privateKey, apiKey);
  let url = `${heroUrl}?titleStartsWith=${name}&ts=${ts}&apikey=${apiKey}&hash=${hash}`;

  try {
    let response = await fetch(url);
    let data = await response.json();
 
    return data;
  } catch (err) {
    console.error(err);
    return;
  }
};

const fetchComicsByCharacterId = async (id) => {
  let heroUrl = `${API_URL}/v1/public/characters/${id}/comics`;

  let hash = getHash(ts, privateKey, apiKey);
  let url = `${heroUrl}?ts=${ts}&apikey=${apiKey}&hash=${hash}`;

  try {
    let response = await fetch(url);
    let data = await response.json();
 
    return data;
  } catch (err) {
    console.error(err);
    return;
  }
};

export { fetchComics ,fetchComicsByCharacterId, fetchCharacters,fetchComicsByName};