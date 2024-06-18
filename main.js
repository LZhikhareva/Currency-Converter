const input = document.querySelector('#input')
const inputRub = document.querySelector('#inputRub')
const output = document.querySelector('#output')
const outputRub = document.querySelector('#outputRub')
const select = document.querySelector('#select')
const selectIn = document.querySelector('#selectIn')
const selectOut = document.querySelector('#selectOut')
const textInput = document.querySelector('#text-input');
const textOutput = document.querySelector('#text-output');
const btn = document.querySelector('.btn1');
let value;
let amount;
let baseCur;
let baseCurrency;
let finalCur;
let finalCurrency;
let result;

const rates = {};
const elementUSD = document.querySelector('[data-value="USD"]')
const elementEUR = document.querySelector('[data-value="EUR"]')
const elementGBP = document.querySelector('[data-value="GBP"]')
const elementCNY = document.querySelector('[data-value="CNY"]')
const elementKZT = document.querySelector('[data-value="KZT"]')
const elementBYN = document.querySelector('[data-value="BYN"]')

getCurrencies();

async function getCurrencies() {
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    const data = await response.json();
    result = await data;

    rates.USD = result.Valute.USD;
    rates.EUR = result.Valute.EUR;
    rates.GBP = result.Valute.GBP;
    rates.CNY = result.Valute.CNY;
    rates.KZT = result.Valute.KZT;
    rates.BYN = result.Valute.BYN;

    elementUSD.textContent = rates.USD.Value.toFixed(2);
    elementEUR.textContent = rates.EUR.Value.toFixed(2);
    elementGBP.textContent = rates.GBP.Value.toFixed(2);
    elementCNY.textContent = rates.CNY.Value.toFixed(2);
    elementKZT.textContent = (rates.KZT.Value / 100).toFixed(2);
    elementBYN.textContent = rates.BYN.Value.toFixed(2);

    if (rates.USD.Value > rates.USD.Previous) {
        elementUSD.classList.add('top')
    } else {
        elementUSD.classList.add('bottom')
    }

    if (rates.EUR.Value > rates.EUR.Previous) {
        elementEUR.classList.add('top')
    } else {
        elementEUR.classList.add('bottom')
    }

    if (rates.GBP.Value > rates.GBP.Previous) {
        elementGBP.classList.add('top')
    } else {
        elementGBP.classList.add('bottom')
    }

    if (rates.CNY.Value > rates.CNY.Previous) {
        elementCNY.classList.add('top')
    } else {
        elementCNY.classList.add('bottom')
    }

    if (rates.KZT.Value > rates.KZT.Previous) {
        elementKZT.classList.add('top')
    } else {
        elementKZT.classList.add('bottom')
    }

    if (rates.BYN.Value > rates.BYN.Previous) {
        elementBYN.classList.add('top')
    } else {
        elementBYN.classList.add('bottom')
    }

    inputRub.oninput = convertValue;
    select.oninput = convertValue;
    function convertValue() {
        outputRub.textContent = ((inputRub.value) * rates[select.value]).toFixed(2);
    }
}



document.addEventListener('DOMContentLoaded', function () {
    var moneyjs = document.createElement('script');
    moneyjs.src = 'https://openexchangerates.github.io/money.js/money.min.js';
    document.body.appendChild(moneyjs);
    moneyjs.addEventListener('load', function () {
        fetch('https://www.cbr-xml-daily.ru/latest.js')
            .then(response => response.json())
            .then(function (data) {
                const result = data;
                rates.USD = result.rates.USD;
                rates.EUR = result.rates.EUR;
                rates.GBP = result.rates.GBP;
                rates.CNY = result.rates.CNY;
                rates.KZT = result.rates.KZT;
                rates.BYN = result.rates.BYN;
                rates.RUB = 1;

                function convert() {
                    output.textContent = (input.value * (rates[selectOut.value] / rates[selectIn.value])).toFixed(2);
                }
                input.oninput = convert;
                selectOut.oninput = convert;
            });

        textInput.oninput = () => {
            value = textInput.value.split(" ");
            amount = value[0];
            baseCur = value[1];
            finalCur = value[3];
        }

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            baseCurrency = baseCur.toUpperCase();
            finalCurrency = finalCur.toUpperCase();
            textOutput.textContent = ((rates[finalCurrency] / rates[baseCurrency]) * amount).toFixed(2);
        })
    });
});