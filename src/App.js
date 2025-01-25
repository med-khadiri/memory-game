import { useEffect, useState } from "react";
import { FiSettings } from "react-icons/fi";

import "./App.css";
import SingleCard from "./SingleCard/SingleCard";


// Liste des images des cartes avec un indicateur "matched" pour savoir si la paire a été trouvée
const cardImages = [
    { src: "/img/apple.png", matched: false },
    { src: "/img/avocado.png", matched: false },
    { src: "/img/banana.png", matched: false },
    { src: "/img/berry.png", matched: false },
    { src: "/img/cherry.png", matched: false },
    { src: "/img/coconut.png", matched: false },
    { src: "/img/dragonfruit.png", matched: false },
    { src: "/img/grape.png", matched: false },
    { src: "/img/kiwi.png", matched: false },
    { src: "/img/orange.png", matched: false },
    { src: "/img/pear.png", matched: false },
    { src: "/img/pineapple.png", matched: false },
    { src: "/img/strawberry.png", matched: false },
    { src: "/img/watermelon.png", matched: false },
];

function App() {
    // États pour gérer le jeu
    const [cards, setCards] = useState([]); // Les cartes affichées sur la grille
    const [turns, setTurns] = useState(0); // Nombre de tours joués
    const [choiceOne, setChoiceOne] = useState(null); // Première carte choisie
    const [choiceTwo, setChoiceTwo] = useState(null); // Deuxième carte choisie
    const [disabled, setDisabled] = useState(false); // Empêche de cliquer pendant une comparaison
    const [numCards, setNumCards] = useState(4); // Nombre total de cartes à jouer
    const [backgroundColor, setBackgroundColor] = useState("#2c2c54"); // Couleur de fond
    const [isGameStarted, setIsGameStarted] = useState(false); // Indique si le jeu a commencé
    const [gameFinished, setGameFinished] = useState(false); // Indique si le jeu est terminé
    const [timer, setTimer] = useState(0); // Chronomètre du jeu
    const [intervalId, setIntervalId] = useState(null); // ID de l'intervalle du chronomètre
    const [history, setHistory] = useState([]); // Historique des jeux précédents
    const [showHistory, setShowHistory] = useState(false); // Indique si l'historique est affiché
    const [showSettings, setShowSettings] = useState(false);

    // Couleurs disponibles pour le background
    const colors = [
        { name: "Midnight Blue", value: "#2c2c54" },
        { name: "Vivid Red", value: "#ff6b6b" },
        { name: "Bright Orange", value: "#ffa502" },
        { name: "Sky Blue", value: "#1e90ff" },
        { name: "Emerald Green", value: "#2ed573" },
        { name: "Soft Purple", value: "#a29bfe" },
        { name: "Blush Pink", value: "#ff9ff3" },
        { name: "Pastel Yellow", value: "#feca57" },
        { name: "Aqua Blue", value: "#48dbfb" },
        { name: "Light Coral", value: "#ff7675" },
        { name: "Forest Green", value: "#2ecc71" },
        { name: "Deep Purple", value: "#6c5ce7" },
        { name: "Sunset Orange", value: "#e17055" },
        { name: "Cool Gray", value: "#dfe6e9" },
        { name: "Dark Slate", value: "#34495e" },
    ];

    // Mélange et initialise les cartes, réinitialise le jeu, et démarre le chronomètre
    const shuffleCards = () => {
        const selectedCards = cardImages.slice(0, numCards / 2);// Sélectionne les cartes nécessaires
        const shuffledCards = [...selectedCards, ...selectedCards]
            .sort(() => Math.random() - 0.5)// Mélange aléatoirement les cartes
            .map((card) => ({ ...card, id: Math.random() }));// Ajoute un ID unique à chaque carte

        setCards(shuffledCards);
        setTurns(0);// Réinitialise le compteur de tours
        setChoiceOne(null);
        setChoiceTwo(null);
        setIsGameStarted(true);
        setGameFinished(false);
        setTimer(0);

        if (intervalId) clearInterval(intervalId);// Stoppe l'ancien intervalle si existant
        const newIntervalId = setInterval(() => {
            setTimer((prevTime) => prevTime + 1);// Incrémente le chronomètre toutes les secondes
        }, 1000);
        setIntervalId(newIntervalId);
    };

    // Gère le choix d'une carte (choix 1 ou choix 2)
    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    };

    // Compare les deux cartes choisies une fois qu'elles sont sélectionnées
    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true);// Désactive temporairement les clics
            if (choiceOne.src === choiceTwo.src) {
                setCards((prevCards) =>
                    prevCards.map((card) =>
                        card.src === choiceOne.src ? { ...card, matched: true } : card
                    )
                );
                resetTurn();
            } else {
                setTimeout(resetTurn, 1000);// Réinitialise le tour après un délai d'une seconde si elles ne correspondent pas
            }
        }
    }, [choiceOne, choiceTwo]);

    // Réinitialise les choix et incrémente le compteur de tour
    const resetTurn = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns((prevTurns) => prevTurns + 1);
        setDisabled(false);
    };

    // Vérifie si toutes les cartes sont associées pour terminer le jeu
    useEffect(() => {
        if (cards.length > 0 && cards.every((card) => card.matched)) {
            clearInterval(intervalId);// Stoppe le chronomètre
            setTimeout(() => {
                setGameFinished(true);// Marque le jeu comme terminé
                const newHistory = [
                    ...history,
                    {
                        turns,
                        time: timer,
                        numCards,
                    },// Enregistre le score
                ];
                setHistory(newHistory);
                localStorage.setItem("gameHistory", JSON.stringify(newHistory));
            }, 500);
        }
    }, [cards]);

    // Fonction pour réinitialiser l'historique
    const resetHistory = () => {
        setHistory([]);
        localStorage.removeItem("gameHistory");
    };

    // Charge l'historique depuis le stockage local au chargement
    useEffect(() => {
        const savedHistory = JSON.parse(localStorage.getItem("gameHistory"));
        if (savedHistory) {
            setHistory(savedHistory);
        }
    }, []);

    // Annule la partie en cours
    const cancelGame = () => {
        setIsGameStarted(false);
        setGameFinished(false);
        setCards([]);
        setTurns(0);
        clearInterval(intervalId);
        setTimer(0);
    };

    // Réinitialise les paramètres et retourne à l'écran des paramètres
    const goToSettings = () => {
        setIsGameStarted(false);
        setGameFinished(false);
        setCards([]);
        clearInterval(intervalId);
    };

    // Active ou désactive l'affichage de l'historique des jeux
    const toggleHistory = () => {
        setShowHistory((prevState) => !prevState);
    };

    return (
        <div
            className="App"
            style={{
                background: `linear-gradient(135deg, ${backgroundColor}, #ff6b6b)`,
            }}
        >
            <h1>Big Brain Time</h1>
            {isGameStarted && !gameFinished && (
                <>
                    <button onClick={shuffleCards} className="new-game-btn">
                        New Game
                    </button>
                    <button onClick={cancelGame} className="cancel-game-btn">
                        Cancel Game
                    </button>
                    <p>
                        Time: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}
                    </p>
                </>
            )}
            {!isGameStarted && (
                <div className="settings">
                    <div className={"cards-dropdown"}>
                        <label>
                            Number of Cards:

                            <select
                                value={numCards}
                                onChange={(e) => setNumCards(Number(e.target.value))}
                            >
                                <option value={4}>4</option>
                                <option value={16}>16</option>
                                <option value={32}>32</option>
                            </select>

                        </label>
                    </div>
                        <div className="settings-icon" onClick={() => setShowSettings(!showSettings)}>
                            <FiSettings size={24}/>
                        </div>
                        {showSettings && (
                            <div className="settings-dropdown">
                                <label>
                                    <select
                                        value={backgroundColor}
                                        onChange={(e) => setBackgroundColor(e.target.value)}
                                    >
                                        {colors.map((color, index) => (
                                            <option key={index} value={color.value}>
                                                {color.name}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                        )}

                        <button onClick={shuffleCards}>Start Game</button>

                        <button onClick={toggleHistory} className="history-btn">
                            {showHistory ? "Hide History" : "Show History"}
                        </button>

                        {showHistory && (
                            <div className="game-history">
                                <h2>Game History</h2>
                                {history.length > 0 ? (
                                    <>
                                        <table className="history-table">
                                            <thead>
                                            <tr>
                                                <th>Game</th>
                                                <th>Turns</th>
                                                <th>Cards</th>
                                                <th>Time</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {history.map((game, index) => (
                                                <tr key={index}>
                                                    <td className="Games">Game {index + 1}</td>
                                                    <td>{game.turns}</td>
                                                    <td>{game.numCards}</td>
                                                    <td>{Math.floor(game.time / 60)}:{String(game.time % 60).padStart(2, "0")}</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                        <button
                                            onClick={resetHistory}
                                            className="reset-history-btn"
                                        >
                                            Reset History
                                        </button>
                                    </>
                                ) : (
                                    <p>No game history yet.</p>
                                )}
                            </div>
                        )}
                    </div>
                    )}
                    {isGameStarted && (
                        <div className={`card-grid ${gameFinished ? "winning" : ""}`}>
                            {cards.map((card) => (
                                <SingleCard
                                    key={card.id}
                                    card={card}
                                    handleChoice={handleChoice}
                                    flipped={card === choiceOne || card === choiceTwo || card.matched}
                                    disabled={disabled}
                                />
                            ))}
                        </div>
                    )}
                    {gameFinished && (
                        <div className="end-game">
                            <h2>🎉 You Win! 🎉</h2>
                            <p>
                                You completed the game in {turns} turns with {numCards} cards!
                            </p>
                            <p>
                                Total Time: {Math.floor(timer / 60)}:
                                {String(timer % 60).padStart(2, "0")}
                            </p>
                            <button onClick={goToSettings}>Go to Settings</button>
                        </div>
                    )}
                </div>
            );
            }

            export default App;
