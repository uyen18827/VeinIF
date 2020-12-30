import { getName } from "../player/playerInfo.js";
import { getParagraph } from "../paragraphs/allParagraphs.js";
import { getPronouns, showPronounDialogue } from "../player/pronouns.js";
import { updateParagraph } from "../paragraphs/paragraphFunctions.js";
///////////////////Initialize game///////////////////
let allParagraphs = getParagraph();
let currentParagraph = allParagraphs[0].content;
const paragraphContainer = document.getElementById("paragraph");
const choiceContainer = document.getElementById("choices");
let paragraph = `${currentParagraph}`;
paragraphContainer.innerHTML += paragraph;
let choices = allParagraphs[0].choices;
//render the first paragraph's choice(s).
if (choices) {
    for (var i = 0; i < choices.length; i++) {
        var currentChoice = choices[i];
        var nextid = currentChoice.nextid;
        let choice = `<a href="#" 
        class="choices" id="n${nextid}" >
        ${currentChoice.choiceCont} 
        </a><br>`;
        choiceContainer.innerHTML += choice;
        // If <input id="playerName"> is present in paragraph:
        paragraphContainer.addEventListener("keyup", function (e) {
            // e.target was the clicked element
            if (e.target && e.target.matches("input#playerName")) {
                console.log("Anchor element clicked!");
                getName();
            }
        });
        paragraphContainer.addEventListener("click", function (e) {
            if (e.target && e.target.matches("div#pronouns")) {
                console.log(e.target);
                showPronounDialogue(e.target);
                e.target.addEventListener('click', getPronouns);
            }
        });
    }
    //add event listener to dynamically created HTML elements
    for (var i = 0; i < choices.length; i++) {
        let currentChoice = choices[i];
        let nextid = currentChoice.nextid;
        let choiceHTML = choiceContainer.querySelector("#n" + nextid);
        let style = choices[i].style;
        choiceHTML.addEventListener('click', function () { updateParagraph(nextid, style); });
    }
}
const nameInput = document.querySelector("#playerName");
if (nameInput) {
    nameInput.addEventListener('keyup', getName);
}
////////////////////button!!!!!!!!!!!!/////////////
const button = document.querySelector("#coolbutton");
function doThing(thing) {
    console.log("thing!");
}
if (button) {
    button.addEventListener('click', doThing);
}
///////////////////////////////////////////////////
const pronounsContainer = document.getElementById("pronouns");
/**
 * Check if pronounsContainer exits, then show pronouns.
 */
if (pronounsContainer) {
    showPronounDialogue(pronounsContainer);
    pronounsContainer.addEventListener('click', getPronouns);
}
