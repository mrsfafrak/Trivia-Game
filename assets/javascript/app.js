// Questions variables
var question1 = {
    number: "Question #1",
    question: "Which uses less water when washing dishes?",
    answer_a: "a. Washing by hand",
    answer_b: "b. Using the dishwasher", // correct
    answer_c: "c. Doesn't matter",
    answer_d: ""
}
var question2 = {
    number: "Question #2",
    question: "Which type of bag is more ecofriendly at the store?",
    answer_a: "a. Plastic",
    answer_b: "b. Paper",
    answer_c: "c. Either one",
    answer_d: "d. None of the above" // correct
}
var question3 = {
    number: "Question #3",
    question: "Appliances that are turned off don't use electricity.",
    answer_a: "a. True",
    answer_b: "b. False", // correct
    answer_c: "c. Pigs can fly",
    answer_d: "d. I like turtles"
}
// end of Questions
// Questions into an array:
var Questions = [question1, question2, question3];
// Answers Array:
var Answers = ["b. Using the dishwasher", "d. None of the above", "b. False"]
// intital global variables defined
var count = -1;
var correct = 0;
var wrong = 0;
var clock;
var isPlayerGuessing = true;

// when start is clicked or when it is clicked for a new round
$(".start").on("click", function () {
    count = -1;
    correct = 0;
    wrong = 0;
    isPlayerGuessing=true;
    nextQuestion();
});

// function to trigger the next question
function nextQuestion() {
    isPlayerGuessing = false;
    count++;
    stopTimer();
    countdown = 31;
    startTimer();
    $("#question-num").text(Questions[count].number);
    $("#question-text").text(Questions[count].question);
    $("#answer-a").text(Questions[count].answer_a);
    $("#answer-b").text(Questions[count].answer_b);
    $("#answer-c").text(Questions[count].answer_c);
    $("#answer-d").text(Questions[count].answer_d);

};

// function that runs when player clicks on one of the possible answers
$(".answer").on("click", function () {
    isPlayerGuessing=true;
    var answer = $(this).text();
    // if the answer is correct
    if (answer === Answers[count]) {
        correct++;
        $("#question-num").text("");
        $("#question-text").text("You are correct!");
        $("#answer-a").text(Answers[count]);
        $("#answer-b").text("");
        $("#answer-c").text("");
        $("#answer-d").text("");
    }
    // if the answer is wrong
    else {
        wrong++;
        $("#question-num").text("");
        $("#question-text").text("Incorrect.");
        $("#answer-a").text("Correct answer was:");
        $("#answer-b").text(Answers[count]);
        $("#answer-c").text("");
        $("#answer-d").text("");
    };
    // clear the current time and start a 5 second timer
        stopTimer();
        countdown = 6;
        startTimer();
});

// function to trigger the end of the game, show the score, offer to play agin
function endGame() {
    stopTimer();
    $("#timer").text("");
    $(".start").text("CLICK HERE TO PLAY AGAIN");
    $("#question-text").text("");
    var sum = Math.floor((correct / (correct + wrong)) * 100);
    $("#answer-a").text("TRIVIA COMPLETE!");
    $("#answer-b").text("You scored a " + sum + "%");
    $("#answer-c").text("Correct: " + correct);
    $("#answer-d").text("Wrong: " + wrong);
};

// function to activate timer clock
function startTimer() {
    clock = setInterval(time, 1000);
};
// function within startTimer function
function time() {
    countdown--;
    $("#timer").text(countdown);
    var counter = count + 1;
    if (counter === Questions.length && countdown === 0){
        endGame();
    }
    else if(countdown === 0 && isPlayerGuessing){
        $("#question-num").text("");
        $("#question-text").text("You are correct!");
        $("#answer-a").text(Answers[count]);
        $("#answer-b").text("");
        $("#answer-c").text("");
        $("#answer-d").text("");
        stopTimer();
        countdown = 6;
        startTimer();
        nextQuestion();
    }
    else if (countdown === 0 && isPlayerGuessing===false){
        wrong++;
        $("#question-num").text("");
        $("#question-text").text("Out of time!");
        $("#answer-a").text("Correct answer was:");
        $("#answer-b").text(Answers[count]);
        $("#answer-c").text("");
        $("#answer-d").text("");
        isPlayerGuessing = true;
        stopTimer();
        countdown = 6;
        startTimer();
    }
};
// function to stop/clear timer clock
function stopTimer() {
    clearInterval(clock);
};
