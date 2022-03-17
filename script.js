const inpt = document.querySelector(".inpt");
const btn = document.querySelector(".btn");
const align = document.querySelector(".align");
const options = document.querySelector(".options");
const multiplyRadio = document.querySelector("#multiply");
const divideRadio = document.querySelector("#divide");

const divideTab = document.querySelector(".divide");
const multiplyTab = document.querySelector(".multiply");

btn.addEventListener("click", () => {
    let numbers = inpt.value;
    numbers = numbers.split(" ");
    if (numbers.length == 2) {
        if (divideRadio.checked) {
            let result = devide(numbers[0], numbers[1]);
            // console.log(result);
            placeInHtml(result);
            divideTab.style.display = "block";
            multiplyTab.style.display = "none";
        } else if (multiplyRadio.checked) {
            let results = multiple(numbers[0], numbers[1]);
            multiplyPlaceInHtml(results, numbers);
            divideTab.style.display = "none";
            multiplyTab.style.display = "block";
        }
    }
});

window.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        btn.click();
    }
});

function devide(numberA, numberB) {
    let numbers = [];
    numbers[0] = numberA + "";
    numbers[1] = numberB + "";
    let result = "0";
    let remainder = numberA;
    let multipleRuselts = [];
    let subResults = [];
    let remainderArr = [];
    let spacingArr = [];
    let spacingInfo = [];
    let a = parseInt(numbers[0]);
    let b = parseInt(numbers[1]);
    if (b > a) {
        return;
    }
    numbers[0] = numbers[0].split("");
    for (let i = 0; i < numbers[0].length; i++) {
        numbers[0][i] = parseInt(numbers[0][i]);
    }
    numbers[1] = parseInt(numbers[1]);
    let loopCount = 0;
    for (let j = 0; true; j++) {
        let tempIn = 0;
        let counter = 0;
        loopCount++;
        for (let i = 0; i < numbers[0].length; i++) {
            if (tempIn < numbers[1]) {
                tempIn = tempIn * 10 + numbers[0][i];
                counter++;
                if (loopCount > 1 && counter > 2) {
                    result += 0;
                }
            } else {
                break;
            }
        }
        let tempResult = Math.floor(tempIn / numbers[1]);
        result += tempResult;
        for (let i = 0; i < counter; i++) {
            numbers[0].splice(0, 1);
        }
        remainder = tempIn % numbers[1];
        numbers[0].unshift(remainder);
        subResults.push(tempIn);
        let multiple = tempResult * numbers[1];
        multipleRuselts.push(multiple);
        remainderArr.push(remainder);
        if (numbers[0].length == 1) break;
    }
    result = parseInt(result);
    for (let i = 0; i < remainderArr.length; i++) {
        let space =
            (subResults[i] + "").length - (multipleRuselts[i] + "").length;

        spacingArr.push(space);
        space =
            (multipleRuselts[i] + "").length - (remainderArr[i] + "").length;
        spacingArr.push(space);
    }
    for (let i = 1; i < spacingArr.length; i++) {
        spacingArr[i] = spacingArr[i] + spacingArr[i - 1];
    }
    for (let i = 0; i < spacingArr.length / 2; i++) {
        let even = 2 * i;
        let tempArr = [spacingArr[even], spacingArr[even + 1]];
        spacingInfo[i] = tempArr;
    }
    subResults.splice(0, 1);
    subResults.push(remainder);
    return {
        numberA,
        numberB,
        result,
        multipleRuselts,
        subResults,
        spacingInfo,
    };
}
function placeInHtml(object) {
    const {
        numberA,
        numberB,
        result,
        spacingInfo,
        subResults,
        multipleRuselts,
    } = object;
    const numB = document.querySelector(".num-b");
    const numA = document.querySelector(".num-a");
    const ans = document.querySelector(".ans");
    const mainMathDiv = document.querySelector(".main-math");
    const vls = document.querySelectorAll(".vl");
    vls[0].style.display = "flex";
    vls[1].style.display = "flex";
    numB.innerHTML = numberB;
    numA.innerHTML = numberA;
    ans.innerHTML = result;
    let mainMath = "";
    for (let i = 0; i < spacingInfo.length; i++) {
        let a = spacingInfo[i][0];
        let tempString = "<p>";
        for (let j = 0; j < a; j++) {
            tempString += `&nbsp;`;
        }
        tempString += `${multipleRuselts[i]}</p><hr/>`;
        mainMath += tempString;
        tempString = "<p>";
        let b = spacingInfo[i][1];
        for (let j = 0; j < b; j++) {
            tempString += `&nbsp;`;
        }
        tempString += `${subResults[i]}</p>`;
        mainMath += tempString;
        mainMathDiv.innerHTML = mainMath;
    }
}
function multiple(numberA, numberB) {
    let numbers = [];
    numbers[0] = numberA + "";
    numbers[1] = numberB + "";
    let results = [];
    let ans = 0;
    numbers[1] = numbers[1].split("");

    for (let i = 0; i < numbers[1].length; i++) {
        for (let j = 0; j < numbers[1].length - i - 1; j++) {
            numbers[1][i] += "0";
        }
    }
    numbers[1].reverse();
    for (let i = 0; i < numbers[1].length; i++) {
        results[i] = numbers[0] * numbers[1][i];
        ans += results[i];
    }
    return { results, ans };
}
function multiplyPlaceInHtml(obj, numbers) {
    let results = obj.results;
    let ans = obj.ans;
    let temp = numbers[1];
    let htmlText = "";
    htmlText += `<a>${numbers[0]}</a><a>x ${temp}</a><hr />`;
    for (let i = 0; i < results.length; i++) {
        let space = "";
        for (let j = 0; j < results.length - i - 1; j++) {
            space += "&nbsp";
        }
        htmlText += `<a>${space}${results[i]}</a>`;
    }
    htmlText += `<hr /><a>${ans}</a>`;
    align.innerHTML = htmlText;
}
