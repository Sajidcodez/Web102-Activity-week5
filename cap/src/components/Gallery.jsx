import React from 'react';

const Gallery = ({ images }) => {
  return (
    <div>
      <h2> Your Screenshot Gallery!</h2>
      <ul className="image-container" style={{ listStyle: 'none', padding: 0 }}>
        {images && images.length > 0 ? (
          images.map((pic, index) => (
            <li className="gallery" key={index}>
              <img
                className="gallery-screenshot"
                src={pic}
                alt="Undefined screenshot from query"
                width="500"
              />
            </li>
          ))
        ) : (
          <div>
            <h3>You haven't made a screenshot yet!</h3>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Gallery;
