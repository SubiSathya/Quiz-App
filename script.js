let users = {};
let currentUser = null;
let score = 0;
let currentQuestionIndex = 0;

const questions = [
    { question: "What is the output of `print(5 + 5)`?", options: ["10", "5", "20", "Error"], answer: "10" },
    { question: "Purpose of `break` statement?", options: ["Exit loop", "Restart loop", "Skip iteration", "Error"], answer: "Exit loop" },
    { question: "Difference between `==` and `=`?", options: ["Comparison/Assignment", "Assignment/Comparison"], answer: "Comparison/Assignment" },
    { question: "Time complexity of `for i in range(n):`?", options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"], answer: "O(n)" },
    { question: "Purpose of `try-except` block?", options: ["Handle runtime errors", "Optimize performance"], answer: "Handle runtime errors" }
];

function showSection(sectionId) {
    document.querySelectorAll(".section").forEach(section => section.classList.remove("active"));
    document.getElementById(sectionId).classList.add("active");
}

function registerUser() {
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;
    
    if (username && password) {
        if (!users[username]) {
            users[username] = { password, score: 0 };
            alert("User registered successfully!");
            document.getElementById("register-username").value = "";
            document.getElementById("register-password").value = "";
            showSection("login-section");
        } else {
            alert("Username already exists!");
        }
    } else {
        alert("Please fill in both fields.");
    }
}

function loginUser() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    if (users[username] && users[username].password === password) {
        currentUser = username;
        alert("Login successful!");
        showSection("quiz-section");
        loadQuestion();
    } else {
        alert("Invalid username or password.");
    }
}

function loadQuestion() {
    const questionContainer = document.getElementById("question-container");
    const question = questions[currentQuestionIndex];
    let optionsHTML = '';

    question.options.forEach((option, index) => {
        optionsHTML += `
            <button class="option-button" onclick="selectAnswer('${option}')">
                ${option}
            </button>`;
    });

    questionContainer.innerHTML = `<h3>${question.question}</h3>${optionsHTML}`;
}

function selectAnswer(selectedAnswer) {
    const question = questions[currentQuestionIndex];
    if (selectedAnswer === question.answer) {
        score++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    users[currentUser].score = score;
    document.getElementById("score-display").innerText = `Your score: ${score}/${questions.length}`;
    showSection("ranking-section");
    updateRanking();
}

function updateRanking() {
    const rankingList = document.getElementById("ranking-list");
    const sortedUsers = Object.entries(users).sort((a, b) => b[1].score - a[1].score);

    rankingList.innerHTML = sortedUsers.map(([username, userData], index) => {
        return `<p>${index + 1}. ${username} - Score: ${userData.score}</p>`;
    }).join('');
}
