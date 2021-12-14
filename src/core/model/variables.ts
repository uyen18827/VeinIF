/**
 * Contains id of HTML elements that will be used to append content in.
 */
export const htmlElements = {
    itemContainer: "items",
    choiceContainer: "choice-container",
    paragraphContainer: "paragraph",
    pronounsContainer: "pronouns"
}

export let settings = {
    showConditionCheck: true,
    // unused;
    darkMode: false,
    animation: false
}

settings.animation = true;
console.log(settings.animation);