

    //creates clickable interface
    /*
function setUp(){
    var key = document.getElementsByClassName('key');
    for(i = 0; i < key.length; i++){
        key[i].addEventListener('click', function(e){
        console.log(e.keycode);
        });
    };
}
*/

    //this function plays a sound assigned to a key when called
function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`); //this is a template literal.  See notes for reference
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if (!audio) return; //null is a falsy value
    audio.currentTime = 0; //resets audio start time if audio is currently playing
    audio.play(); //THERE'S A PLAY FUNCTION BUILT INTO JS!
    key.classList.add('playing'); //returns the classlist of the dom, and uses the .add method to add the playing class
}

    //removesTransition when called
function removeTransition(e){
    if(e.propertyName !== 'transform') return;  //skip if it is not a transform
    this.classList.remove('playing'); //this is the div that has the .key class
}

const keys = document.querySelectorAll('.key'); //selects all elements that have the .key class, makes into a node list
keys.forEach(key => key.addEventListener('transitionend', removeTransition));  //the for each method runs a function that receives a key, and adds an
                                                                                //event listener that listens for a transition end, then removes it.
    //creates keyboard listener, calls playSound when key is pressed
window.addEventListener('keydown', playSound);
