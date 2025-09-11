"use client";

import Image from 'next/image'
import image404 from '../../../public/img/404.png'
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
    const [consecutiveObstacles, setConsecutiveObstacles] = useState(0); // 连续障碍物计数

    const gameLoopRef = useRef<number>(0);
    const gameSpeedRef = useRef(3); // 降低初始速度
    const obstacleIdRef = useRef(0);
    const lastScoreUpdateRef = useRef(0);

    const handleGoBack = () => {
        router.back();
    };

    // 跳跃函数 - 改进跳跃机制
    const jump = () => {
        if (!isJumping && gameStarted && !gameOver) {
            setIsJumping(true);
        }
    };

    // 跳跃动画 - 更高更灵活的跳跃
    useEffect(() => {
        if (isJumping) {
            const gravity = 0.8; // 调整重力效果

            let velocity = 23; // 增加初始跳跃速度
            let position = 0;

            const animateJump = () => {
                // 使用更自然的物理模拟
                velocity -= gravity; // 应用重力
                position += velocity; // 更新位置

                // 确保恐龙不会低于地面
                if (position <= 0) {
                    position = 0;
                    setIsJumping(false);
                }

                setDinoPosition(Math.max(0, position));

                // 如果还在跳跃且未落地，继续动画
                if (position > 0) {
                    requestAnimationFrame(animateJump);
                } else {
                    // 确保完全落地
                    setDinoPosition(0);
                    setIsJumping(false);
                }
            };

            animateJump();
        }
    }, [isJumping]);

    // 游戏主循环
    useEffect(() => {
        if (gameStarted && !gameOver) {
            // 游戏循环
            const gameLoop = () => {
                // 生成障碍物 (进一步降低生成频率，并限制连续出现)
                if (Math.random() < 0.01 && consecutiveObstacles < 2) { // 最多连续出现2个
                    const newObstacle = {
                        id: obstacleIdRef.current++,
                        position: 1000 // 增加出现距离 (从800增加到1000)
                    };
                    setObstacles(prev => [...prev, newObstacle]);
                    setConsecutiveObstacles(prev => prev + 1);
                } else if (consecutiveObstacles > 0) {
                    // 30%概率重置连续计数，避免连续障碍物
                    setConsecutiveObstacles(0);
                }

                // 更新障碍物位置
                setObstacles(prev => {
                     // 移除超出屏幕的障碍物
                    return prev.map(obs => ({
                        ...obs,
                        position: obs.position - gameSpeedRef.current
                    })).filter(obs => obs.position > -50);
                });

                // 检查碰撞
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

    // 计分系统 - 独立的useEffect
    useEffect(() => {
        if (gameStarted && !gameOver) {
            const scoreInterval = setInterval(() => {
                setScore(prev => {
                    const newScore = prev + 1;

                    // 降低游戏速度增加频率（每200分增加一次速度）
                    if (newScore > 0 && newScore % 200 === 0) {
                        gameSpeedRef.current += 0.3; // 降低每次增加的速度
                    }

                    return newScore;
                });
            }, 100); // 每100ms增加1分

            return () => clearInterval(scoreInterval);
        }
    }, [gameStarted, gameOver]);

    // 开始游戏
    const startGame = () => {
        setScore(0);
        setGameStarted(true);
        setGameOver(false);
        setObstacles([]);
        setConsecutiveObstacles(0); // 重置连续障碍物计数
        gameSpeedRef.current = 3; // 重置为更低的初始速度
        obstacleIdRef.current = 0;
        lastScoreUpdateRef.current = 0;
    };

    // 重置游戏
    const resetGame = () => {
        setGameStarted(false);
        setGameOver(false);
        setObstacles([]);
        setScore(0);
        setIsJumping(false);
        setDinoPosition(0);
        setConsecutiveObstacles(0); // 重置连续障碍物计数
        gameSpeedRef.current = 3; // 重置为更低的初始速度
        obstacleIdRef.current = 0;
        lastScoreUpdateRef.current = 0;
    };

    // 键盘控制
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

    // 点击控制
    const handleGameClick = () => {
        if (gameStarted && !gameOver) {
            jump();
        } else if (!gameStarted && showGame && !gameOver) {
            startGame();
        }
    };

    return (
        <section className="flex flex-col justify-center items-center min-h-screen py-10 bg-base-100 px-4">
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
                        很抱歉，您所寻找的资源在本网站上找不到。
                    </p>
                    <div className="mt-6 flex flex-col sm:flex-row gap-4">
                        <Link href="/" className="btn btn-primary px-6 py-3 text-lg">
                            返回首页
                        </Link>
                        <button
                            onClick={handleGoBack}
                            className="btn btn-outline px-6 py-3 text-lg"
                        >
                            返回上一页
                        </button>
                        <button
                            onClick={() => setShowGame(true)}
                            className="btn btn-secondary px-6 py-3 text-lg"
                        >
                            🦖 点击玩游戏
                        </button>
                    </div>
                </>
            ) : (
                <div className="w-full max-w-3xl flex flex-col items-center">
                    <div className="flex justify-between w-full mb-4">
                        <h2 className="text-2xl font-bold text-base-content">小恐龙快跑</h2>
                        <div className="flex gap-4">
                            <div className="text-xl font-bold text-base-content">
                                分数: {score}
                            </div>
                            <div className="text-xl font-bold text-primary">
                                最高分: {highScore}
                            </div>
                        </div>
                    </div>

                    {/* 游戏区域 */}
                    <div
                        onClick={handleGameClick}
                        className="relative w-full h-48 bg-base-200 rounded-box border-2 border-base-300 overflow-hidden cursor-pointer"
                    >
                        {/* 地面 */}
                        <div className="absolute bottom-0 left-0 right-0 h-2 bg-amber-800"></div>

                        {/* 恐龙 - 使用emoji表情符号并反转方向 */}
                        <div
                            className="absolute bottom-0 left-20 text-4xl select-none transition-transform duration-100"
                            style={{
                                transform: `translateY(${-dinoPosition}px) scaleX(-1)`, // 反转方向
                                bottom: '0px'
                            }}
                        >
                            <span className="drop-shadow-lg">🦖</span>
                        </div>

                        {/* 障碍物 - 使用emoji表情符号 */}
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

                        {/* 游戏状态提示 */}
                        {!gameStarted && !gameOver && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <p className="text-xl font-bold text-base-content/70">点击开始游戏</p>
                            </div>
                        )}

                        {gameOver && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                <div className="bg-white p-6 rounded-box text-center">
                                    <h3 className="text-2xl font-bold text-error">游戏结束!</h3>
                                    <p className="text-lg mt-2">最终分数: {score}</p>
                                    {score >= highScore && score > 0 && (
                                        <p className="text-success font-bold mt-1">新纪录!</p>
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
                                    {score > 0 ? '重新开始' : '开始游戏'}
                                </button>
                            ) : gameOver ? (
                                <button
                                    onClick={startGame}
                                    className="btn btn-primary px-6 py-2"
                                >
                                    再玩一次
                                </button>
                            ) : (
                                <button
                                    onClick={resetGame}
                                    className="btn btn-error px-6 py-2"
                                >
                                    结束游戏
                                </button>
                            )}
                            <button
                                onClick={() => {
                                    setShowGame(false);
                                    resetGame();
                                }}
                                className="btn btn-outline px-6 py-2"
                            >
                                返回404页面
                            </button>
                        </div>
                    </div>

                    <div className="mt-6 text-sm text-base-content/60">
                        <p>游戏技巧：按空格键或点击屏幕跳跃，躲避仙人掌</p>
                    </div>
                </div>
            )}
        </section>
    )
}
