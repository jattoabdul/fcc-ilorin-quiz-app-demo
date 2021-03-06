/* ----------------------------------------------
|   GLOBAL VARIABLE DECLARATION
|     QUESTIONS - holds questions, choices, and answers
|     SESSIONS - holds session data
|_______________________________________________*/

const QUESTIONS = [
  {question: "JSON name/value pair is written as?", 
    choices: ['name’ : ‘value’',
              'name = ‘value’',
              'name = “value”',
              '“name” : “value”'], 
    answer: 3
  },
  {question: "JSON strings have to be in?", 
    choices: ['single quote', 'double quote', 'single quote or double quote', 'none of the above'], 
    answer: 1
  },
  {question: 'Which of the following is not a JSON type?', 
    choices: ['Object', 'date', 'Array', 'string'], 
    answer: 1
  },
  {question: "What is the file extension of JSON?", 
    choices: ['.jn', '.js', '.jsn', '.json'], 
    answer: 3
  },
  {question: "In modern websites what is the common usage for JSON?", 
    choices: ['To store information remotely', 'To send and receive bits of data.', 'To store information locally.', 'None of the above'], 
    answer: 1
  },
  {question: "Which of these is a benefit JSON has over XML?", 
    choices: ['JSON is more forgiving of poor formatting',
      'JSON has less markup requirements and therefore is lighter than XML',
      'JSON can be written poorly and still be parsed',
      'JSON does not need to be stored in a file to be sent remotely'], 
    answer: 1
  },
  {question: 'What does JSON stand for?', 
    choices: ['JavaScript Object Nomenclature',
      'JavaScript Objective Notation',
      'JavaScript Object Notation',
      'JavaScript Orientated Nomenclature'],
    answer: 2
  },
  {question: "JSON elements are separated by?", 
    choices: ['semi-colon', 'line break', 'comma', 'white space'], 
    answer: 2
  },
  {question: "What keywords are reserved in JSON and cannot be used as keys?", 
    choices: ['Value', 'Object', 'There are none.', 'Key'], 
    answer: 2
  },
  {question: "Which of these data interchange formats has seen a decline in usage in favor of JSON?", 
    choices: ['ASCII', 'Plain-text', 'SQL', 'XML'], 
    answer: 3
  }
];

const SESSION = {
  person: {first: '', last: ''},
  pages: [
    'Start',
    {questionIndex: 0},
    {questionIndex: 1},
    {questionIndex: 2},
    {questionIndex: 3},
    {questionIndex: 4},
    {questionIndex: 5},
    {questionIndex: 6},
    {questionIndex: 7},
    {questionIndex: 8},
    {questionIndex: 9},
    'Result'],
  currentPage: 0,
  answers: [],
  correct: 0,
  incorrect: 0
};

/* ----------------------------------------------
|   
|   GET AND SET FUNCTIONS FOR GLOBAL VARIABLE
|_______________________________________________*/

function setDummySession(dummySession) {
  SESSION.person = dummySession.person;
  SESSION.currentPage = dummySession.currentPage;
  SESSION.answers = dummySession.answers;
  SESSION.correct = dummySession.correct;
  SESSION.incorrect = dummySession.incorrect;
}

function resetSession() {
  SESSION.currentPage = 0;
  SESSION.answers = [];
  SESSION.correct = 0;
  SESSION.incorrect = 0;
}

function getSessionName() {
  if (SESSION.person.first == '') {
    return `Applicant`;
  } else {
    return `${SESSION.person.first} ${SESSION.person.last}`;
  }
}

function getSessionFirstName() {
  return SESSION.person.first;
}

function getSessionLastName() {
  return SESSION.person.last;
}

function setSessionName(firstName, lastName) {
  SESSION.person.first = firstName;
  SESSION.person.last = lastName;
}

function getCurrentpage() {
  return SESSION.currentPage;
}

function goToNextPage() {
  SESSION.currentPage++
}

function setSessionAnswers(userAnswer) {
  SESSION.answers.push(userAnswer);
}

function addSessionCorrect() {
  SESSION.correct++;
}

function addSessionIncorrect() {
  SESSION.incorrect++;
}

function getSessionCorrect() {
  return SESSION.correct;
}

function getSessionCurrentQuestion() {
  if (SESSION.currentPage === 0) {
    return 0;
  } else if (SESSION.answers.length === 10) {
    return SESSION.answers.length;
  } else {
    return SESSION.answers.length + 1;
  }
}

function getNumberOfCompletedQuestions() {
  return SESSION.answers.length;
}

function getQuestionIndex(currentPage) {
  return SESSION.pages[currentPage].questionIndex;
}

/* ----------------------------------------------
|   
|   QUIZ QUESTION PAGE RENDERING FUNCTIONS
|_______________________________________________*/

