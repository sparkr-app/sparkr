const inputs = document.querySelectorAll('input'); //interacts with document to select all inputs
console.log(inputs);

    //updates value of css var
function handleUpdate(){
        //dataset is an object that contains all data attributes.  this sets the suffix to the sizing value
    const suffix = this.dataset.sizing || '' 
        //declares var for CSS Doc selector
    const cssDoc = document.styleSheets[0].rules[0].style;  
        //selects document, then root element, and css.  SetProperty takes this.name, and sets to this.value.  Template literal usage.
        //syntax for css adjustment = style.setProperty(propertyName, value, priority);
        //don't forget that you have to select styleSheets as array elements (or maybe node list?)
    cssDoc.setProperty(`--${this.name}`, this.value + suffix);  
}
    //runs a function that loops through each input, and adds an event listener that returns an add event listener function
    //handle update when the input value is changed.
inputs.forEach(input => input.addEventListener('change', handleUpdate));  
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));  