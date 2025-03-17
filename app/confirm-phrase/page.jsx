"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import MyButton from "@/components/UI/buttons/MyButton";
import { fetchMnemonic } from "@/helpers/downloadMnemonic";
import USER from "@/constants/user";

export default function CopyPhrase() {
    const userId = USER.user.id;
    const sessionId = USER.access_token;
    const router = useRouter();

    const [gridWords, setGridWords] = useState(Array(16).fill(null));
    const [wordList, setWordList] = useState([]);
    const [originalPhrase, setOriginalPhrase] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getMnemonic = async () => {
            const phrase = await fetchMnemonic(userId, sessionId);
            setOriginalPhrase(phrase);
            const shuffledPhrase = [...phrase].sort(() => Math.random() - 0.5);
            setWordList(shuffledPhrase);
        };
        getMnemonic();
    }, []);

    const handleClickWord = (word) => {
        const emptyIndex = gridWords.findIndex((cell) => cell === null);
        if (emptyIndex !== -1) {
            setGridWords((prev) => {
                const newGrid = [...prev];
                newGrid[emptyIndex] = word;
                return newGrid;
            });
            setWordList((prev) => prev.filter((w) => w !== word));
        }
    };

    const handleClickGrid = (index) => {
        if (gridWords[index]) {
            setWordList((prev) => [...prev, gridWords[index]]);
            setGridWords((prev) => {
                const newGrid = [...prev];
                newGrid[index] = null;
                return newGrid;
            });
        }
    };

    const handleFinish = async () => {
        setIsLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (gridWords.join(" ") === originalPhrase.join(" ")) {
            router.push("/success");
        } else {
            alert("It's important that you enter your words correctly.");

            setGridWords(Array(16).fill(null));
            setWordList([...originalPhrase].sort(() => Math.random() - 0.5));
        }

        setIsLoading(false);
    };

    const pasteFromClipboard = async () => {
        try {
            const text = await navigator.clipboard.readText();
            const words = text.trim().split(/,\s?/);

            if (words.length !== 16) {
                alert("Ошибка: Количество слов в фразе некорректно.");
                return;
            }

            setGridWords(words);
            setWordList([]);
        } catch (error) {
            alert("Ошибка при вставке!");
            console.error("Ошибка при вставке:", error);
        }
    };

    return (
        <div className='container'>
            <div className='page'>
                <div className='header'></div>
                <div className={`main ${styles.main_special}`}>
                    <div className={styles.main_wrapper}>
                        {" "}
                        <p className={styles.label}>Q Wallet</p>
                        <h1 className={styles.title}>
                            Add Verify Recovery <span>Phrase!</span>
                        </h1>{" "}
                        <div className={styles.grid}>
                            {gridWords.map((word, index) => (
                                <div
                                    key={index}
                                    className={styles.grid_item}
                                    onClick={() => handleClickGrid(index)}
                                >
                                    {index + 1}. {word}
                                </div>
                            ))}
                        </div>
                        <div className={styles.grid2}>
                            {wordList.map((word) => (
                                <div
                                    key={word}
                                    className={styles.grid_item2}
                                    onClick={() => handleClickWord(word)}
                                >
                                    {word}
                                </div>
                            ))}
                        </div>
                        <div className={styles.download_wrapper}>
                            <div
                                className={styles.download}
                                onClick={pasteFromClipboard}
                            >
                                <Image
                                    src='/copy.svg'
                                    alt='image'
                                    width={24}
                                    height={24}
                                />
                                <p>Paste 16 phrase</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='footer'>
                    <div className={styles.btn_wrapper}>
                        <MyButton onClick={handleFinish} isLoading={isLoading}>
                            Finish
                        </MyButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
