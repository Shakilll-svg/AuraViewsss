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
    e.preventDefault();
    
    // Simula l'invio del form
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    
    // Mostra un messaggio di conferma
    alert(`Grazie ${name}! La tua richiesta è stata inviata. Ti contatterò presto per il tuo edit personalizzato!`);
    
    // Resetta il form
    contactForm.reset();
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
