let a = 2;
let b = 7;
let c = 6;

let p = 0;
let q = 0;

let discriminant = 0;
let xPlus = 0;
let xMinus = 0;
const decimalRounding = 10000;

ElementId("a").value = a;
ElementId("b").value = b;
ElementId("c").value = c;

let inputs = document.querySelectorAll('input');
inputs.forEach(element => {
    element.addEventListener('input', () => {
        element.style.width = element.value.length + "ch";

        a = parseFloat(ElementId("a").value);
        b = parseFloat(ElementId("b").value);
        c = parseFloat(ElementId("c").value);

        if (isNaN(a) || isNaN(b) || isNaN(c) || a == 0) {
            ElementId("inputs").style.opacity = 0.5;
            return;
        }
        ElementId("inputs").style.opacity = 1;

        runCalculations();
    })
});

runCalculations = () => {
    calcVertForm(); //q2
    calcX(); //q1
    factor(); //q3
}

calcVertForm = () => {

    let formString = a + "(x ";

    p = (b * -1) / (2 * a);
    // console.log("P: " + p);
    q = (a * p**2) + (b * p) + (c);
    // console.log("Q: " + q);

    if (p < 0) { 
        formString = formString.concat("+ " + Math.round(Math.abs(p) * decimalRounding) / decimalRounding  + ")&sup2");
    } else {
        formString = formString.concat("- " + Math.round(p * decimalRounding) / decimalRounding + ")&sup2");
    }

    if (q < 0) {
        formString = formString.concat(" - " + Math.round(Math.abs(q) * decimalRounding) / decimalRounding);
    } else {
        formString = formString.concat(" + " + Math.round(q * decimalRounding) / decimalRounding);
    }

    ElementId("vertForm").innerHTML = formString;
}

calcX = () => {
    discriminant = (b**2) - (4*a*c);

    if (discriminant < 0) {
        ElementId("+").innerHTML = "No X-Intercepts";
        ElementId("-").innerHTML = "";
    } else  if (discriminant == 0) {
       xPlus = xMinus = -b / (2 * a);
    } else {
        xPlus = (b*-1 + Math.sqrt(discriminant)) / (2*a);
        xMinus = (b*-1 - Math.sqrt(discriminant)) / (2*a);
        ElementId("+").innerHTML = "Plus: " + Math.round(xPlus * decimalRounding) / decimalRounding;
        ElementId("-").innerHTML = "Minus: " + Math.round(xMinus * decimalRounding) / decimalRounding;
    }
}

factor = () => {

    let factorString = "(";
    let tempC = a*c;
    let limit = Math.abs(b*tempC);

    let num1, num2;

    let num1Extra = "";
    let num2Extra = "";

    let finalNum1, finalNum2;

    let front = "";

    for (let i = limit * -1; i < limit; i++) {
        for (let j = limit * -1; j < limit; j++) {
            if (i * j == tempC && i + j == b) {
                num1 = i;
                num2 = j;
            }
        }
    }

    if (isNaN(num1)) {
        ElementId("factored").innerHTML = "Can't factor";
        return;
    }

    num1Array = reduce(num1, a);
    num2Array = reduce(num2, a);

    finalNum1 = num1Array[0];
    finalNum2 = num2Array[0];
    
    if (num1Array[1] != 1) {
        num1Extra = num1Array[1];
    }

    if (num2Array[1] != 1) {
        num2Extra = num2Array[1];
    }

    factorString = factorString.concat(num1Extra + "x");

    if (finalNum1 > 0) {
        factorString = factorString.concat(" + " + finalNum1 + ")(");
    } else {
        factorString = factorString.concat(" - " + Math.abs(finalNum1) + ")(");
    }

    factorString = factorString.concat(num2Extra + "x");

    if (finalNum2 > 0) {
        factorString = factorString.concat(" + " + finalNum2 + ")");
    } else {
        factorString = factorString.concat(" - " + Math.abs(finalNum2) + ")");
    }

    if (num1Extra.length == 0) {
        num1Extra = 1;
    }

    if (num2Extra.length == 0) {
        num2Extra = 1;
    }

    if (num1Extra * num2Extra != a) {
        console.log("Extra's don't have a product of A, calculating outer");
        if (num1Extra == 1) {
            console.log("A: dividing: " + a + "/" + num2Extra);
            front = a/num2Extra;
        } else {
            front = a/num1Extra;
            console.log("A: dividing: " + a + "/" + num1Extra);
        }
    }

    if (a < 0 && front > 0) {
        front *= -1;
    }
    front = front + "";

    ElementId("factored").innerHTML = front.concat(factorString);

}

function reduce(numerator,denominator){ //stack overflow :praying_emoji:
    var gcd = function gcd(a,b){
      return b ? gcd(b, a%b) : a;
    };
    gcd = gcd(numerator,denominator);
    return [numerator/gcd, denominator/gcd];
  }

  runCalculations();