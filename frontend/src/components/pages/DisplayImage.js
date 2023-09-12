import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DisplayImage() {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // Fetch the image URL from the Spring Boot backend
    axios.get('http://localhost:8080/image-url').then((response) => {
      setImageUrl(response.data.url);
    });
  }, []);

  return (
    <div>
      <h2>Uploaded Image</h2>
      <img src={imageUrl} alt="Uploaded" />
    </div>
  );
}

export default DisplayImage;
