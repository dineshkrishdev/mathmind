var number_1 = 0;
var number_2 = 0;

let number_1_range = 5;
let number_2_range = 15;

var answer = document.getElementById("answer");
var expected_answer = null;
var score = 0;
var total = 0;

var isSoundOn = true;

var operations = [
    {"name":"A", "status":true},
    {"name":"S", "status":false},
    {"name":"M", "status":false},
    {"name":"D", "status":false}
];

var activeOperation = null;

var previous_questions = new Array();
var histroy_data = new Array();

document.getElementById("question")
    .innerHTML = prepareQuestion();


function prepareQuestion() {

    var questionStr = ""; 
    number_1 = 0;
    number_2 = 0;
    while(number_1 == 0) {
        number_1 = parseInt(Math.random() * number_1_range);
    }
    while(number_2 == 0) {
        number_2 = parseInt(Math.random() * number_2_range);
    }
    
    operation = parseInt(Math.random() * getActiveOpreationCount());

    switch(activeOperation[operation]) {
        case 'A':
            questionStr = number_1 + " + " + number_2;
            expected_answer = number_1 + number_2;
            break;
        case 'S':
            questionStr = number_1 + " - " + number_2;
            expected_answer = number_1 - number_2;
            break;
        case 'M':
            questionStr = number_1 + " x " + number_2;
            expected_answer = number_1 * number_2;
            break;
        case 'D':
            questionStr = number_1 + " / " + number_2;
            expected_answer = number_1 / number_2;
            break;
    }

    if(previous_questions.includes(questionStr)) {
        prepareQuestion();
    } else {
        previous_questions.push(questionStr);
        histroy_data.push(questionStr+" = "+expected_answer);
    }

    return questionStr;
}

function check() {
    answer = document.getElementById("answer").value;
    if(answer == expected_answer) {
        document.getElementById("question")
            .innerHTML = prepareQuestion();
        answer = document.getElementById("answer").value = "";
        score++;
        total++;
        correct();
    } else {
        document.getElementById("question")
            .innerHTML = prepareQuestion();
        answer = document.getElementById("answer").value = "";
        wrong();
        total++;
    }
    document.getElementById("total").innerHTML = total;
    document.getElementById("result").innerHTML = score;
    
    var data = "";
    for(var i = 0; i < histroy_data.length - 1; i++) {
        data = data + histroy_data[i] + "\n";
    }
    document.getElementById("history_result").value = data;
}

function next() {
    document.getElementById("question")
            .innerHTML = prepareQuestion();
}

function setRange(obj) {
    if(obj.id == 'number_1_range') {
        number_1_range = obj.value;
    } else {
        number_2_range = obj.value;
    }
}

function setOperations(obj) {
    switch(obj.value) {
        case 'A':
            operations[0].status = obj.checked;
            break;
        case 'S':
            operations[1].status = obj.checked;
            break;
        case 'M':
            operations[2].status = obj.checked;
            break;
        case 'D':
            operations[3].status = obj.checked;
            break;
    }
}

function getActiveOpreationCount() {
    var count = 0;
    activeOperation = new Array();
    for(var i = 0; i < operations.length; i++) {
        if(operations[i].status) {
            activeOperation.push(operations[i].name);
            count++;
        }
    }
    return count;
}

answer.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
        check();
    }
});

function setSound(obj) {
    isSoundOn = obj.checked;
}
 
function correct() { 
    if(isSoundOn) {
        document.getElementById("correct_audio").play(); 
    }
    printResultMessage("Correct :(");
} 

function wrong() { 
    if(isSoundOn) {
        document.getElementById("wrong_audio").play();
    }
    printResultMessage("Wrong :(");
}

function printResultMessage(message) {
  var x = document.getElementById("result_messaage");
  x.innerHTML = message;
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}