import md5 from "md5";

const getHash = (ts, privateKey, publicKey) => {
  return md5(ts + privateKey + publicKey).toString();
};

let API_URL =process.env.REACT_APP_BASE_URL;
let ts = Date.now().toString();
let apiKey = process.env.REACT_APP_API_KEY;
let privateKey = process.env.REACT_APP_PRIVATE_KEY;

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