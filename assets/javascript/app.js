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
var clock = 0;
var correct = 0;
var wrong = 0;
// when start is clicked or when it is clicked for a new round
$(".start").on("click", function () {
    count = -1;
    clock = 0;
    correct = 0;
    wrong = 0;
    nextQuestion();
});
// function to trigger the next question
function nextQuestion() {
    count++;
    clock = 31;
    var intervalId = setInterval(timer, 1000);
    $("#question-num").text(Questions[count].number);
    $("#question-text").text(Questions[count].question);
    $("#answer-a").text(Questions[count].answer_a);
    $("#answer-b").text(Questions[count].answer_b);
    $("#answer-c").text(Questions[count].answer_c);
    $("#answer-d").text(Questions[count].answer_d);
};
// function to activate timer clock
function timer() {
    clock--;
    $("#timer").text(clock);
};

// function that runs when player clicks on one of the possible answers
$(".answer").on("click", function () {
    var answer = $(this).text();
    // if the answer is correct
    if (answer === Answers[count]) {
        correct++;
        console.log("correct" + correct);
    }
    // if the answer is wrong
    else {
        wrong++;
        console.log("wrong" + wrong);
    };
    // since count is for index of the two arrays:
    // we need to add one to compare to length of the array to trigger end of game
    var counter = count + 1;
    // if we have reached the end of our questions, it ends game:
    if (counter === Questions.length) {
        endGame();
    }
    // if we still have more questions to go, move onto next question:
    else {
        nextQuestion();
    };
});
// function to trigger the end of the game, show the score, offer to play agin
function endGame() {
    $("#timer").text("");
    $(".start").text("CLICK HERE TO PLAY AGAIN");
    $("#question-text").text("");
    var sum = Math.floor((correct / (correct + wrong)) * 100);
    $("#answer-a").text("TRIVIA COMPLETE!");
    $("#answer-b").text("You scored a "+ sum + "%");
    $("#answer-c").text("Correct: " + correct);
    $("#answer-d").text("Wrong: " + wrong);
};
