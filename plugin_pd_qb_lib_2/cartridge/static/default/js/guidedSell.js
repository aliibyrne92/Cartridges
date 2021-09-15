//TODO merge all into generic NextPage()
function pageTwo() {
    var x = document.getElementById("stepOneG");
    x.style.display = "none";

    var y = document.getElementById("stepTwoG");
    y.style.display = "block";

    var element = document.getElementById("progTwoForm");
    element.classList.add("progBarOn");

    var element = document.getElementById("progTwo");
    element.classList.add("progBarOn");
}

function pageThree() {
    var z = document.getElementById("stepThreeG");
    z.style.display = "block";

    var a = document.getElementById("stepTwoG");
    a.style.display = "none";

    var element = document.getElementById("progThree");
    element.classList.add("progBarOn");

    var element = document.getElementById("progThreeForm");
    element.classList.add("progBarOn");
}

function pageFour() {
    var z = document.getElementById("stepFourG");
    z.style.display = "block";

    var a = document.getElementById("stepThreeG");
    a.style.display = "none";

    var element = document.getElementById("progFour");
    element.classList.add("progBarOn");

    var element = document.getElementById("progFourForm");
    element.classList.add("progBarOn");
}

function optionSelected(selectedDiv) {
    let allOptions = document.getElementsByClassName("selectedG");
    for(let i=0; i < allOptions.length; i++){
        allOptions[i].classList.remove("selectedG");
    }
    selectedDiv.classList.add("selectedG");
}