function generateQuestionElement(questionIndex, currentPage) {
  const question = QUESTIONS[questionIndex].question;
  const choices = QUESTIONS[questionIndex].choices;
  const answer = QUESTIONS[questionIndex].answer;
  
  const htmlOne = `<div class="js-question"
    data-page-index="${currentPage}"
    data-question-index="${questionIndex}">
    <h3 class="question"><span class="question-number">${currentPage} </span>${question}</h3>
    <div class="feedback-message">
    </div>
    <form id="js-question-form">
      <ul>`;
  let htmlTwo = ``;
  for (let i = 0; i < choices.length; i++) {
    if (i === 0) {
      htmlTwo += `<li class="js-choices">
                    <div><input type="radio" class="js-radio" id="answer${i}"
                      name="answer" value="${choices[i]}" data-answer-index="${i}"
                      required="required">
                      <label for="answer${i}">${choices[i]}</label>
                    </div>
                  </li>`;
    } else {
      htmlTwo += `<li class="js-choices">
                    <div><input type="radio" class="js-radio" id="answer${i}"
                      name="answer" value="${choices[i]}" data-answer-index="${i}">
                      <label for="answer${i}">${choices[i]}</label>
                    </div>
                  </li>`;
      }
  }
  const htmlThree = `</ul>
                    </form>
                    <button type="submit" class="btn btn-primary js-question-button">Submit Answer</button>
                  </div>`;
  return htmlOne + htmlTwo + htmlThree;
}

function generateQuizQuestionSectionString() {
  const currentPage = getCurrentpage();
  const questionIndex = getQuestionIndex(currentPage);
  return generateQuestionElement(questionIndex, currentPage);
}

/* ----------------------------------------------
|   
|   QUIZ STARTER PAGE RENDERING FUNCTIONS
|_______________________________________________*/

function generateQuizStartSectionString() {
  return `  <div class="js-start" data-page-index="0">
  <h2>Introduction</h2>
  <div class="image-content">
  </div>
  <div class="name-content">
    <p>Let's see how serious you are in joining us!</p>
    <form id="js-start-form">
      <div class="textinput">
        <input id="firstname" class="js-first-name-input" type="text" name="first" required>
        <label for="firstname">First Name</label>
      </div>
      <div class="textinput">
        <input id="lastname" class="js-last-name-input" type="text" name="last" required>
        <label for="lastname">Last Name</label>
      </div>
      <button type="submit" class="btn btn-primary js-start-button">Start Interview</button>
    </form>
  </div>
</div>`;
}

/* ----------------------------------------------
|   
|   QUIZ RESULTS PAGE RENDERING FUNCTIONS
|_______________________________________________*/

function generateQuizResultSectionString() {
  const correct = getSessionCorrect();
  const percentCorrect = (correct / 10) * 100;
  let message = '';
  if (percentCorrect >= 70) {
    message = showFeedbackMessage('pass', percentCorrect);
  } else {
    message = showFeedbackMessage('fail', percentCorrect);
  }
  return `<div class="js-result" data-page-index="0">
            <h5>Stats</h5>
            <div class="img-content">
              <!-- <img src="http://popgoestheweek.com/wp-content/uploads/2011/11/Dunder-Mifflin-Logo-Cast-the-office-28us-29-34267_1024_819.jpg" alt="Michael Scott of Dunder Mifflin Paper Company"> -->
            <div class="feedback-message">
              ${message}
            </div>
            <form id="js-result-form">
              <button type="submit" class="btn btn-primary js-result-button">Try Again</button>
            </form>
            </div>
          </div>`;
}

/* ----------------------------------------------
|   
|   QUIZ PROGRESS SECTION RENDERING FUNCTIONS
|_______________________________________________*/

function generateProgressSectionString() {
  const correct = getSessionCorrect();
  const currentQuestion = getSessionCurrentQuestion();
  const completedQuestions = getNumberOfCompletedQuestions();
  const percentageCompleted = completedQuestions * 10;
  const name = getSessionName();
  let large = '';
  if (currentQuestion === 10) {
    large = 'large';
  }
  return `<div class="progress">
            <div class="determinate"
              style="width: ${percentageCompleted}%"
              data-label="${percentageCompleted}% of the Questions Completed">
            </div>
          </div>
          <div class="stats-text">
            ${name}: ${currentQuestion}/10 questions | ${correct}/10 correct answers
          </div>`;
}


/* ----------------------------------------------
|   
|   QUIZ SUBMIT FORM RENDERING FUNCTIONS
|_______________________________________________*/

