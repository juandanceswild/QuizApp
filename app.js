//Question object constructor

function Question(question, option1, option2, option3, option4, answer){
	this.question=question;
	this.option1=option1;
	this.option2=option2;
	this.option3=option3;
	this.option4=option4;
	this.answer=answer;
}

//definition of array of questions

var ShakeQuiz = new Array();

ShakeQuiz[0] = new Question("Which one of these plays is a tragedy?", "Taming of the Shrew", "The Tempest", "Winter's Tale", "Timon of Athens", "Timon of Athens");
ShakeQuiz[1] = new Question("Which of these is not an insult from Shakespeare","Thou loathed issue of thy father's loins!","Thou infectious hell-hated scullian!","Thou art essentially a natural coward without instinct.","Thou currish ill-nurtured mumble-news!","Thou currish ill-nurtured mumble-news!");
ShakeQuiz[2]= new Question("Which of these is Shakespeare's longest play?","Hamlet","King Lear","Midsummer Night's Dream","Romeo and Juliet","Hamlet");
ShakeQuiz[3]= new Question("Which one is not a death of a Shakespeare play?","Stabbed and baked into a pie","Death by lack of sleep","Death of Shock","Stoned by a mob","Stoned by a mob");
ShakeQuiz[4] = new Question("Which of these plays was inspired by a Greek play?","Cymbeline","Othello","Comedy of Errors","None","Comedy of Errors");

// DEFINITION OF GLOBAL VARIABLES
var questionCounter;
var correctCounter;



function StartGame(){
	//reset counters for start of game
	questionCounter=0;
	correctCounter=0;
	//hide welcome screen and show stage screen
	$("#welcome, #ending").fadeOut(600);
	function fadeinquestions(){$("#questionstage").show();}
	setTimeout(fadeinquestions,600);
	//reset indicators
	$(".ind").removeClass("current");
	//first call to loadQuestion
	loadQuestion();

};

//set top indicators for current question
function setIndicators () {
	//set indicators
	$("#ind_q"+(questionCounter+1)).addClass("current");
}

//remove correct and wrong classes from answer options
function clearOptions(){
	$(".option").removeClass('correct wrong');
}

//function to load question text and answer options
function loadQuestion(){
	clearOptions();
	setIndicators();
	//load question text
	$(".question_text").html(ShakeQuiz[questionCounter].question);
	//populate set of answer options
	for (i=1;i<5;i++) {
		var questionmethod = "option"+i
		$("#option"+i).html(ShakeQuiz[questionCounter][questionmethod]);
	};
}

//evaluates if user pick is correct or not and changes css accordingly
function evalAnswer(useranswer,answer,id) {
	if(useranswer==answer) {
		$("#"+id).addClass("correct");
		correctCounter++;
		console.log("Number of correct answers: "+correctCounter);
	}
	else {
		$("#"+id).addClass("wrong");
		var correctanswer=findAnswer(answer);
		$("#"+correctanswer).addClass("correct");
	}
}

//finds the location of the correct answer in the object
function findAnswer(answer){
	for (i=1;i<5;i++){ 
		var correctanswermethod = "option"+i;
		if (answer==ShakeQuiz[questionCounter][correctanswermethod]){
			return correctanswermethod;
		}
	}
}

//changes screen to ending
function endGame() {
	$("#questionstage").fadeOut(400);
	function fadeinending() {$("#ending").fadeIn("slow");}
	setTimeout(fadeinending,600);
	$("#correctanswers").html(correctCounter);
}

$(document).ready(function(){
	$('.startnew').click( function() {
		StartGame();
	});

	$('.option').click(function(){

	if(questionCounter<5) 
		var selectedId= $(this).attr("id");
		console.log("the selected elements id is "+selectedId);
		console.log("the selected answer is "+$(this).html());
		evalAnswer($(this).html(),ShakeQuiz[questionCounter].answer,selectedId);
		questionCounter++;
		if (questionCounter==5){
			setTimeout(endGame,2000);
		}
		else
		setTimeout(loadQuestion,2000);
		
	})
});