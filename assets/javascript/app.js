var triviaObj = [

    {

        question: "How many minutes it take Russia to score the first goal in the opening match?",

        answers: ["Three", "Twelve", "Fourty-four", "Eighty-nine"],

        correct: "Twelve",

        pic: "assets/images/question1.jpg"

    },

    {
        question: "At 45 years and 161 days, who became the oldest ever player to play in a World Cup finals match?",

        answers: ["Essam El-Hadary", "Sheirf Ekramy", "Steve Mandanda", "Mohamed El-Shenawy"],

        correct: "Essam El-Hadary",

        pic: "assets/images/question2.jpg"

    },

    {
        question: "What was the only goalless draw of the tournament?",

        answers: ["Egypt vs Uruguay", "Denmark vs France", "Peru vs Denmark", "Belguim vs England"],

        correct: "Denmark vs France",

        pic: "assets/images/question3.jpg"

    },

    {
        question: "Panama and Iceland, the two debutants at the World Cup, picked up just one point between them. Against which team was it won?",

        answers: ["Tunisia", "Croatia", "Argentina", "Nigeria"],

        correct: "Argentina",

        pic: "assets/images/question4.jpg"

    },


    {
        question: "Nigeria only wore their hugely popular home kit once during the tournament. How many shirts did Nike say had been pre-ordered before it went on sale?",

        answers: ["One million", "Three million", "Five million", "Ten million"],

        correct: "Three million",

        pic: "assets/images/question5.jpg"

    },

    {
        question: "Which team won all three of their group games without conceding a goal?",

        answers: ["Croatia", "Uruguay", "France", "Belguim"],

        correct: "Uruguay",

        pic: "assets/images/question6.jpg"

    },

    {
        question: "Who had a penalty rescinded during the group stage after the referee used VAR and decided that the player had just fallen over?",

        answers: ["Cristiano Ronaldo", "Harry Kane", "Lionel Messi", "Neymar"],

        correct: "Neymar",

        pic: "assets/images/question7.jpg"

    },


    {
        question: "Cristiano Ronaldo hit a hat-trick and Diego Costa bagged a brace in the epic 3-3 draw between Spain and Portugal. Who scored the other goal?",

        answers: ["Isco", "Marco Asensio", "Nacho", "Iago Aspas"],

        correct: "Nacho",

        pic: "assets/images/question8.jpg"

    },

    {
        question: "Which Belgium player celebrated a goal by smashing the ball back into the net – only to see it rebound off the post and smash him in the face?",

        answers: ["Yannick Carrasco", "Marouane Fellaini", "Michy Batshuayi", "Dries Mertens"],

        correct: "Michy Batshuayi",

        pic: "assets/images/question9.jpg"

    },

    {
        question: "Which two club teams provided players that scored most goals at the World Cup (12 each)?",

        answers: ["Manchester United and Manchester City", "PSG and Tottenham Hotspur", "Barcelona and Real Madrid", "Liverpool and Chelsea"],

        correct: "PSG and Tottenham Hotspur",

        pic: "assets/images/question10.jpg"

    }

]


// Game 


var correct = 0;
var incorrect = 0;
var unanswered = 0;
var stillPlaying = true;
var clockRunning = false;
var j = 0


function start() {
    var startBtn = $("<button>");
    startBtn.addClass("startbutton btn btn-info");
    startBtn.text("Let's Start");
    $("#start").append(startBtn);

    $(".startbutton").on("click", function () {
        $("#start").html("");
        startGame(0)



    })

}


function resetGame() {

    var resetBtn = $("<button>");
    resetBtn.addClass("resetbutton btn btn-info");
    resetBtn.text("Play Again?");
    $("#start").append(resetBtn);

    $(".resetbutton").on("click", function () {
        $("#start").html("");
        $("#correct").text("");
        $("#incorrect").text("");
        $("#unanswered").text("");
        j = 0
        correct = 0;
        incorrect = 0;
        unanswered = 0;
        startGame(0)



    })
}

function gameLoop() {



    if (j === 9) {
        $("#correct").text("correct questions:" + correct);
        $("#incorrect").text("incorrect questions:" + incorrect);
        $("#unanswered").text("unanaswered questions:" + unanswered);
        $("#question").text("");
        $("#answer").text("");
        $("#results").text("");
        $("#time").text("");
        resetGame()
    }

    else {
        j++
        console.log(j)
        startGame(j)
    }

}







function startGame(j) {

    $("#results").text("");

    $("#time").text("00:20")
    var time = 20;
    var questionInt;
    var j;
    stillPlaying = true;

    $("#question").text(triviaObj[j].question)


    for (var i = 0; i < triviaObj[i].answers.length; i++) {

        var answerBtn = $("<button>");
        answerBtn.addClass("answerbutton btn btn-outline-success");
        answerBtn.attr("data-answer", triviaObj[j].answers[i]);
        answerBtn.text(triviaObj[j].answers[i]);
        $("#answer").append(answerBtn);

    }


    function timeConverter(t) {

        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes === 0) {
            minutes = "00";
        }
        else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    }


    function count() {

        time--;
        var converted = timeConverter(time);
        $("#time").text(converted);

        if (time === 0) {

            clearInterval(questionInt)
            $("#results").html("You ran out of time!! The correct answer is: " + triviaObj[j].correct);
            unanswered++
            $("#answer").text("");
            var correctImg = $("<img>")
            correctImg.addClass("imgs");
            correctImg.attr("src", triviaObj[j].pic);
            $("#question").html(correctImg);
            stillPlaying = false
            setTimeout(gameLoop, 1000 * 3)

        }

    }

    questionInt = setInterval(count, 1000);
    count()


    function stop() {

        clearInterval(questionInt);
        clockRunning = false

    }



    $(".answerbutton").on("click", function () {

        var userAnswer = ($(this).attr("data-answer"));




        if (userAnswer === triviaObj[j].correct) {


            correct++
            $("#results").text("You're Correct!!!");
            $("#answer").text("");
            var correctImg = $("<img>")
            correctImg.addClass("imgs");
            correctImg.attr("src", triviaObj[j].pic);
            $("#question").html(correctImg);
            stop();
            stillPlaying = false
            setTimeout(gameLoop, 1000 * 3)


        }

        else if (userAnswer !== triviaObj[j].correct) {

            incorrect++
            $("#results").html("You're Wrong!!! The correct answer is: " + triviaObj[j].correct);
            $("#answer").text("");
            var correctImg = $("<img>")
            correctImg.addClass("imgs");
            correctImg.attr("src", triviaObj[j].pic);
            $("#question").html(correctImg);
            stop();
            stillPlaying = false
            setTimeout(gameLoop, 1000 * 3)


        }


    })



}




start()








