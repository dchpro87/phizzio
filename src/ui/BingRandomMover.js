import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';

// A custom component that takes a child component and moves it randomly
export default function RandomMover({ children }) {
  // The state variables for the position and direction of the child component
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [dx, setDx] = useState(1);
  const [dy, setDy] = useState(1);

  // A function that updates the position and direction of the child component
  const move = () => {
    // The width and height of the window
    const width = window.innerWidth;
    const height = window.innerHeight;

    // The new position of the child component
    let newX = x + dx;
    let newY = y + dy;

    // The new direction of the child component
    let newDx = dx;
    let newDy = dy;

    // If the child component reaches the edge of the window, reverse its direction
    if (newX < 0 || newX > width - 100) {
      newDx = -dx;
    }
    if (newY < 0 || newY > height - 100) {
      newDy = -dy;
    }

    // Set the new state variables
    setX(newX);
    setY(newY);
    setDx(newDx);
    setDy(newDy);
  };

  // Use an effect hook to call the move function every 100 milliseconds
  useEffect(() => {
    const interval = setInterval(move, 5);
    return () => clearInterval(interval);
  }, [x, y, dx, dy]);

  // Return the child component with a style prop that sets its position
  return React.cloneElement(children, {
    style: { position: 'absolute', left: x, top: y },
  });
}

// A sample component that uses the RandomMover component
const App = () => {
  return (
    <div>
      <RandomMover>
        <Box width={100} height={100} bgcolor='blue' />
      </RandomMover>
    </div>
  );
};