function showFeedbackMessage(message, percentCorrect = '') {
  const name = getSessionName();
  let html = ``;
  switch (message) {
    case 'undefined':
      html = `<p class="error">You have not selected an answer.<br>Please select an answer before submitting your answer.</p>`;
      break;
    case 'correct':
      html = `<p class="success">You have entered the correct answer!<br>Moving onto the next question...!</p>`;
      break;
    case `wrong`:
      html = `<p class="failure">You have entered an incorrect answer!<br>Let's do better on the next question...!</p>`;
      break;
    case 'again':
      html = `<p class="warning">Returning to the Introduction Page shortly...!</p>`;
      break;
    case 'pass':
      return `<p class="success">You have passed the Interview Questionaire with a ${percentCorrect}%!<br> Welcome to the team, ${name}!</p>`;
    case 'fail':
      return `<p class="failure">You have failed the Interview Questionaire with a ${percentCorrect}%!<br>Try again next time, ${name}!</p>`;
  }
  $('.feedback-message').empty().append(html);
}

function showCorrectAnswer(userAnswer, questionIndex, event) {
  const rightAnswer = QUESTIONS[questionIndex].answer;
  console.log(rightAnswer);
  if (userAnswer === rightAnswer) {
    $('.js-question').find(`[data-answer-index='${rightAnswer}']`).closest('li').removeClass('selected').addClass('correct-select');
  } else {
    $('.js-question').find(`[data-answer-index='${rightAnswer}']`).closest('li').addClass('correct-select');
    $('.js-question').find('input:checked').closest('li').removeClass('selected').addClass('wrong-selected');
  }
}

function checkUserAnswer(userAnswer, questionIndex, event) {
  const checkAnswer =  parseInt(userAnswer) === QUESTIONS[questionIndex].answer ? true : false;
  if (checkAnswer) {
    showFeedbackMessage('correct');
    showCorrectAnswer(parseInt(userAnswer), questionIndex, event);
    addSessionCorrect();
  } else {
    showFeedbackMessage('wrong');
    showCorrectAnswer(parseInt(userAnswer), questionIndex, event);
    addSessionIncorrect();
  }
}

function handleStartFormSubmit() {
  $('#js-start-form').submit(function(event) {
    event.preventDefault();
    const firstName = $('.js-first-name-input').val();
    const lastName = $('.js-last-name-input').val();
    setSessionName(firstName, lastName);
    goToNextPage();
    renderQuiz();
    $('html, body').animate({
         scrollTop: $("#top").offset().top
    }, 200);
    return false;
  });
}

function handleQuestionFormSubmit() {
  $('main').on('click', '.js-question-button', function(event) {
    const userAnswer = $('input[name="answer"]:checked').attr('data-answer-index');
    const questionIndex = $(event.currentTarget).closest('.js-question').attr('data-question-index');
    if (userAnswer) {
      setSessionAnswers(userAnswer);
      checkUserAnswer(userAnswer, questionIndex, event);
      goToNextPage(SESSION);
      setTimeout(renderQuiz, 2000);
      $('html, body').animate({
           scrollTop: $("#top").offset().top
      }, 200);
      return false;
    } else {
      showFeedbackMessage('undefined');
    }
  });
}

function handleNameInputFields() {
  $('main').on('keyup', '.js-first-name-input', function(event) {
    if ($(event.currentTarget).val() !== "") {
      $(event.currentTarget).addClass('filled');
    } else {
      $(event.currentTarget).removeClass('filled');
    }
  });
  $('main').on('keyup', '.js-last-name-input', function(event) {
    if ($(event.currentTarget).val() !== "") {
      $(event.currentTarget).addClass('filled');
    } else {
      $(event.currentTarget).removeClass('filled');
    }
  });
}

function handleQuestionFormSelection() {
  $('main').on('click', '.js-choices', function(event) {
    $('.js-choices').removeClass('selected');
    $(event.currentTarget).addClass('selected');
    $(event.currentTarget).find('input:radio').prop('checked', true);
  });
}

function handleResultFormSubmit() {
  $('main').on('click', '.js-result-button', function(event) {
    event.preventDefault();
    resetSession();
    showFeedbackMessage('again');
    setTimeout(renderQuiz, 2000);
    $('html, body').animate({
      scrollTop: $("#top").offset().top
    }, 2200);
  });
}

/* ----------------------------------------------
|   
|   QUIZ MAIN FUNCTIONS
|_______________________________________________*/

function renderQuiz() {
  let mainHtml = '';
  let progressHtml = '';
  switch (getCurrentpage()) {
    case 0:
      mainHtml = generateQuizStartSectionString();
      progressHtml = generateProgressSectionString();
      break;
    case 11:
      mainHtml = generateQuizResultSectionString();
      progressHtml = generateProgressSectionString();
      break;
    default:
      mainHtml = generateQuizQuestionSectionString();
      progressHtml = generateProgressSectionString();
      break;
  }
  $('.main').empty().append(mainHtml);
  $('.progress-section').empty().append(progressHtml);
}

function handleQuiz() {
  renderQuiz();
  handleStartFormSubmit();
  handleQuestionFormSubmit();
  handleNameInputFields();
  handleQuestionFormSelection();
  handleResultFormSubmit();
  // handleTest();
}

$(handleQuiz);
