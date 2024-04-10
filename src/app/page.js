"use client"
import { useEffect, useState } from "react";

export default function Home() {
  const [gameState, setGameState] = useState(Array(9).fill(null));
  const [user, setUser] = useState(false);
  const [victory, setVictory] = useState(null);

  const handleButton = (index) => {
    const newState = [...gameState];
    newState[index] = user ? '0' : 'X';
    setGameState(newState);
    setUser(!user);
  };

  useEffect(() => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const condition of winConditions) {
      const [a, b, c] = condition;
      if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
        setVictory(true);
      }
    }
  }, [gameState, user]);

  return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-10">
        <h1>{victory && "victory"}</h1>
        <div className="m-auto grid grid-cols-3 gap-4 w-full" style={{ maxWidth: '300px' }}>
          {gameState.map((value, index) => (
              <button
                  key={index}
                  onClick={() => handleButton(index)}
                  disabled={value !== null}
                  className="w-full h-20 flex justify-center items-center border-2 border-neutral-950"
              >
                {value}
              </button>
          ))}
        </div>
      </main>
  );
}