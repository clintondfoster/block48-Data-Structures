// Question 1 //////
// Bracket types must match, and close in the same order

//Ex. 
//const s1 = "()"
//console.log(isValid(s1)); Output: true
//const s4 = "([)]";
//console.log(isValid(s4)); Output: false

function isValid(s, stack=[], idx=0) {

    const openBrackets = ["(", "[", "{"];
    const closeBrackets = [")", "]", "}"];

    if (idx === s.length) {
        return stack.length === 0
    }

    const char = s[idx];
    if (openBrackets.includes(char)) {
        stack.push(char);
    } else if (closeBrackets.includes(char)) {
        const openBracket = openBrackets[closeBrackets.indexOf(char)];
        if (stack.length === 0 || stack.pop !== openBracket) {
            return false;
        }
    }
    return isValid(s, stack, idx + 1)
}


// Question 2 //////
// 0th person in front
// (n-1)th person in back
// length = n
// tickets[i] = num of tix that ith person wants
// Return the time spent for the individual at position k (0-indexed) to finish buying tickets.

// Ex.
// Input: tickets = [2,3,2], k = 2
// Output: 6

function timeInLine (tix, k) {
    const n = tix.length;
    const time = 0;

    const queue = Array.from( {length: n}, (_, i) => i) //create an array

    while (true) {
        const frontPerson = queue.shift();

        if (frontPerson === k) {
            return time; //if front person only has one ticket to buy, record the time
        } 

        if (tix[frontPerson] > 0) {
            tix[frontPerson]--; //reduce the num of tix for the front person
            queue.push(frontPerson); //if front person has more than one ticket to buy, they purchase one and they return to the back of the line
        }
        time++;
    }
}

//Example:
const timeTaken = timeInLine(tix ,k)
console.log(`Time taken for person at position ${k} to finsih buying tickets: ${timeTaken} seconds`)


// Question 3 //////

//put students in increasing order by height
//find min number of students who change initial position 
//height[i]


function heightsChecker(heights) {
const sortedHeightsArray = [];
count = 0;

for (let i = 0; i < heights.length; i++) {
    if (heights[i] !== sortedHeightsArray[i]) {
        count++;
    }
}
return count;
}
// Example: 
const heights = [1, 1, 4, 2, 1, 3]
const result = heightsChecker(heights);
console.log(result)


// Question 4 //////

//take the top card from the deck, deck[i], and reveal it
//if there are still unrevealed cards in the deck, reveal the top one then place at the bottom
//once a card has been seen again, return a deck order the reveals the cards in increasing order


function revealCardsInOrder (deck) {

    deck.sort((a,b) => a - b);

    //create a queue with positions
    let queue = [];
    for(let i = 0; i < deck.length; i++) {
        queue.push(i);
    }

    let result = new Array(deck.length);
    for(let card of deck) {
        //reveal top card
        result[queue.shift()] = card;

    //place next card if present
    if(queue.length) {
        queue.push(queue.shift());
    }
}
return result;
}

//Example
let deck = [34,23,1,4,34,12,4];
console.log(revealCardsInOrder(deck)); // [1,4,4,12,23,34,34,34]