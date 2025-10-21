import { useState } from 'react'
import './App.css'
import APIForm from './components/APIForm'
import Gallery from './components/Gallery'
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;


function App() {
  const [count, setCount] = useState(0)

  const [inputs, setInputs] = useState({
    url: "",
    format: "",
    no_ads: "",
    no_cookie_banners: "",
    width: "",
    height: "",
  });


  const [currentImage, setCurrentImage] = useState(null);
  const [prevImages, setPrevImages] = useState([]);

  // Async helper to call the API with a query string and parse JSON
  const callAPI = async (query) => {
    const response = await fetch(query);
    const json = await response.json();
    console.log('API Response:', json);
    if (json?.url == null) {
      alert("Oops! Something went wrong with that query, let's try again!");
    } else {
      console.log('Setting currentImage to:', json.url);
      setCurrentImage(json.url);
      setPrevImages((images) => [...images, json.url]);
      reset();
    }
    return json;
  };

  // Helper function to reset/clear the form inputs
  const reset = () => {
    setInputs({
      url: "",
      format: "",
      no_ads: "",
      no_cookie_banners: "",
      width: "",
      height: "",
    });
  };

  const submitForm = () => {
    // Require a URL before proceeding
    if (!inputs.url || inputs.url.trim() === "") {
      alert("Please provide a URL before submitting.");
      return;
    }

    // Defaults for any missing values
    const defaultValues = {
      format: "jpeg",
      no_ads: "true",
      no_cookie_banners: "true",
      width: "1920",
      height: "1080",
    };

    // Fill in any missing inputs with defaults and update state
    const updatedInputs = { ...inputs };
    for (const [key, value] of Object.entries(inputs)) {
      if (value == "") {
        updatedInputs[key] = defaultValues[key];
      }
    }
    setInputs(updatedInputs);

    const makeQuery = () => {
      let wait_until = "network_idle";
      let response_type = "json";
      let fail_on_status = "400%2C404%2C500-511";
      let url_starter = "https://";
      let fullURL = url_starter + updatedInputs.url;
      let query = `https://api.apiflash.com/v1/urltoimage?access_key=${ACCESS_KEY}&url=${fullURL}&format=${updatedInputs.format}&width=${updatedInputs.width}&height=${updatedInputs.height}&no_cookie_banners=${updatedInputs.no_cookie_banners}&no_ads=${updatedInputs.no_ads}&wait_until=${wait_until}&response_type=${response_type}&fail_on_status=${fail_on_status}`;
      console.log('Query:', query);
      return query;
    }

    const query = makeQuery();
    callAPI(query);
  }

  return (
    <div className="whole-page">
      <h1>Build Your Own Screenshot! 📸</h1>
      <APIForm
        inputs={inputs}
        handleChange={(e) =>
          setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value.trim(),
          }))
        }
        onSubmit={submitForm}
      />
      <br></br>
      {currentImage ? (
        <img
          className="screenshot"
          src={currentImage}
          alt="Screenshot returned"
        />
      ) : (
        <div> </div>
      )}
      <div className="container">
        <h3> Current Query Status: </h3>
        <p>
          https://api.apiflash.com/v1/urltoimage?access_key=ACCESS_KEY    
          <br></br>
          &url={inputs.url} <br></br>
          &format={inputs.format} <br></br>
          &width={inputs.width}
          <br></br>
          &height={inputs.height}
          <br></br>
          &no_cookie_banners={inputs.no_cookie_banners}
          <br></br>
          &no_ads={inputs.no_ads}
          <br></br>
        </p>
      </div>
      <br></br>
      <div className="container">
        <Gallery images={prevImages} />
      </div>
    </div>
  )}

export default App
