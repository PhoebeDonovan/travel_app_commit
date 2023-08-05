import { generateButtonClicked } from './js/app';
import { addEntry } from './js/app';
import '../client/styles/style.css'

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', generateButtonClicked);

console.log(generateButtonClicked);

export { 
    generateButtonClicked,
    addEntry
};
