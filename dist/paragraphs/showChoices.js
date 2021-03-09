import { applyConsequence } from "../conditions/consequences.js";
import { checkChoiceCondition } from "../conditions/choiceCondition.js";
import { autoSave } from "../script/saveScript.js";
import { updateParagraph } from "./paragraphFunctions.js";
/**
 * Show available choices in a paragraph
 * @param choices should takes the value of allParagraphs[nextid].choices
 * @param choiceContainer document.getElementById("choices");
 */
export function showChoices(choices, choiceContainer) {
    if (choices) {
        for (var i = 0; i < choices.length; i++) {
            var currentChoice = choices[i];
            let choice = `<a href="#" 
            class="choices" id="cid${currentChoice.id}" >
            ${currentChoice.content} 
            </a><br>`;
            choiceContainer.innerHTML += choice;
            if (currentChoice.precondition) {
                console.log(`choice n.${currentChoice.id} has condition!`);
                checkChoiceCondition(currentChoice, currentChoice.precondition);
            }
            else {
                // console.log(`choice n.${currentChoice.id} has no condition`);
            }
        }
        for (var i = 0; i < choices.length; i++) {
            let currentChoice = choices[i];
            let nextid = currentChoice.nextid;
            let style = choices[i].style;
            let choiceHTML = choiceContainer.querySelector(`#cid${currentChoice.id}`);
            //if element doesn't have class choice-blocked, add event listener, else, don't do anything
            if (!choiceHTML.classList.contains("choice-blocked")) {
                choiceHTML.addEventListener('click', function () {
                    if (currentChoice.consequence) {
                        applyConsequence(currentChoice.consequence);
                    }
                    updateParagraph(nextid, style);
                    autoSave();
                });
            }
        }
    }
}
