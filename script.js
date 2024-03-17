setTimeout(function () {
  $("#flags").fadeOut("fast");
}, 5000);
const questions = [
  [
    {
      question:
        "What event sparked the beginning of the Russia-Ukraine War in February 2014?",
      options: [
        "The signing of an association agreement with the European Union",
        "The removal of President Viktor Yanukovych",
        "The annexation of Crimea by Russia",
        "The formation of local militias in eastern Ukraine",
      ],
      answer: 3,
    },
    {
      question:
        "Which Ukrainian city became a battleground during the protests in February 2014?",
      options: ["Donetsk", "Kharkiv", "Sevastopol", "Kyiv"],
      answer: 4,
    },
    {
      question:
        "What was the outcome of the referendum held in Crimea on March 16, 2014?",
      options: [
        "More than 95% of voters supported joining the Russian Federation",
        "A majority of voters supported remaining part of Ukraine",
        "The referendum was declared invalid by international observers",
        "The referendum resulted in a deadlock with equal votes for and against joining Russia",
      ],
      answer: 1,
    },
    {
      question:
        "What was the estimated total number of Russian military casualties, including both killed and wounded, according to Western intelligence officials just before the two-year anniversary of the invasion?",
      options: ["100,000", "320,000", "200,000", "500,000"],
      answer: 2,
    },
  ],
  [
    {
      question:
        "What was the main reason for the invasion of Iraq in March-April 2003?",
      options: [
        "To eliminate weapons of mass destruction",
        "To establish a democracy in Iraq",
        "To capture Saddam Hussein",
        "To secure oil reserves in the region",
      ],
      answer: 1,
    },
    {
      question:
        "How did Iraqi forces primarily respond to the invasion by U.S. and allied forces?",
      options: [
        "By launching chemical attacks",
        "By surrendering without much resistance",
        "By launching a counter-offensive from neighboring countries",
        "By engaging in scorched-earth tactics",
      ],
      answer: 2,
    },
    {
      question:
        "When did President George W. Bush declare an end to major combat in Iraq?",
      options: [
        "March 25, 2003",
        "April 4, 2003",
        "April 9, 2003",
        "May 1, 2003",
      ],
      answer: 4,
    },
    {
      question: "How was Saddam Hussein eventually captured by U.S. forces?",
      options: [
        "He surrendered willingly",
        "He was found hiding in Baghdad",
        "He was captured during a raid on his palace",
        "He was located after his sons were killed in a shootout",
      ],
      answer: 4,
    },
  ],
  [
    {
      question:
        "What event triggered the beginning of the Afghanistan War in 2001?",
      options: [
        "The assassination of Hamid Karzai",
        "The Taliban's seizure of power",
        "The assassination of Osama bin Laden",
        "The September 11 attacks",
      ],
      answer: 4,
    },
    {
      question:
        "What was the primary strategy implemented by the U.S. in Afghanistan after 2009?",
      options: [
        "Defeating the Taliban militarily",
        "Withdrawing all foreign forces immediately",
        "Focusing solely on nation-building efforts",
        "Protecting the population and reintegrating insurgents",
      ],
      answer: 4,
    },
    {
      question:
        "Which country provided the largest foreign force in Afghanistan during the war?",
      options: ["United Kingdom", "Canada", "United States", "Germany"],
      answer: 3,
    },
    {
      question:
        "What was one major factor contributing to the resurgence of the Taliban's presence in Afghanistan?",
      options: [
        "Lack of international support",
        "Adoption of new tactics such as suicide bombings",
        "Decline in opium production",
        "Success of reconstruction efforts",
      ],
      answer: 2,
    },
  ],
];

let currentQuestion = 0;
let currentSet = 0;

function loadQuestion() {
  const current = questions[currentSet][currentQuestion];
  document.getElementById("question").textContent = current.question;
  document.getElementById("option1").textContent = current.options[0];
  document.getElementById("option2").textContent = current.options[1];
  document.getElementById("option3").textContent = current.options[2];
  document.getElementById("option4").textContent = current.options[3];
}

function showMessage(message) {
  document.getElementById("message-container").textContent = message;
}

function generatePasscode() {
  let passcode = "";
  for (let i = 0; i < questions[currentSet].length; i++) {
    const answer = questions[currentSet][i].answer;
    passcode += answer;
  }
  document.getElementById("passcode").textContent = passcode;
  document.getElementById("passcode-container").style.display = "block";
}

function resetCurrentSet() {
  currentQuestion = 0;
  loadQuestion();
}

function checkAnswer() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  if (!selectedAnswer) {
    alert("Please select an answer.");
    return;
  }
  if (
    parseInt(selectedAnswer.value) ===
    questions[currentSet][currentQuestion].answer
  ) {
    currentQuestion++;
    if (currentQuestion < questions[currentSet].length) {
      loadQuestion();
    } else {
      generatePasscode();
    }
  } else {
    showMessage("Incorrect answer. Proceeding to the next question.");
    currentQuestion++;
    if (currentQuestion < questions[currentSet].length) {
      loadQuestion();
    } else {
      generatePasscode();
    }
  }
}

function checkPasscode() {
  const enteredPasscode = document.getElementById("passcode-input").value;
  const correctPasscode =
    questions[currentSet][0].answer.toString() +
    questions[currentSet][1].answer.toString() +
    questions[currentSet][2].answer.toString() +
    questions[currentSet][3].answer.toString();
  if (enteredPasscode === correctPasscode) {
    currentSet++;
    currentQuestion = 0;
    loadQuestion();
    document.getElementById("passcode-container").style.display = "none";
    showMessage("Next set of questions unlocked.");
  } else {
    showMessage(
      "Invalid passcode. Returning to the first question of the current set."
    );
    resetCurrentSet();
  }
}

// Load the first question
loadQuestion();
