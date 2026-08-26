// Dati del quiz Aura
const quizData = [
    {
        question: "Hai fatto cadere il telefono ma lo hai preso al volo con i piedi?",
        options: [
            { text: "Sì, è successo davvero!", points: 10000 },
            { text: "No, ma l'ho preso con una mano", points: 5000 },
            { text: "No, si è rotto 😢", points: -2000 },
            { text: "Non ho mai fatto cadere il telefono", points: 2000 }
        ]
    },
    {
        question: "Sei riuscito a prendere il tuo cappello mentre cadeva con la punta dei piedi?",
        options: [
            { text: "Ovviamente, è base!", points: 15000 },
            { text: "Ci ho provato ma non sono riuscito", points: 3000 },
            { text: "No, non l'ho nemmeno notato", points: -1000 },
            { text: "Non porto cappelli", points: 0 }
        ]
    },
    {
        question: "Hai mai aperto una porta con i gomiti perché avevi le mani occupate?",
        options: [
            { text: "Sì, ed è uscito perfetto", points: 8000 },
            { text: "Sì, ma è stato disastroso", points: 1000 },
            { text: "No, ho sempre chiesto aiuto", points: -500 },
            { text: "Non ho mai avuto le mani occupate", points: 500 }
        ]
    },
    {
        question: "Hai mai beccato qualcosa che cadeva mentre eri distratto?",
        options: [
            { text: "Sì, riflessi da gatto!", points: 12000 },
            { text: "Sì, ma mi è quasi caduto addosso", points: 4000 },
            { text: "No, ho guardato cadere tutto", points: -1500 },
            { text: "Sono sempre attento", points: 3000 }
        ]
    },
    {
        question: "Sei riuscito a prendere le chiavi mentre cadevano con una mano sola?",
        options: [
            { text: "Ovviamente, skill da maestro", points: 11000 },
            { text: "Ci ho provato ma le ho perse", points: 2000 },
            { text: "No, sono cadute a terra", points: -1000 },
            { text: "Non mi è mai capitato", points: 1000 }
        ]
    },
    {
        question: "Hai mai fatto un trick al volo con un oggetto senza provarci?",
        options: [
            { text: "Sì, ed è uscito perfetto!", points: 13000 },
            { text: "Sì, ma è stato per caso", points: 5000 },
            { text: "No, non ho questa abilità", points: -500 },
            { text: "Non mi piace rischiare", points: 0 }
        ]
    },
    {
        question: "Sei riuscito a prendere un bicchiere che stava cadendo con una mano?",
        options: [
            { text: "Sì, riflessi istantanei!", points: 9000 },
            { text: "Sì, ma ne ho versato un po'", points: 3000 },
            { text: "No, si è rotto tutto", points: -2000 },
            { text: "Non bevo mentre sono in movimento", points: 500 }
        ]
    }
];

// Variabili di stato
let currentQuestion = 0;
let totalScore = 0;
let selectedOption = null;

// Elementi DOM
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const auraScoreElement = document.getElementById('aura-score');
const resultMessageElement = document.getElementById('result-message');
const restartBtn = document.getElementById('restart-btn');

// Inizializza il quiz
function initQuiz() {
    currentQuestion = 0;
    totalScore = 0;
    selectedOption = null;
    showQuestion();
}

// Mostra la domanda corrente
function showQuestion() {
    const currentData = quizData[currentQuestion];
    questionElement.textContent = currentData.question;
    
    // Aggiorna progress bar
    const progressFill = document.getElementById('progress-fill');
    const currentQuestionNum = document.getElementById('current-question');
    const totalQuestionsNum = document.getElementById('total-questions');
    
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressFill.style.width = progress + '%';
    currentQuestionNum.textContent = currentQuestion + 1;
    totalQuestionsNum.textContent = quizData.length;
    
    // Pulisci le opzioni precedenti
    optionsElement.innerHTML = '';
    selectedOption = null;
    nextBtn.disabled = true;
    
    // Crea le nuove opzioni
    currentData.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option.text;
        optionElement.addEventListener('click', () => selectOption(index, option.points));
        optionsElement.appendChild(optionElement);
    });
}

// Seleziona un'opzione
function selectOption(index, points) {
    // Rimuovi la selezione precedente
    const options = optionsElement.querySelectorAll('.option');
    options.forEach(opt => opt.classList.remove('selected'));
    
    // Aggiungi la selezione corrente
    options[index].classList.add('selected');
    selectedOption = points;
    nextBtn.disabled = false;
}

// Passa alla prossima domanda o mostra il risultato
function nextQuestion() {
    totalScore += selectedOption;
    currentQuestion++;
    
    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        showResult();
    }
}

// Mostra il risultato finale
function showResult() {
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    
    // Anima il punteggio
    animateScore(totalScore);
    
    // Genera il messaggio in base al punteggio
    const message = generateMessage(totalScore);
    resultMessageElement.textContent = message;
}

