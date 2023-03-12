const inputSlider = document.querySelector("[dataLengthSlider]");
const lengthDisplay = document.querySelector("[dataLengthNumber]");
const passwordDisplay = document.querySelector("[dataPasswordDisplay]");
const copyBtn = document.querySelector("[dataCopy]");
const copyMsg = document.querySelector("[dataCopiedMessage]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowecase");
const numberCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[dataIndicator]");
const generateBtn = document.querySelector(".generateButton");
const allcheckbox = document.querySelectorAll("input[type=checkbox]");
const symbol ='?/.><!@#$%^&*()_+=-\|`~";:';

let password = "";
let passwordLength = 10;
let checkCount = 0;

handleslider();
// indication hai mera grey

// setpassword length 

function handleslider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}

//setting indicator 
function setIndicator(color) {
    indicator.style.backgroundColor = color;
}
  
function getRndInteger(min,max) {
    return Math.floor(Math.random() * (max-min)) + min;
}

function getRandomNumber() {
    return getRndInteger(0,9);
}

function generateLoweCase() {
    return String.fromCharCode(getRndInteger(97,122));
}

function generateUpperCase() {
    return String.fromCharCode(getRndInteger(65,90));
}

function generateSymbol() {
    const numrandom = getRndInteger(0,symbol.length);
    return symbol.charAt(numrandom);
}

function calculateStrength() {
    let upper = false;
    let lower = false;
    let symbol = false;
    let number = false;

    if(uppercaseCheck.checked)
        upper = true;
    if(uppercaseCheck.checked)
        lower = true;
    if(uppercaseCheck.checked)
        symbol = true;
    if(uppercaseCheck.checked)
        number = true;

    if(upper && lower && symbol && number && passwordLength>=8) {
        setIndicator("#0f0");
    }
    else if((upper || lower) && (number || symbol) && passwordLength>=6) {
        setIndicator("#ff0");
    }
    else {
        setIndicator("#f00");
    }
}

async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e) {
        copyMsg.innerText = "failed";
    }
    copyMsg.classList.add("active");

    setTimeout( ()=> {
        copyMsg.classList.remove("active");
        },2000);
}

inputSlider.addEventListener('input', (e)=> {
    passwordLength = e.target.value;
    handleslider();
 })


copyBtn.addEventListener('click', ()=> {
    if(passwordDisplay.value) {
        copyContent();
    }
})

function handleboxchange() {
    checkCount = 0;
    allcheckbox.forEach((checkbox) => {
        if(checkbox.checked) {
            checkCount++;
        }
    })

    //Special Condition

    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleslider();
    }
}

allcheckbox.forEach( (checkbox)=> {
    checkbox.addEventListener('change',handleboxchange);
});

function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}


generateBtn.addEventListener('click', () => {
    //none of the checkbox are selected

    if(checkCount == 0) 
        return;

    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleslider();
    }

    // let's start the jouney to find new password
    console.log("Starting the Journey");
    //remove old password
    password = "";

    //let's put the stuff mentioned by checkboxes

    // if(uppercaseCheck.checked) {
    //     password += generateUpperCase();
    // }

    // if(lowercaseCheck.checked) {
    //     password += generateLowerCase();
    // }

    // if(numbersCheck.checked) {
    //     password += generateRandomNumber();
    // }

    // if(symbolsCheck.checked) {
    //     password += generateSymbol();
    // }

    let funcArr = [];

    if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase);

    if(lowercaseCheck.checked)
        funcArr.push(generateLoweCase);

    if(numberCheck.checked)
        funcArr.push(getRandomNumber);

    if(symbolCheck.checked)
        funcArr.push(generateSymbol);

    //compulsory addition
    for(let i=0; i<funcArr.length; i++) {
        password += funcArr[i]();
    }
    console.log("COmpulsory adddition done");

    //remaining adddition
    for(let i=0; i<passwordLength-funcArr.length; i++) {
        let randIndex = getRndInteger(0 , funcArr.length);
        console.log("randIndex" + randIndex);
        password += funcArr[randIndex]();
    }
    console.log("Remaining adddition done");
    //shuffle the password
    password = shufflePassword(Array.from(password));
    console.log("Shuffling done");
    //show in UI
    passwordDisplay.value = password;
    console.log("UI adddition done");
    //calculate strength
    calculateStrength();
})

console.log(checkCount);