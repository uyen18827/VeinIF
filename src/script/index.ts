import { getName } from "../player/playerInfo.js"
import { getParagraph } from "../paragraphs/allParagraphs.js"
import { getPronouns, showPronounDialogue } from "../player/pronouns.js"
import { Paragraphs } from "../model/paragraph.js";
import { updateParagraph } from "../paragraphs/paragraphFunctions.js";
import { load, newSave } from "./saveScript.js";

///////////////////Initialize game///////////////////
let allParagraphs: Paragraphs[] = getParagraph();
let currentParagraph = allParagraphs[0].content;

const paragraphContainer: HTMLElement | any = document.getElementById("paragraph");
const choiceContainer: HTMLElement | any = document.getElementById("choices");

let paragraph: string = `${currentParagraph}`;
paragraphContainer.innerHTML += paragraph;

let choices = allParagraphs[0].choices;
//render the first paragraph's choice(s).
if (choices) {
    for (var i = 0; i < choices.length; i++) {
        var currentChoice = choices[i];
        var nextid: number = currentChoice.nextid;
        let choice = `<a href="#" 
        class="choices" id="n${nextid}" >
        ${currentChoice.choiceCont} 
        </a><br>`
        choiceContainer.innerHTML += choice;
        // If <input id="playerName"> is present in paragraph:
        paragraphContainer.addEventListener("keyup", function (e: any) {
            // e.target was the clicked element
            if (e.target && e.target.matches("input#playerName")) {
                getName();
            }
        });
    }
    //add event listener to dynamically created HTML elements
    for (var i = 0; i < choices.length; i++) {
        let currentChoice = choices[i];
        let nextid: number = currentChoice.nextid;
        let choiceHTML = choiceContainer.querySelector("#n" + nextid);
        let style = choices[i].style;
        choiceHTML.addEventListener('click', function () { updateParagraph(nextid, style) });
    }
}

// Add event listener to HTML element input with id = "playerName"
const nameInput = document.querySelector("#playerName");
if (nameInput) {
    nameInput.addEventListener('keyup', getName);
}

////////////////////button!!!!!!!!!!!!/////////////
const button = document.querySelector("#coolbutton");

function doThing(thing?: any) {
    console.log("thing!");
}

if (button) {
    button.addEventListener('click', doThing);
}

///////////////////////////////////////////////////
let pronounsContainer: HTMLElement | any = document.getElementById("pronouns");
/**
 * Check if pronounsContainer exits, then show pronouns.
 */
if (pronounsContainer) {
    showPronounDialogue(pronounsContainer);
    pronounsContainer.addEventListener('click', getPronouns);
}

// Add event listener to all Save buttons
const saveButton = document.querySelectorAll(".save");
saveButton.forEach(element => {
    let slotNumber = element.getAttribute("value");
    element.addEventListener('click', function () {
        newSave(slotNumber!)
    }
    );
});

// Add event listener to all Load buttons
const loadButton = document.querySelectorAll(".load");
loadButton.forEach(element => {
    let slotNumber = element.getAttribute("value");
    element.addEventListener('click', function () {
        load(slotNumber!);
    })
})