/////////////////////////////Formatting tools////////////////////////////////////////
/**
 *Capitalise the first letter in a string.
 */
export function capitalise(word) {
    if (!word)
        return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
}
////////////////////////////////////////////////////////////////////////////////////
/**Grey out text */
export function greyOut(thing) {
    thing.style.color = "#6A6C6E";
}
