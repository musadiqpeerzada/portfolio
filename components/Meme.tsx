import React from 'react';

const MemeComponent = () => {
  return (
    <div className='meme-container'>
      <img
        src='https://randommeme-five.vercel.app/'
        alt='meme'
        className='meme-image'
      />
      <style jsx>{`
        .meme-container {
          display: flex;
          justify-content: center; /* Centers image horizontally on mobile */
          position: absolute; /* Use absolute positioning for better control */
          left: 0;
          bottom: 0; /* Position at the bottom on mobile */
          width: 100%; /* Full width */
          padding: 30px; /* Add some space around the image */
          box-sizing: border-box; /* Include padding in width calculation */
        }
        .meme-image {
          width: 100%; /* Full width on mobile */
          max-height: 25vh; /* Limit the height on mobile */
          object-fit: contain; /* Ensure the image is fully visible */
        }
        @media (min-width: 600px) {
          .meme-container {
            
            justify-content: flex-end; /* Align to the right on larger screens */
            align-items: flex-start; /* Align to the top on larger screens */
            top: 40%; /* Position from the top */
            right: 20px; /* Position from the right */
            left: auto; /* Reset left positioning */
            bottom: auto; /* Reset bottom positioning */
            padding: 0; /* Remove padding on larger screens */
          }
          .meme-image {
            max-width: 30%; /* Limit the width on larger screens */
            max-height: 60vh; /* Limit the height on larger screens */
          }
        }
      `}</style>
    </div>
  );
};

export default MemeComponent;
