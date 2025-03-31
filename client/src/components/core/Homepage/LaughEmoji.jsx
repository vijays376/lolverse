import React, { useRef, useState, useEffect } from 'react';
import Lottie from 'lottie-react';

const LaughEmoji = () => {
  const lottieRef = useRef(null);
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // Fetch the animation data from the URL
    fetch('https://fonts.gstatic.com/s/e/notoemoji/latest/1f606/lottie.json')
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error('Error fetching animation:', error));
  }, []);

  const handleClick = () => {
    if (lottieRef.current) {
      lottieRef.current.stop(); // Stop the animation and reset it
      lottieRef.current.play(); // Play the full animation again
    }
  };

  return (
    <div onClick={handleClick} >
      {animationData && (
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          loop={false}  // Set loop to false so it doesn't keep playing
          autoplay={false} // Disable autoplay so it only plays on click
        />
      )}
    </div>
  );
};

export default LaughEmoji;