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

var Questions = [question1, question2, question3];
var Answers = ["b. Using the dishwasher", "d. None of the above", "b. False"]
var count = -1;
var clock = 0;
var correct = 0;
var wrong = 0;

$(".start").on("click", function () {
    nextQuestion();
});

function nextQuestion() {
    clock = 31;
    var intervalId = setInterval(timer, 1000);
    count++;
    $("#question-num").text(Questions[count].number);
    $("#question-text").text(Questions[count].question);
    $("#answer-a").text(Questions[count].answer_a);
    $("#answer-b").text(Questions[count].answer_b);
    $("#answer-c").text(Questions[count].answer_c);
    $("#answer-d").text(Questions[count].answer_d);
};

function timer() {
    clock--;
    $("#timer").text(clock);
};

$(".answer").on("click", function () {
    var answer = $(this).text();
    if (answer === Answers[count]) {
        nextQuestion();
        correct++;
        console.log("correct" + correct);
    }
    else {
        nextQuestion();
        wrong++;
        console.log("wrong" + wrong);
    }
    if (count === Questions.length) {
        endGame();
    }
});

function endGame() {
    $("#timer").text = "";
    $(".start").text = "Start another game";
    $("#answer-b").text = "TRIVIA COMPLETE!";
    $("#answer-c").text = "Correct: " + correct;
    $("#answer-d").text = "Wrong: " + wrong;
}