import { getItem } from "../inventory/inventory.js";
import { Paragraphs } from "../model/paragraph.js";
import { player } from "../player/playerInfo.js";
import { getParagraph } from "./allParagraphs.js";
var currentParagraph: string | undefined;
/**
 * Show available choices in a paragraph
 * @param choices should takes the value of allParagraphs[nextid].choices
 * @param choiceContainer document.getElementById("choices");
 */
function showChoices(choices: any, choiceContainer: any){
    if (choices) {
        for (var i = 0; i < choices.length; i++) {
            var currentChoice = choices[i];
            var nextid: number = currentChoice.nextid;
            let choice = `<a href="#" 
            class="choices" id="n${nextid}" >
            ${currentChoice.choiceCont} 
            </a><br>`
            choiceContainer.innerHTML += choice;
        }
        for (var i = 0; i < choices.length; i++) {
            let currentChoice = choices[i];
            let nextid: number = currentChoice.nextid;
            let style = choices[i].style;
            let choiceHTML = choiceContainer.querySelector(`#n${nextid}`);
            choiceHTML.addEventListener('click', function () { updateParagraph(nextid, style) });
        }
    }
}
function showItems(items: any, itemContainer: any){
    if(items){
        for(var i=0; i< items.length; i++)
        {
            var currentItem = items[i];
            let item = `<a href="#" class="items">You found a ${currentItem.itemName}</a>`;
            itemContainer.innerHTML += item;
        }
        for (var i=0; i< items.length; i++){
            let itemHTML = itemContainer.querySelectorAll(".items");
            itemHTML.forEach((element: { addEventListener: (arg0: string, arg1: () => any) => void; }) => {
                element.addEventListener("click", function(){
                    getItem(items[0]);
                    console.log(items[0].itemName);
                })
            });
        }
    }
}
/**Get nextid, then show the paragraph with that id.
  * @param {number} nextid next paragraph's id.
  * @param {string} style optional. Update paragraph style. Leave blank for default: clear previous paragraph then show the next one.
*/
export function updateParagraph(nextid: number, style?: string) {
    let allParagraphs: Paragraphs[] = getParagraph();
    const choiceContainer: HTMLElement | any = document.getElementById("choices");
    const paragraphContainer: HTMLElement | any = document.getElementById("paragraph");
    const itemContainer: HTMLElement | any = document.getElementById("items");
    let choices;
    let items = null;
    itemContainer.innerHTML = null;
    allParagraphs = getParagraph(player);
    switch (style) {
        case "append":
            currentParagraph = currentParagraph + " " + allParagraphs[nextid].content;
            paragraphContainer.innerHTML = currentParagraph;
            choiceContainer.innerHTML = null;
            choices = allParagraphs[nextid].choices;
            items = allParagraphs[nextid].item;
            console.log(items);
            showChoices(choices, choiceContainer);
            showItems(items, itemContainer);
            break;
        default:
            paragraphContainer.innerHTML = null;
            choiceContainer.innerHTML = null;
            currentParagraph = allParagraphs[nextid].content;
            paragraphContainer.innerHTML = currentParagraph;
            choices = allParagraphs[nextid].choices;
            items = allParagraphs[nextid].item;
            console.log(items);
            showChoices(choices, choiceContainer);
            showItems(items, itemContainer);
            break;
    }
}
//TODO: known problems: when there's two options that redirect the user to the same paragraph,
//only the first option will work.