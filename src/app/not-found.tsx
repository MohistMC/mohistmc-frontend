
// src/app/not-found.tsx
"use client";

import Image from 'next/image'
import image404 from '../../public/img/404.png'
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import {useEffect, useRef, useState} from 'react'

export default function NotFoundPage() {
    const router = useRouter();
    const [showGame, setShowGame] = useState(false);
    const [score, setScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [isJumping, setIsJumping] = useState(false);
    const [dinoPosition, setDinoPosition] = useState(0);
    const [obstacles, setObstacles] = useState<{id: number, position: number}[]>([]);
    const [gameOver, setGameOver] = useState(false);
    const [highScore, setHighScore] = useState(0);
    const [consecutiveObstacles, setConsecutiveObstacles] = useState(0); // Consecutive obstacle count

    const gameLoopRef = useRef<number>(0);
    const gameSpeedRef = useRef(3); // Reduce initial speed
    const obstacleIdRef = useRef(0);
    const lastScoreUpdateRef = useRef(0);

    const handleGoBack = () => {
        router.back();
    };

    // Jump function - improved jump mechanism
    const jump = () => {
        if (!isJumping && gameStarted && !gameOver) {
            setIsJumping(true);
        }
    };

    // Jump animation - higher and more flexible jump
    useEffect(() => {
        if (isJumping) {
            const gravity = 0.8; // Adjust gravity effect

            let velocity = 23; // Increase initial jump speed
            let position = 0;

            const animateJump = () => {
                // Use more natural physics simulation
                velocity -= gravity; // Apply gravity
                position += velocity; // Update position

                // Ensure dinosaur doesn't go below ground
                if (position <= 0) {
                    position = 0;
                    setIsJumping(false);
                }

                setDinoPosition(Math.max(0, position));

                // Continue animation if still jumping and not landed
                if (position > 0) {
                    requestAnimationFrame(animateJump);
                } else {
                    // Ensure fully landed
                    setDinoPosition(0);
                    setIsJumping(false);
                }
            };

            animateJump();
        }
    }, [isJumping]);

    // Game main loop
    useEffect(() => {
        if (gameStarted && !gameOver) {
            // Game loop
            const gameLoop = () => {
                // Generate obstacles (further reduce generation frequency, and limit consecutive appearance)
                if (Math.random() < 0.01 && consecutiveObstacles < 2) { // Max 2 consecutive
                    const newObstacle = {
                        id: obstacleIdRef.current++,
                        position: 1000 // Increase appearance distance (from 800 to 1000)
                    };
                    setObstacles(prev => [...prev, newObstacle]);
                    setConsecutiveObstacles(prev => prev + 1);
                } else if (consecutiveObstacles > 0) {
                    // 30% chance to reset consecutive count to avoid consecutive obstacles
                    setConsecutiveObstacles(0);
                }

                // Update obstacle positions
                setObstacles(prev => {
                    // Remove obstacles that are off-screen
                    return prev.map(obs => ({
                        ...obs,
                        position: obs.position - gameSpeedRef.current
                    })).filter(obs => obs.position > -50);
                });

                // Check for collisions
                const dinoRect = { x: 80, y: 160 - dinoPosition, width: 40, height: 50 };
                let collision = false;

                for (const obs of obstacles) {
                    const obsRect = { x: obs.position, y: 160, width: 20, height: 40 };
                    if (
                        dinoRect.x < obsRect.x + obsRect.width &&
                        dinoRect.x + dinoRect.width > obsRect.x &&
                        dinoRect.y < obsRect.y + obsRect.height &&
                        dinoRect.y + dinoRect.height > obsRect.y
                    ) {
                        collision = true;
                        break;
                    }
                }

                if (collision) {
                    setGameOver(true);
                    setGameStarted(false);
                    if (score > highScore) {
                        setHighScore(score);
                    }
                }

                gameLoopRef.current = requestAnimationFrame(gameLoop);
            };

            gameLoopRef.current = requestAnimationFrame(gameLoop);
        }

        return () => {
            if (gameLoopRef.current) {
                cancelAnimationFrame(gameLoopRef.current);
            }
        };
    }, [gameStarted, gameOver, obstacles, dinoPosition, score, highScore, consecutiveObstacles]);

    // Scoring system - separate useEffect
    useEffect(() => {
        if (gameStarted && !gameOver) {
            const scoreInterval = setInterval(() => {
                setScore(prev => {
                    const newScore = prev + 1;

                    // Reduce game speed increase frequency (increase every 200 points)
                    if (newScore > 0 && newScore % 200 === 0) {
                        gameSpeedRef.current += 0.3; // Reduce speed increase each time
                    }

                    return newScore;
                });
            }, 100); // Increase 1 point every 100ms

            return () => clearInterval(scoreInterval);
        }
    }, [gameStarted, gameOver]);

    // Start game
    const startGame = () => {
        setScore(0);
        setGameStarted(true);
        setGameOver(false);
        setObstacles([]);
        setConsecutiveObstacles(0); // Reset consecutive obstacle count
        gameSpeedRef.current = 3; // Reset to lower initial speed
        obstacleIdRef.current = 0;
        lastScoreUpdateRef.current = 0;
    };

    // Reset game
    const resetGame = () => {
        setGameStarted(false);
        setGameOver(false);
        setObstacles([]);
        setScore(0);
        setIsJumping(false);
        setDinoPosition(0);
        setConsecutiveObstacles(0); // Reset consecutive obstacle count
        gameSpeedRef.current = 3; // Reset to lower initial speed
        obstacleIdRef.current = 0;
        lastScoreUpdateRef.current = 0;
    };

    // Keyboard control
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space' || e.key === ' ' || e.key === 'ArrowUp') {
                if (gameStarted && !gameOver) {
                    jump();
                } else if (!gameStarted && showGame) {
                    startGame();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gameStarted, gameOver, showGame]);

    // Click control
    const handleGameClick = () => {
        if (gameStarted && !gameOver) {
            jump();
        } else if (!gameStarted && showGame && !gameOver) {
            startGame();
        }
    };

    return (
        <section className="flex flex-col justify-center items-center min-h-screen pb-10 bg-base-100 px-4">
            {!showGame ? (
                <>
                    <Image height="300" alt="404 Error" src={image404} className="mb-6" />
                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-base-content">
                        404{' '}
                        <span className="underline underline-offset-3 decoration-8 decoration-primary">
                            not found
                        </span>
                    </h1>
                    <p className="text-lg font-normal text-base-content/70 lg:text-xl text-center m-4">
                        Sorry, the resource you are looking for cannot be found on this website.
                    </p>
                    <div className="mt-6 flex flex-col sm:flex-row gap-4">
                        <Link href="/" className="btn btn-primary px-6 py-3 text-lg">
                            Return to Home
                        </Link>
                        <button
                            onClick={handleGoBack}
                            className="btn btn-outline px-6 py-3 text-lg"
                        >
                            Go Back
                        </button>
                        <button
                            onClick={() => setShowGame(true)}
                            className="btn btn-secondary px-6 py-3 text-lg"
                        >
                            🦖 Play Game
                        </button>
                    </div>
                </>
            ) : (
                <div className="w-full max-w-3xl flex flex-col items-center">
                    <div className="flex justify-between w-full mb-4">
                        <h2 className="text-2xl font-bold text-base-content">Dino Runner</h2>
                        <div className="flex gap-4">
                            <div className="text-xl font-bold text-base-content">
                                Score: {score}
                            </div>
                            <div className="text-xl font-bold text-primary">
                                High Score: {highScore}
                            </div>
                        </div>
                    </div>

                    {/* Game Area */}
                    <div
                        onClick={handleGameClick}
                        className="relative w-full h-48 bg-base-200 rounded-box border-2 border-base-300 overflow-hidden cursor-pointer"
                    >
                        {/* Ground */}
                        <div className="absolute bottom-0 left-0 right-0 h-2 bg-amber-800"></div>

                        {/* Dinosaur - Using emoji and reversing direction */}
                        <div
                            className="absolute bottom-0 left-20 text-4xl select-none transition-transform duration-100"
                            style={{
                                transform: `translateY(${-dinoPosition}px) scaleX(-1)`, // Reverse direction
                                bottom: '0px'
                            }}
                        >
                            <span className="drop-shadow-lg">🦖</span>
                        </div>

                        {/* Obstacles - Using emoji */}
                        {obstacles.map(obstacle => (
                            <div
                                key={obstacle.id}
                                className="absolute bottom-0 text-3xl select-none"
                                style={{
                                    left: `${obstacle.position}px`,
                                    bottom: '0px'
                                }}
                            >
                                <span className="drop-shadow-lg">🌵</span>
                            </div>
                        ))}

                        {/* Game status prompts */}
                        {!gameStarted && !gameOver && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <p className="text-xl font-bold text-base-content/70">Click to start game</p>
                            </div>
                        )}

                        {gameOver && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                <div className="bg-white p-6 rounded-box text-center">
                                    <h3 className="text-2xl font-bold text-error">Game Over!</h3>
                                    <p className="text-lg mt-2">Final Score: {score}</p>
                                    {score >= highScore && score > 0 && (
                                        <p className="text-success font-bold mt-1">New Record!</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 text-center text-base-content/80">
                        <div className="flex flex-wrap gap-3 justify-center">
                            {!gameStarted && !gameOver ? (
                                <button
                                    onClick={startGame}
                                    className="btn btn-primary px-6 py-2"
                                >
                                    {score > 0 ? 'Restart' : 'Start Game'}
                                </button>
                            ) : gameOver ? (
                                <button
                                    onClick={startGame}
                                    className="btn btn-primary px-6 py-2"
                                >
                                    Play Again
                                </button>
                            ) : (
                                <button
                                    onClick={resetGame}
                                    className="btn btn-error px-6 py-2"
                                >
                                    End Game
                                </button>
                            )}
                            <button
                                onClick={() => {
                                    setShowGame(false);
                                    resetGame();
                                }}
                                className="btn btn-outline px-6 py-2"
                            >
                                Return to 404 Page
                            </button>
                        </div>
                    </div>

                    <div className="mt-6 text-sm text-base-content/60">
                        <p>Game Tips: Press Space or click screen to jump, avoid cacti</p>
                    </div>
                </div>
            )}
        </section>
    )
}