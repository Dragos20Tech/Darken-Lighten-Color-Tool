const hexInput = document.getElementById('hexInput');
const inputColor = document.getElementById('inputColor');
const alteredColor = document.getElementById('alteredColor');
const alteredColorText = document.getElementById('alteredColorText');
const slider = document.getElementById('slider');
const sliderText = document.getElementById('sliderText');
const lightenText = document.getElementById('lightenText');
const darkenText = document.getElementById('darkenText');
const toggleBtn = document.getElementById('toggleBtn');
const altColor = document.getElementsByClassName('altColor')

// Whenever you refresh the page it will come back to this INITIAL STATE
hexInput.value = ""
slider.value = 0;
sliderText.innerText = `0%`;

toggleBtn.addEventListener('click', () => {
  if(toggleBtn.classList.contains('toggled')){
    toggleBtn.classList.remove('toggled');
    lightenText.classList.remove('unselected');
    darkenText.classList.add('unselected');

    alteredColor.style.color = "black"
    alteredColor.style.backgroundColor = inputColor.style.backgroundColor

  } else {
    toggleBtn.classList.add('toggled');
    lightenText.classList.add('unselected');
    darkenText.classList.remove('unselected');

    alteredColor.style.color = "white"
    alteredColor.style.backgroundColor = inputColor.style.backgroundColor
  }
  reset()
})


hexInput.addEventListener('keyup', () => {
  
  const hex = hexInput.value;
  if(!isValidHex(hex)) return;

  const strippedHex = hex.replace('#', '');

  inputColor.style.backgroundColor = "#" + strippedHex;

  const valueAddition  =
      toggleBtn.classList.contains('toggled') ?
          -slider.value
          : slider.value;

  const alteredHex = alterColor(hexInput.value, valueAddition);
  alteredColor.style.backgroundColor = alteredHex;
  alteredColorText.innerText = `Altered Color ${alteredHex}`;

  reset()
})

const isValidHex = (hex) => {
    if(!hex) return false; // It checks if the hex parameter is falsy (e.g., empty string, undefined, null).
                           // If it is, the function immediately returns false.

    const strippedHex = hex.replace('#', ''); // If the hex parameter is not falsy, it proceeds to remove the '#' character
                                              // (if it exists) from the beginning of the hex string using the replace method.

    let pattern = /[a-fA-F0-9#]/
    for(let i = 0 ; i < strippedHex.length ; i++) {
      if(pattern.test(strippedHex[i]) === false)   // It checks if the strippedHex value follows the right
        return false;                              // pattern by checking each character
    }
    // If there's a character outside the bounds of a-f or A-F or 0-9 or # then "pattern.test()" returns false

    return strippedHex.length === 3 || strippedHex.length === 6;
    // If the length of strippedHex is 3 or 6,
    //	the function returns true, indicating that the input is a valid hexadecimal color code;
    //	otherwise, it returns false.

    // Example of a returned value : fa12de
}

const convertHexToRGB = (hex) => {
  if(!isValidHex(hex)) return null; // If the hex value doesn't follow the conditions , return null.
  
  let strippedHex = hex.replace('#', '');

  if(strippedHex.length === 3){
    strippedHex = strippedHex[0] + strippedHex[0] 
    + strippedHex[1] + strippedHex[1] 
    + strippedHex[2] + strippedHex[2];
  }
  
  const r  = parseInt(strippedHex.substring(0,2), 16);
  const g  = parseInt(strippedHex.substring(2,4), 16);
  const b  = parseInt(strippedHex.substring(4,6), 16);
  
  return {r,g,b};
}

const convertRGBToHex = (r,g,b) => {
  const firstPair = ("0" + r.toString(16)).slice(-2);
  const secondPair = ("0" + g.toString(16)).slice(-2);
  const thirdPair = ("0" + b.toString(16)).slice(-2);

  return "#" + firstPair + secondPair + thirdPair; // returns the hex value
}

const alterColor = (hex, percentage) => {
  const {r, g, b} = convertHexToRGB(hex);
  
  const amount = Math.floor((percentage/100) * 255);
  
  const newR = increaseWithin0To255(r,amount);
  const newG = increaseWithin0To255(g,amount);
  const newB = increaseWithin0To255(b,amount)
  return convertRGBToHex(newR, newG, newB);
}

const increaseWithin0To255 = (hex, amount) => {
    return Math.min(255, Math.max(0, hex + amount));
}

slider.addEventListener('input', () => {
  if(!isValidHex(hexInput.value)) return;
  
  sliderText.textContent = `${slider.value}%`;

  const valueAddition  = 
    toggleBtn.classList.contains('toggled') ? 
    -slider.value 
    : slider.value;
  
  const alteredHex = alterColor(hexInput.value, valueAddition);
  alteredColor.style.backgroundColor = alteredHex;
  alteredColorText.innerText = `Altered Color ${alteredHex}`;
})

const reset = () => {
  slider.value = 0;
  sliderText.innerText = `0%`;
  alteredColor.style.backgroundColor = hexInput.value;
  alteredColorText.innerText = `Altered Color ${hexInput.value}`;
}

inputColor.addEventListener('click', function (){
    if(!isValidHex(hexInput.value)) return;

    //console.log(inputHex(hexInput.value)) // DEBUGGING PURPOSES
    navigator.clipboard.writeText(inputHex(hexInput.value));

    altColor[0].innerHTML = `Copied : ${inputHex(hexInput.value)}`
})

alteredColor.addEventListener('click',function (){
    if(!isValidHex(hexInput.value)) return;
    //console.log(alteredHex(alteredColorText.innerText)) // DEBUGGING PURPOSES
    navigator.clipboard.writeText(alteredHexValue(alteredColorText.innerText));

    altColor[1].innerHTML = `Copied : ${alteredHexValue(alteredColorText.innerText)}`
})


const inputHex = (hex) => {
  return "#" + hex.replace('#' , '')
}

const alteredHexValue = () => {
  let alteredText = alteredColorText.innerText
  const word = alteredText.split(' ')

  return "#" + word[2].replace('#','')
}


