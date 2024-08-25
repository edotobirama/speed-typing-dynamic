let quoteDisplay = document.getElementById("quoteDisplay");
let quoteVal = "";
let timer = document.getElementById("timer");
timer.classList.add("timerText");
let spanEle = document.createElement("span");
spanEle.classList.add("spanEle");
spanEle.textContent = "seconds";
let submitBtn = document.getElementById("submitBtn");
let textAreaElement = document.getElementById("quoteInput");
let result = document.getElementById("result");
let reset = document.getElementById("resetBtn");
let loading = document.getElementById("loading");


function getTheQuote(abc) {
    quoteVal = abc.content;
    quoteDisplay.textContent = quoteVal;
}

function timerText(b) {
    timer.textContent = b;
    timer.appendChild(spanEle);
}

let options = {
    method: "GET"
};
fetch("https://apis.ccbp.in/random-quote", options)
    .then(function(response) {
        return response.json();
    }).then(function(jsonData) {
        getTheQuote(jsonData);
    });

timerText(0);
let b = 0;
let uniqueNum = setInterval(function() {
    timerText(b);
    b += 1;
}, 1000);

submitBtn.addEventListener("click", function() {
    if (textAreaElement.value === quoteVal && textAreaElement.value !== "") {
        clearInterval(uniqueNum);
        timer.textContent = b;
        result.textContent = "You typed in " + b + " seconds";
    } else {
        result.textContent = "You typed in incorrect sentence";
    }
});

reset.addEventListener("click", function() {

    clearInterval(uniqueNum);
    result.textContent = "";
    loading.classList.remove("d-none");
    fetch("https://apis.ccbp.in/random-quote", options)
        .then(function(response) {
            return response.json();
        }).then(function(jsonData) {
            getTheQuote(jsonData);
        });
    loading.classList.add("d-none");
    b = 0;
    uniqueNum = setInterval(function() {
        timerText(b);
        b += 1;
    }, 1000);
    textAreaElement.value = "";

});
