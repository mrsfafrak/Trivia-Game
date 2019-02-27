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
var question4 = {
    number: "Question #4",
    question: "How many trees are cut down each day to produce toilet paper?",
    answer_a: "a. 25,000", // correct
    answer_b: "b. 50,000",
    answer_c: "c. 100,000",
    answer_d: "d. 250,000"
}
var question5 = {
    number: "Question #5",
    question: "How long in years does it take a glass bottle to decompose?",
    answer_a: "a. 2,000",
    answer_b: "b. 4,000", // correct
    answer_c: "c. 10,000",
    answer_d: "d. It never decomposes"
}
var question6 = {
    number: "Question #6",
    question: "If everyone on Earth lived like an average American, how many planets would it take to provide enough resources?",
    answer_a: "a. 2",
    answer_b: "b. 5", // correct
    answer_c: "c. 10",
    answer_d: "d. Our earth could provide enough"
}
var question7 = {
    number: "Question #7",
    question: "What percentage of earth's water can be used?",
    answer_a: "a. 1%", // correct
    answer_b: "b. 5%",
    answer_c: "c. 10%",
    answer_d: "d. 15%"
}
var question8 = {
    number: "Question #8",
    question: "How many times can aluminum be recycled?",
    answer_a: "a. 2x",
    answer_b: "b. 20x",
    answer_c: "c. 200x",
    answer_d: "d. It can be recycled infinitely."// correct
}
var question9 = {
    number: "Question #9",
    question: "How many Styrofoam cups do Americans throw away annually?",
    answer_a: "a. 250 million",
    answer_b: "b. 250 billion",
    answer_c: "c. 25 trillion",// correct
    answer_d: "d. 250 trillion"
}
var question10 = {
    number: "Question #10",
    question: "Plastic bags take how many years to decompose?",
    answer_a: "a. 250",
    answer_b: "b. 500",
    answer_c: "c. 750",
    answer_d: "d. 1000"// correct
}
// end of Questions
// Questions into an array:
var Questions = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10];
// Answers Array:
var Answers = ["b. Using the dishwasher", "d. None of the above", "b. False", "a. 25,000", "b. 4,000", "b. 5", "a. 1%", "d. It can be recycled infinitely.", "c. 25 trillion", "d. 1000"]


// intital global variables defined
var count = -1;
var correct = 0;
var wrong = 0;
var clock;
var isPlayerGuessing = true;
var canClick = true;
var canStart = true;

// when start is clicked or when it is clicked for a new round
$(".start").on("click", function () {
    if (canStart) {
        canStart = false;
        count = -1;
        correct = 0;
        wrong = 0;
        isPlayerGuessing = true;
        canClick = true;
        nextQuestion();
    };
});

// function to trigger the next question
function nextQuestion() {
    canClick = true;
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
    if (canClick) {
        canClick = false;
        console.log(canClick);
        isPlayerGuessing = true;
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
    };
});

// function to trigger the end of the game, show the score, offer to play agin
function endGame() {
    canStart = true;
    stopTimer();
    $("#timer").text("");
    $(".start").text("CLICK HERE TO PLAY AGAIN");
    $("#question-text").text("");
    var sum = Math.floor((correct / (correct + wrong)) * 100);
    if (sum <= 50) {
        var outcome = "Meh, hope you learned some facts!"
    };
    if (sum >= 50 && sum <= 70) {
        var outcome = "Not too shabby!"
    };
    if (sum > 70) {
        var outcome = "Wow! You're an Environmental Wiz!!"
    };
    $("#answer-a").text("TRIVIA COMPLETE!");
    $("#answer-b").text("You scored a " + sum + "%. " + outcome);
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
    if (counter === Questions.length && countdown === 0 && isPlayerGuessing) {
        endGame();
    }
    else if (counter === Questions.length && countdown === 0 && isPlayerGuessing === false) {
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
    else if (countdown === 0 && isPlayerGuessing) {
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
    else if (countdown === 0 && isPlayerGuessing === false) {
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