// Anima il punteggio
function animateScore(finalScore) {
    let currentDisplay = 0;
    const increment = finalScore > 0 ? Math.ceil(finalScore / 50) : Math.floor(finalScore / 50);
    
    const animation = setInterval(() => {
        currentDisplay += increment;
        
        if ((increment > 0 && currentDisplay >= finalScore) || 
            (increment < 0 && currentDisplay <= finalScore)) {
            currentDisplay = finalScore;
            clearInterval(animation);
        }
        
        auraScoreElement.textContent = `${currentDisplay > 0 ? '+' : ''}${currentDisplay} AURA`;
    }, 30);
}

// Genera il messaggio in base al punteggio
function generateMessage(score) {
    if (score >= 25000) {
        return "🔥 LEGGENDARIO! Sei il Signore dell'Aura!anche Skibidi ti rispetta!";
    } else if (score >= 15000) {
        return "⚡ EPICO! Il tuo aura è fuori scala!Rizz god!";
    } else if (score >= 5000) {
        return "✨ OTTIMO! Hai un aura solido!Continua così!";
    } else if (score >= 0) {
        return "👍 NELLA MEDIA! Il tuo aura è decente...ma puoi migliorare!";
    } else if (score >= -1000) {
        return "😅 RIPROVA! Hai perso un po' di aura...ma c'è speranza!";
    } else {
        return "💀 CRITICAL FAIL! Il tuo aura è in negativo...disastro totale!";
    }
}

// Riavvia il quiz
function restartQuiz() {
    resultContainer.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    initQuiz();
}

// Event listeners
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);

// Gestione del form di contatto
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    // Il form viene inviato direttamente a Formspree
    // Non blocchiamo l'invio con e.preventDefault()
    
    // Mostra un messaggio di caricamento
    const submitBtn = contactForm.querySelector('.submit-btn');
    submitBtn.textContent = 'INVIANDO...';
    submitBtn.disabled = true;
});

// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 2000); // 2 secondi di preloader
});

// Scroll Animations
const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('.theme-icon');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    
    if (document.body.classList.contains('light-mode')) {
        themeIcon.textContent = '☀️';
    } else {
        themeIcon.textContent = '🌙';
    }
});

// Inizializza il quiz quando la pagina è caricata
document.addEventListener('DOMContentLoaded', initQuiz);

// Effetto hover pulsante CTA
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('mouseenter', () => {
        ctaButton.style.background = 'linear-gradient(45deg, #cc0000, #ff0000)';
    });
    
    ctaButton.addEventListener('mouseleave', () => {
        ctaButton.style.background = 'linear-gradient(45deg, #ff0000, #cc0000)';
    });
}

// Minigame Aura Clicker
const minigameArea = document.getElementById('minigame-area');
const startGameBtn = document.getElementById('start-game');
const gameScore = document.getElementById('game-score');
const gameTime = document.getElementById('game-time');
const gameMessage = document.getElementById('game-message');

let gameInterval;
let score = 0;
let timeLeft = 30;
let gameActive = false;

function startGame() {
    if (gameActive) return;
    
    gameActive = true;
    score = 0;
    timeLeft = 30;
    gameScore.textContent = score;
    gameTime.textContent = timeLeft;
    gameMessage.textContent = '';
    startGameBtn.disabled = true;
    
    // Clear and reposition targets
    minigameArea.innerHTML = '';
    createTargets();
    
    // Start timer
    gameInterval = setInterval(() => {
        timeLeft--;
        gameTime.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function createTargets() {
    const targets = ['⚡', '🔥', '✨', '💎'];
    const points = [10, 20, 15, 25];
    
    targets.forEach((emoji, index) => {
        const target = document.createElement('div');
        target.className = 'click-target';
        target.textContent = emoji;
        target.dataset.points = points[index];
        
        // Random position
        target.style.left = Math.random() * 80 + 10 + '%';
        target.style.top = Math.random() * 80 + 10 + '%';
        
        target.addEventListener('click', (e) => {
            if (!gameActive) return;
            
            const points = parseInt(e.target.dataset.points);
            score += points;
            gameScore.textContent = score;
            
            // Reposition target
            e.target.style.left = Math.random() * 80 + 10 + '%';
            e.target.style.top = Math.random() * 80 + 10 + '%';
            
            // Visual feedback
            e.target.style.transform = 'scale(1.5)';
            setTimeout(() => {
                e.target.style.transform = 'scale(1)';
            }, 100);
        });
        
        minigameArea.appendChild(target);
    });
}

function endGame() {
    clearInterval(gameInterval);
    gameActive = false;
    startGameBtn.disabled = false;
    
    let message = '';
    if (score >= 500) {
        message = '🔥 LEGGENDARIO! ' + score + ' punti!';
    } else if (score >= 300) {
        message = '⚡ EPICO! ' + score + ' punti!';
    } else if (score >= 150) {
        message = '✨ OTTIMO! ' + score + ' punti!';
    } else {
        message = '👍 ' + score + ' punti - Prova ancora!';
    }
    
    gameMessage.textContent = message;
}

startGameBtn.addEventListener('click', startGame);

// Smooth scroll per la navigazione
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Parallax effect sul header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const scrolled = window.pageYOffset;
    
    if (scrolled < 600) {
        header.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});
