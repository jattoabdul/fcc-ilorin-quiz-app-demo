/* ----------------------------------------------
|   GLOBAL VARIABLE DECLARATION
|     QUESTIONS - holds questions, choices, and answers
|     SESSIONS - holds session data
|_______________________________________________*/

const QUESTIONS = [
  {question: "Who does Michael accidentally hit with his car in the parking lot?", 
    choices: ['Meredith', 'Phyllis', 'Ryan', 'Kelly'], 
    answer: 0
  },
  {question: "On the night Pam got really drunk at the Dundies and kissed Jim, what did she win her Dundie for?", 
    choices: ['Best Employee', 'Longest Engagement', 'Tidiest Desk', 'Whitest sneakers'], 
    answer: 3
  },
  {question: 'According to "Prison Mike", what is the worst thing about prison?', 
    choices: ['The orcs', 'The dementors', 'The goblins', 'The banshees'], 
    answer: 1
  },
  {question: "What is the name of the company Ryan sets up that sends messages to all of your devices at once?", 
    choices: ['Wuphf', 'Barkk', 'Grrowl', 'Meeow'], 
    answer: 0
  },
  {question: "What does Michael pick as his username when he signs up for an online dating site?", 
    choices: ['LittleKidLover', 'WorldsBestBoss', 'HappyCuddler', 'IAmTheBoss'], 
    answer: 0
  },
  {question: "How long had Jim and Pam been dating when he bought her engagement ring?", 
    choices: ['A day', 'A week', 'A month', 'A year'], 
    answer: 1
  },
  {question: 'What is the name of "the senator", who Angela marries, but is actually gay and has an affair with Oscar?', 
    choices: ['Randy', 'Richard', 'Robert', 'Rick'],
    answer: 2
  },
  {question: "Which country does Toby move to when he leaves his job at Dunder Mifflin, only to return later?", 
    choices: ['Cuba', 'Jamaica', 'Guam', 'Costa Rica'], 
    answer: 3
  },
  {question: "What is the name of Angela's cat, which Dwight kills by putting it in the freezer?", 
    choices: ['Bandit', 'Tinkerbell', 'Sprinkles', 'Button'], 
    answer: 2
  },
  {question: "According to Dwight, nostalgia is one of the greatest human weaknesses, second only to what?", 
    choices: ['Emotion', 'The eyes', 'The neck', 'The legs'], 
    answer: 2
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
  
  const htmlOne = `  <div class="js-question" data-page-index="${currentPage}" data-question-index="${questionIndex}">
      <h2>Question ${currentPage}</h2>
      <hr class="line">
      <h3 class="question">${question}</h3>
      <div class="feedback-message">
      </div>
      <form id="js-question-form">
        <ul>`;
  let htmlTwo = ``;
  for (let i = 0; i < choices.length; i++) {
    if (i === 0) {
      htmlTwo += `<li class="js-choices">
                <input type="radio" class="js-radio" id="answer${i}" name="answer" value="${choices[i]}" data-answer-index="${i}" required="required">
                <label for="answer${i}">${choices[i]}</label>
              </li>`;
    } else {
      htmlTwo += `<li class="js-choices">
                <input type="radio" class="js-radio" id="answer${i}" name="answer" value="${choices[i]}" data-answer-index="${i}">
                <label for="answer${i}">${choices[i]}</label>
              </li>`;
      }
  }
  const htmlThree = `</ul>
      </form>
      <button type="submit" class="js-question-button">Submit Answer</button>
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
    <hr class="line">
    <div class="img-content">
      <img src="https://www.nbc.com/sites/nbcunbc/files/files/styles/640x360/public/images/2016/1/19/MDot-TheOffice-640x360-MP.jpg?itok=Gn98SGYE" alt="The Office Crew">
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
        <button type="submit" class="js-start-button">Start Questionaire</button>
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
  return `  <div class="js-result" data-page-index="0">
    <h2>Results</h2>
    <hr class="line">
    <div class="img-content">
      <img src="http://popgoestheweek.com/wp-content/uploads/2011/11/Dunder-Mifflin-Logo-Cast-the-office-28us-29-34267_1024_819.jpg" alt="Michael Scott of Dunder Mifflin Paper Company">
    <div class="feedback-message">
      ${message}
    </div>
    <form id="js-result-form">
      <button type="submit" class="js-result-button">Try Again</button>
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
  return `       <div class="progress" data-label="${percentageCompleted}% of the Questions Completed">
  <span class="value" style="width: ${percentageCompleted}%"></span>
</div>
        <div class="progress-text">
          <ul>
            <li>
              <span class="progress-name">${name}'s</span>
              <span class="progress-name-text">Progress</span
            </li>
            <li>
              <span class="span-label">Question:</span>
              <div class="fraction ${large}">
                <span class="fractop">${currentQuestion}</span>&frasl;<span class="fracbot">10</span>
              </div>
            </li>
            <li>
              <span class="span-label">Correct:</span>
              <div class="fraction">
                <span class="fractop">${correct}</span>&frasl;<span class="fracbot">10</span>
              </div>
            </li>
          </ul>
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
      html = `<p class="correct">You have entered the correct answer!<br>Moving onto the next question...!</p>`;
      break;
    case `wrong`:
      html = `<p class="wrong">You have entered an incorrect answer!<br>Let's do better on the next question...!</p>`;
      break;
    case 'again':
      html = `<p class="warning">Returning to the Introduction Page shortly...!</p>`;
      break;
    case 'pass':
      return `<p class="correct">You have passed the Interview Questionaire with a ${percentCorrect}%!<br> Welcome to the team!</p>`;
    case 'fail':
      return `<p class="wrong">You have failed the Interview Questionaire with a ${percentCorrect}%!<br>Try again next time, ${name}!</p>`;
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
    $('.js-question').find('input:checked').closest('li').removeClass('selected').addClass('wrong-select');
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

// function handleTest() {
//   $('footer').on('click', '.js-test-button', function(event) {
//     event.preventDefault();
//     const pageRequest = $('.page-request').val();
//     let dummySession = {person: {first: 'Test', last: 'Dummy'},
//                         currentPage: pageRequest,
//                         answers: [],
//                         correct: 3,
//                         incorrect: 2
//                       };
//     let questionRequest = '';
//     if (pageRequest === 0) {
//       questionRequest = 0
//     } else {
//       questionRequest = pageRequest - 1;
//     }
//     for (let i = 0; i < questionRequest; i++) {
//       dummySession.answers.push('1');
//     }
//     setDummySession(dummySession);
//     renderQuiz();
//   });
// }

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
