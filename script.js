// Increment CACHE_NAME for Service Worker update to force fresh load of ALL files
const CACHE_NAME = 'investment-comparator-v28'; // NEW VERSION for Vanchinad NCD Update
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  // Add your icon paths here:
  './icons/icon-72x72.png',
  './icons/icon-96x96.png',
  './icons/icon-128x128.png',
  './icons/icon-144x144.png',
  './icons/icon-152x152.png',
  './icons/icon-192x192.png',
  './icons/icon-384x384.png',
  './icons/icon-512x512.png',
  // Add image paths for service worker cache
  './images/sml.jpeg',
  './images/vfl.jpeg',
  './images/snl.jpeg',
  './images/default.jpeg' // Added for generic products like RD, ensure this image exists
];

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

// --- ORIGINAL INVESTMENT DATA STRUCTURE ---
const investmentData = {
    "SML Finance Ltd": {
        "SD 5.5 Year": [
            { "monthly": "12.5%", "yearly": "13.0%", "period": "5.5 YEARS", "remarks": "5000 to less than 5 Lakhs", "generalRemark": "No Premature Closing Allowed", "type": "SD" },
            { "monthly": "13.0%", "yearly": "13.5%", "period": "5.5 YEARS", "remarks": "5 Lakhs to less than 25 Lakhs", "generalRemark": "No Premature Closing Allowed", "type": "SD" },
            { "monthly": "14.0%", "yearly": "14.5%", "period": "5.5 YEARS", "remarks": "25 Lakhs & above", "generalRemark": "No Premature Closing Allowed", "type": "SD" }
        ],
        "Doubling Scheme": [
            { "period": "70 Months", "remarks": "5000 & Above", "doublingRemark": "Doubles on maturity.", "generalRemark": "No Premature Closing Allowed", "type": "Doubling" }
        ],
        "Non-Convertible Debentures (NCD)": [
            {
                "monthly": "12.5%",
                "yearly": "Not Available",
                "period": "10 YEARS", 
                "remarks": "2 Lakhs to less than 15 Lakhs",
                "closureRemark": "Closure allowed after 1 year.",
                "closureTerms": [
                    { "period": "Between 1 & 2 year", "cut": "1%" },
                    { "period": "Between 2 & 3 year", "cut": ".50%" },
                    { "period": "After 3 year", "cut": "No cut" },
                    { "period": "If closed after 3 years & between 2 Anniversary Years", "cut": "Effective Rate: 9%" }
                ],
                "type": "NCD"
            },
            {
                "monthly": "13%",
                "yearly": "Not Available",
                "period": "10 YEARS",
                "remarks": "15 Lakhs & above",
                "closureRemark": "Closure allowed after 1 year.",
                "closureTerms": [
                    { "period": "Between 1 & 2 year", "cut": "1%" },
                    { "period": "Between 2 & 3 year", "cut": ".50%" },
                    { "period": "After 3 year", "cut": "No cut" },
                    { "period": "If closed after 3 years & between 2 Anniversary Years", "cut": "Effective Rate: 9%" }
                ],
                "type": "NCD"
            }
        ]
    },
    "Vanchinad Finance (P) Ltd": {
        "SD 5.5 Year": [
            { "monthly": "12%", "yearly": "12.50%", "period": "5.5 YEARS", "remarks": "5000 to less than 5 Lakhs", "generalRemark": "No Premature Closing Allowed", "type": "SD" },
            { "monthly": "12.50%", "yearly": "13%", "period": "5.5 YEARS", "remarks": "5 Lakhs to less than 25 Lakhs", "generalRemark": "No Premature Closing Allowed", "type": "SD" },
            { "monthly": "13.50%", "yearly": "14%", "period": "5.5 YEARS", "remarks": "25 Lakhs & above", "generalRemark": "No Premature Closing Allowed", "type": "SD" }
        ],
        "Sub - ordinated Debt Doubling Scheme": [
            { "period": "70 Months", "remarks": "5000 & Above", "doublingRemark": "Doubles on maturity.", "generalRemark": "No Premature Closing Allowed", "type": "Doubling" }
        ],
        "Non-Convertible Debentures (NCD)": [
            {
                "monthly": "12.50%",
                "yearly": "13.00%",
                "period": "10 YEARS",
                "remarks": "2 Lakhs to less than 15 Lakhs",
                "closureRemark": "Closure allowed after 1 year.",
                "closureTerms": [
                    { "period": "Between 1 & 2 year", "cut": "2%" },
                    { "period": "Between 2 & 3 year", "cut": "1%" },
                    { "period": "After 3 year", "cut": "No cut" },
                    { "period": "If closed after 3 years & between 2 Anniversary Years", "cut": "Effective Rate: 9%" }
                ],
                "type": "NCD"
            },
            {
                "monthly": "13.00%",
                "yearly": "13.50%",
                "period": "10 YEARS",
                "remarks": "15 Lakhs & above",
                "closureRemark": "Closure allowed after 1 year.",
                "closureTerms": [
                    { "period": "Between 1 & 2 year", "cut": "2%" },
                    { "period": "Between 2 & 3 year", "cut": "1%" },
                    { "period": "After 3 year", "cut": "No cut" },
                    { "period": "If closed after 3 years & between 2 Anniversary Years", "cut": "Effective Rate: 9%" }
                ],
                "type": "NCD"
            }
        ]
    },
    "SANGEETH NIDHI": {
        "Sangeeth Nidhi Deposits": [
            { "period": "6 MONTHS to Less than 1 Year", "yearly": "9%", "remarks": "5000 and above", "type": "SD", "validPeriods": [1], "defaultPeriod": 1 },
            { "period": "1 Year to less than 3Years", "monthly": "9.50%", "yearly": "10.00%", "remarks": "5000 and above", "type": "SD", "validPeriods": [1, 2], "defaultPeriod": 1 },
            { "period": "3 Year to 5 Years", "monthly": "10.00%", "yearly": "10.50%", "remarks": "5000 and above", "type": "SD", "validPeriods": [3, 4, 5], "defaultPeriod": 3 },
	    { "period": "5 Years", "monthly": "12%", "yearly": "12.50%", "remarks": "5 LAKHS and above", "type": "SD", "validPeriods": [5], "defaultPeriod": 5, "minAmt": 500000 }
        ]
    },
    "Special Calculators": {
        "Recurring Deposit (RD)": [
            {
                "type": "RD",
                "rateStructure": {
                    "1": 10.0,
                    "2": 10.0,
                    "3": 10.0,
                    "4": 10.0,
                    "5": 10.0 
                },
                "minAmount": 1000,
                "period": "1 to 5 Years",
                "displayRemarks": "Monthly Deposit (₹1000 or more)"
            }
        ]
    }
};

// DOM Elements
const companySelect = document.getElementById('company-select');
const productSelect = document.getElementById('product-select');

const allOptionsView = document.getElementById('all-options-view');
const selectedCompanyNameAll = document.getElementById('selected-company-name-all');
const selectedProductNameAll = document.getElementById('selected-product-name-all');
const productOptionsGrid = document.getElementById('product-options-grid'); 

const singleOptionCalculatorView = document.getElementById('single-option-calculator-view');
const selectedCompanyNameSingle = document.getElementById('selected-company-name-single');
const selectedProductNameSingle = document.getElementById('selected-product-name-single');
const selectedProductDetailCard = document.getElementById('selected-product-detail-card');
const changeOptionButton = document.getElementById('change-option-button');

const investmentAmountInput = document.getElementById('investment-amount');
const calculatorResultsDiv = document.getElementById('calculator-results');
const goToCalculatorLink = document.getElementById('go-to-calculator-link');

const investmentPeriodInput = document.getElementById('investment-period');
const investmentPeriodControl = document.getElementById('investment-period-control');


// Global state variables
let currentSelectedProductOptions = []; 
let currentSelectedProductType = '';    
let currentSelectedDetailForCalc = null; 
let currentSelectedDetailIndex = -1; 

let allowedMinAmount = 0;
let allowedMaxAmount = Infinity;
let specificAmountRequired = false;


// --- UI View Management Functions ---

function showAllOptionsView() {
    singleOptionCalculatorView.classList.add('hidden');
    allOptionsView.classList.remove('hidden');
    investmentAmountInput.value = ''; 
    if (investmentPeriodInput) investmentPeriodInput.value = '';
    if (investmentPeriodControl) investmentPeriodControl.classList.add('hidden');

    calculatorResultsDiv.innerHTML = '<p class="placeholder-text">Enter an amount and select a product option above to calculate returns.</p>';
    resetAmountConstraints();
    selectedCompanyNameAll.textContent = companySelect.value ? companySelect.value : '';
    selectedProductNameAll.textContent = productSelect.value ? productSelect.value : '';
    companySelect.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function showSingleOptionCalculatorView() {
    allOptionsView.classList.add('hidden');
    singleOptionCalculatorView.classList.remove('hidden');
    selectedCompanyNameSingle.textContent = companySelect.value ? companySelect.value : '';
    selectedProductNameSingle.textContent = productSelect.value ? productSelect.value : '';
    singleOptionCalculatorView.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function populateProductSelect(companyName) {
    productSelect.innerHTML = '<option value="">-- Select a product type --</option>';
    productSelect.disabled = true;
    selectedProductNameAll.textContent = '';
    selectedCompanyNameAll.textContent = companyName ? companyName : '';
    productOptionsGrid.innerHTML = '<p class="placeholder-text">Select a company and a product type to view available options.</p>';

    showAllOptionsView();
    currentSelectedDetailForCalc = null;
    currentSelectedDetailIndex = -1;
    resetAmountConstraints();
    if (investmentPeriodInput) investmentPeriodInput.value = '';
    if (investmentPeriodControl) investmentPeriodControl.classList.add('hidden');


    if (companyName && investmentData[companyName]) {
        const products = Object.keys(investmentData[companyName]);
        products.forEach(product => {
            const option = document.createElement('option');
            option.value = product;
            option.textContent = product;
            productSelect.appendChild(option);
        });
        productSelect.disabled = false;
    }
}


function displayProductOptions(companyName, productName) {
    productOptionsGrid.innerHTML = '';
    selectedCompanyNameAll.textContent = companyName ? companyName : '';
    selectedProductNameAll.textContent = productName ? productName : '';

    currentSelectedProductOptions = [];
    currentSelectedProductType = productName;
    currentSelectedDetailForCalc = null;
    currentSelectedDetailIndex = -1;
    showAllOptionsView();
    if (investmentPeriodInput) investmentPeriodInput.value = '';
    if (investmentPeriodControl) investmentPeriodControl.classList.add('hidden');


    if (!companyName || !productName || !investmentData[companyName] || !investmentData[companyName][productName]) {
        productOptionsGrid.innerHTML = '<p class="placeholder-text">Select a company and a product type to view available options.</p>';
        return;
    }

    const detailsArray = investmentData[companyName][productName];
    currentSelectedProductOptions = detailsArray;

    if (detailsArray.length === 1 && detailsArray[0].type === "RD") {
        handleOptionSelection(0, null);
        return;
    }

    detailsArray.forEach((detail, index) => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.addEventListener('click', () => handleOptionSelection(index, card));

        const sanitizedCompanyName = companyName.replace(/[^a-zA-Z0-9]/g, '');
        const sanitizedProductName = productName.replace(/[^a-zA-Z0-9]/g, '');
        const radioGroupName = `${sanitizedCompanyName}-${sanitizedProductName}-option`;
        const radioId = `option-${sanitizedCompanyName}-${sanitizedProductName}-${index}`;

        let displayLabel = "For Amount:";
        let displayValue = detail.remarks || 'No specific remarks.';

        if (companyName === "SANGEETH NIDHI") {
            displayLabel = "For Period:";
            displayValue = detail.period || 'Not specified';
        } else {
            displayValue = displayValue.replace(/^(Between\s|between\s)/, '');
            displayValue = displayValue.replace(/\sbetween\s/ig, ' ');
            displayValue = displayValue.trim();
        }

        let cardContent = `
            <input type="radio" class="product-option-select" name="${radioGroupName}" id="${radioId}" value="${index}" ${currentSelectedDetailIndex === index ? 'checked' : ''}>
            <label for="${radioId}">
                <h4>Option ${index + 1}</h4>
                <p><strong>${displayLabel}</strong> ${displayValue}</p>
            </label>
        `;

        card.innerHTML = cardContent;
        productOptionsGrid.appendChild(card);

        if (currentSelectedDetailIndex === index) {
            card.classList.add('selected');
        }
    });
}


function handleOptionSelection(index, clickedCard) {
    if (clickedCard) {
        const previouslySelectedCard = document.querySelector('.product-card.selected');
        if (previouslySelectedCard) {
            previouslySelectedCard.classList.remove('selected');
        }
        clickedCard.classList.add('selected');
        const radioElement = clickedCard.querySelector('.product-option-select');
        if (radioElement) {
            radioElement.checked = true;
        }
    }

    currentSelectedDetailForCalc = currentSelectedProductOptions[index];
    currentSelectedDetailIndex = index;
    setAmountConstraints(currentSelectedDetailForCalc);
    setPeriodConstraintsAndVisibility(companySelect.value, productSelect.value);

    displaySingleProductDetailsAndCalculator(companySelect.value, productSelect.value, currentSelectedDetailForCalc);
    calculateInvestmentReturns();
}


function setPeriodConstraintsAndVisibility(companyName, productName) {
    if (!investmentPeriodControl || !investmentPeriodInput) return;

    const isSangeethNidhi = companyName === "SANGEETH NIDHI";
    const isNCD = productName.toLowerCase().includes('ncd');

    if (!isSangeethNidhi && !isNCD) {
        investmentPeriodControl.classList.add('hidden');
        investmentPeriodInput.value = '';
        return;
    }

    investmentPeriodControl.classList.remove('hidden');
    
    if (isSangeethNidhi && currentSelectedDetailForCalc) {
        const detail = currentSelectedDetailForCalc;
        if (detail.validPeriods) {
            investmentPeriodInput.min = Math.min(...detail.validPeriods);
            investmentPeriodInput.max = Math.max(...detail.validPeriods);
            investmentPeriodInput.value = detail.defaultPeriod;
        }
        
        if (detail.minAmt) {
            investmentAmountInput.value = detail.minAmt;
            investmentAmountInput.min = detail.minAmt;
            allowedMinAmount = detail.minAmt;
            investmentAmountInput.placeholder = "Enter ₹ " + detail.minAmt.toLocaleString('en-IN') + " or more";
        }
    } else if (isNCD) {
        investmentPeriodInput.min = '1';
        investmentPeriodInput.max = '10';
        investmentPeriodInput.placeholder = '1 to 10 Years';
    }

}


function displaySingleProductDetailsAndCalculator(companyName, productName, detail) {
    if (!detail) {
        selectedProductDetailCard.innerHTML = '<p class="placeholder-text">No option selected for detailed view.</p>';
        calculatorResultsDiv.innerHTML = '<p class="placeholder-text">Select an option to calculate returns.</p>';
        return;
    }

    selectedCompanyNameSingle.textContent = companyName;
    selectedProductNameSingle.textContent = productName;

    const isDoublingProduct = productName.toLowerCase().includes('doubling');
    const isNCDProduct = productName.toLowerCase().includes('ncd');
    const isRDProduct = detail.type === 'RD';

    let cardContent = isRDProduct ? '<h4>Recurring Deposit Details</h4>' : `<h4>Option ${currentSelectedDetailIndex + 1}</h4>`;

    if (isRDProduct) {
        cardContent += `<p><strong>Product:</strong> ${detail.name || productName}</p>`;
        cardContent += `<p><strong>Interest Rate:</strong> Up to 10.00%</p>`;
        cardContent += `<p><strong>Period:</strong> ${detail.period}</p>`;
        cardContent += `<p><strong>Minimum Monthly Deposit:</strong> ₹ ${detail.minAmount.toLocaleString('en-IN')}</p>`;
    } else if (companyName === "SANGEETH NIDHI") {
        if (detail.period) {
            cardContent += `<p><strong>Rate Based On Period:</strong> ${detail.period}</p>`;
        }
    } else {
        if (detail.remarks) {
            let remarkText = detail.remarks;
            remarkText = remarkText.replace(/^(Between\s|between\s)/, '');
            remarkText = remarkText.replace(/\sbetween\s/ig, ' ');
            remarkText = remarkText.trim();
            cardContent += `<p><strong>For Amount:</strong> ${remarkText}</p>`;
        }
        if (detail.period && !isNCDProduct) {
            cardContent += `<p><strong>Fixed Period:</strong> ${detail.period}</p>`;
        }
    }

    if (isDoublingProduct) {
        cardContent += `<p><strong>Remarks:</strong> ${detail.doublingRemark}</p>`;
    } else if (isNCDProduct) {
        cardContent += `
            <p><strong>Monthly Interest:</strong> ${detail.monthly}</p>
            <p><strong>Yearly Interest:</strong> ${detail.yearly}</p>
            <p><strong>Closure Remark:</strong> ${detail.closureRemark}</p>
            <p><strong>Premature Closure Terms:</strong></p>
            <table class="closure-table product-details-table"><thead>
                <tr><th>Closure Period</th><th>Interest Cut</th></tr>
            </thead><tbody>`;
        if (detail.closureTerms && detail.closureTerms.length > 0) {
            detail.closureTerms.forEach(term => {
                cardContent += `<tr><td>${term.period}</td><td>${term.cut}</td></tr>`;
            });
        } else {
            cardContent += `<tr><td colspan="2">No specific closure terms provided.</td></tr>`;
        }
        cardContent += `</tbody></table>`;
    } else if (!isRDProduct) { 
        if (detail.monthly) {
            cardContent += `<p><strong>Monthly Interest:</strong> ${detail.monthly}</p>`;
        }
        if (detail.yearly) {
            cardContent += `<p><strong>Yearly Interest:</strong> ${detail.yearly}</p>`;
        }
    }

    if ((isDoublingProduct || (detail.type === 'SD' && companyName !== "SANGEETH NIDHI")) && detail.generalRemark) {
        cardContent += `<p class="general-remark"><strong>Important:</strong> ${detail.generalRemark}</p>`;
    }

    selectedProductDetailCard.innerHTML = cardContent;
    showSingleOptionCalculatorView();
}


function parsePercentage(value) {
    if (typeof value === 'string') {
        const num = parseFloat(value.replace('%', ''));
        return isNaN(num) ? null : num / 100;
    }
    return null;
}


function getPeriodInMonths(detailPeriod) {
    if (investmentPeriodControl && !investmentPeriodControl.classList.contains('hidden')) {
        const userYears = parseFloat(investmentPeriodInput.value);
        if (!isNaN(userYears) && userYears > 0) {
            return Math.round(userYears * 12);
        }
    }

    let period_in_months = 0;
    const lowerPeriod = detailPeriod.toLowerCase();

    if (lowerPeriod.includes('5.5 years')) {
        period_in_months = 66;
    } else if (lowerPeriod.includes('10 years')) {
        period_in_months = 120;
    } else if (lowerPeriod.includes('year')) {
        const yearMatch = lowerPeriod.match(/(\d+\.?\d*)\s*year/i);
        if (yearMatch) {
            const years = parseFloat(yearMatch[1]);
            period_in_months = Math.round(years * 12);
        } else if (lowerPeriod.includes('6 months to less than 1 year')) {
            period_in_months = 11;
        } else if (lowerPeriod.includes('1 year to less than 3years')) {
            period_in_months = 35;
        } else if (lowerPeriod.includes('3 year to 5 years')) {
            period_in_months = 60;
        }
    }
    return period_in_months;
}


function calculateSimpleAnnuityFormula(years, annualRatePercentage) {
    const r = annualRatePercentage / 100 / 12; 
    const n = years * 12; 

    const numerator = Math.pow((1 + r), n) - 1;
    const denominator = 1 - Math.pow((1 + r), -1);
    
    if (denominator === 0) {
        return 0;
    }

    return numerator / denominator;
}


function calculateRdConversion(amount, monthlyRateStr, total_period_in_months) {
    const monthlyRate = parsePercentage(monthlyRateStr);

    if (monthlyRate === null || total_period_in_months <= 0) return '';

    const monthly_deposit_amount = amount * monthlyRate / 12;
    if (monthly_deposit_amount <= 0) return '';

    const RD_MAX_PERIOD = 60; 

    const rd_period_in_months = Math.min(total_period_in_months, RD_MAX_PERIOD);
    const remaining_principal_period = total_period_in_months - rd_period_in_months;

    let rd_maturity_amount = 0;
    let rd_total_deposit = 0;
    let remaining_principal_interest = 0;
    let annualRatePercentage = 0;

    if (rd_period_in_months > 0) {
        const rdProductDetail = investmentData["Special Calculators"]["Recurring Deposit (RD)"][0];
        const rateStructure = rdProductDetail.rateStructure; 
        
        const rd_period_in_years_decimal = rd_period_in_months / 12;
        const rd_period_in_full_years = Math.ceil(rd_period_in_years_decimal);
        annualRatePercentage = rateStructure[rd_period_in_full_years.toString()] || rateStructure["5"];
        
        const factor = calculateSimpleAnnuityFormula(rd_period_in_years_decimal, annualRatePercentage);

        rd_maturity_amount = monthly_deposit_amount * factor;
        rd_total_deposit = monthly_deposit_amount * rd_period_in_months;
    }

    if (remaining_principal_period > 0) {
        remaining_principal_interest = amount * monthlyRate * (remaining_principal_period / 12);
    }

    const rd_interest_earned = rd_maturity_amount - rd_total_deposit;
    const total_interest_earned = rd_interest_earned + remaining_principal_interest;
    const final_total_return = amount + total_interest_earned + rd_total_deposit;

    const roundedMonthlyDeposit = Math.round(monthly_deposit_amount);
    const roundedMaturity = Math.round(final_total_return);
    const roundedInterest = Math.round(total_interest_earned);

    let period_details = `RD Period: ${rd_period_in_months} Mths`;
    if (remaining_principal_period > 0) {
        period_details += ` + ${remaining_principal_period} Mths (Principal SI)`;
    }
    
    return `
        <div class="calculator-result-card rd-conversion-card">
            <h4>Total Return (RD Conversion)</h4>
            <p><strong>₹ ${roundedMaturity.toLocaleString('en-IN')}</strong></p>
            <p class="small-text">Total Interest Earned: ₹ ${roundedInterest.toLocaleString('en-IN')}</p>
            <p class="small-text">Monthly Interest Reinvested: ₹ ${roundedMonthlyDeposit.toLocaleString('en-IN')}</p>
            <p class="small-text">${period_details}</p>
            <p class="small-text-note">RD Rate Used: ${annualRatePercentage || 'N/A'}% (based on final RD year)</p>
        </div>
    `;
}


function parseAmountRange(remarks) {
    let min = 0;
    let max = Infinity;
    let specific = null;

    if (!remarks) {
        return { min, max, specific };
    }

    const lowerCaseRemarks = remarks.toLowerCase();

    const aboveMatch = lowerCaseRemarks.match(/(\d+\s*lakhs|\d+)\s*&?\s*above/);
    if (aboveMatch) {
        min = parseAmountString(aboveMatch[1]);
    }
    else if (lowerCaseRemarks.includes('to less than')) {
        const match = lowerCaseRemarks.match(/(\d+\s*lakhs|\d+)\s*to less than\s*(\d+\s*lakhs|\d+)/);
        if (match) {
            min = parseAmountString(match[1]);
            max = parseAmountString(match[2]) - 1;
        }
    }
    else if (/\d+/.test(lowerCaseRemarks)) { 
        const exactMatch = lowerCaseRemarks.match(/(\d+\s*lakhs|\d+)/);
        if (exactMatch) {
            specific = parseAmountString(exactMatch[0]);
            min = specific;
            max = specific;
        }
    }

    return { min, max, specific };
}


function parseAmountString(amountStr) {
    amountStr = amountStr.toLowerCase().replace(/\s/g, '');
    if (amountStr.includes('lakhs')) {
        return parseFloat(amountStr.replace('lakhs', '')) * 100000;
    }
    return parseFloat(amountStr);
}


function setAmountConstraints(detail) {
    if (detail && detail.type === "RD") {
        specificAmountRequired = false;
        investmentAmountInput.readOnly = false;
        investmentAmountInput.min = detail.minAmount.toString();
        investmentAmountInput.max = '';
        allowedMinAmount = detail.minAmount;
        allowedMaxAmount = Infinity;
        investmentAmountInput.placeholder = `Enter monthly deposit (₹${detail.minAmount.toLocaleString('en-IN')} or more)`;
        return;
    }

    if (companySelect.value === "SANGEETH NIDHI") {
        specificAmountRequired = false;
        investmentAmountInput.readOnly = false;
        investmentAmountInput.min = '5000';
        investmentAmountInput.max = '';
        allowedMinAmount = 5000;
        allowedMaxAmount = Infinity;
        investmentAmountInput.placeholder = 'Enter ₹ 5,000 and above';
        return;
    }

    if (!detail || !detail.remarks) {
        resetAmountConstraints();
        return;
    }

    const { min, max, specific } = parseAmountRange(detail.remarks);

    allowedMinAmount = min;
    allowedMaxAmount = max;

    if (specific !== null) {
        specificAmountRequired = true;
        investmentAmountInput.value = specific;
        investmentAmountInput.readOnly = true;
        investmentAmountInput.min = specific;
        investmentAmountInput.max = specific;
    } else {
        specificAmountRequired = false;
        investmentAmountInput.readOnly = false;
        investmentAmountInput.min = min === 0 ? '' : min;
        investmentAmountInput.max = max === Infinity ? '' : max;
    }

    investmentAmountInput.placeholder = getPlaceholderText(min, max, specific);
}


function getPlaceholderText(min, max, specific) {
    if (specific !== null) {
        return `Enter ₹ ${specific.toLocaleString('en-IN')}`;
    }
    if (min > 0 && max !== Infinity) {
        return `Enter between ₹ ${min.toLocaleString('en-IN')} and ₹ ${max.toLocaleString('en-IN')}`;
    }
    if (min > 0) {
        return `Enter ₹ ${min.toLocaleString('en-IN')} and above`;
    }
    return 'e.g., 10000';
}


function resetAmountConstraints() {
    allowedMinAmount = 0;
    allowedMaxAmount = Infinity;
    specificAmountRequired = false;
    investmentAmountInput.readOnly = false;
    investmentAmountInput.min = '';
    investmentAmountInput.max = '';
    investmentAmountInput.placeholder = 'e.g., 10000';
    investmentAmountInput.classList.remove('invalid-input');
}


function calculateInvestmentReturns() {
    const amount = parseFloat(investmentAmountInput.value);
    calculatorResultsDiv.innerHTML = '';

    if (isNaN(amount) || amount <= 0) {
        calculatorResultsDiv.innerHTML = '<p class="placeholder-text">Enter a valid positive amount.</p>';
        investmentAmountInput.classList.add('invalid-input');
        return;
    }

    if (!currentSelectedDetailForCalc || !currentSelectedProductType) {
        calculatorResultsDiv.innerHTML = '<p class="placeholder-text">Please select a product option above to calculate returns.</p>';
        investmentAmountInput.classList.remove('invalid-input');
        return;
    }

    const detail = currentSelectedDetailForCalc;
    const productName = currentSelectedProductType;
    const companyName = companySelect.value;
    
    let total_period_in_months = 0;
    if (investmentPeriodControl && !investmentPeriodControl.classList.contains('hidden')) {
        const userYears = parseFloat(investmentPeriodInput.value);
        const minYears = parseFloat(investmentPeriodInput.min);
        const maxYears = parseFloat(investmentPeriodInput.max);

        if (isNaN(userYears) || userYears < minYears || userYears > maxYears) {
            const range = maxYears === 10 ? '1 to 10' : '1 to 5';
            calculatorResultsDiv.innerHTML = `<p class="error-message">Please enter a valid investment period (in years) between ${range} for this product.</p>`;
            investmentPeriodInput.classList.add('invalid-input');
            investmentAmountInput.classList.remove('invalid-input');
            return;
        }
        total_period_in_months = Math.round(userYears * 12);
        investmentPeriodInput.classList.remove('invalid-input');
    }

   if (detail.type === 'RD') {
        if (isNaN(amount) || amount < detail.minAmount) {
            calculatorResultsDiv.innerHTML = `<p class="error-message">Please enter a monthly deposit amount (₹${detail.minAmount.toLocaleString('en-IN')} or more) to see maturity details.</p>`;
            investmentAmountInput.classList.add('invalid-input');
            return;
        }

        const rateStructure = detail.rateStructure; 
        let tableHTML = `<table class="maturity-table"><thead><tr><th>Period (Years)</th><th>Rate</th><th>Maturity Amount</th></tr></thead><tbody>`;

        for (let years = 1; years <= 5; years++) {
            const annualRatePercentage = rateStructure[years.toString()]; 
            
            if (!annualRatePercentage) {
                tableHTML += `<tr><td>${years} Year${years > 1 ? 's' : ''}</td><td>N/A</td><td>Error</td></tr>`;
                continue;
            }

            const factor = calculateSimpleAnnuityFormula(years, annualRatePercentage);
            const maturityAmount = amount * factor;
            const roundedMaturity = Math.round(maturityAmount);

            tableHTML += `<tr><td>${years} Year${years > 1 ? 's' : ''}</td><td>${annualRatePercentage}%</td><td>₹ ${roundedMaturity.toLocaleString('en-IN')}</td></tr>`;
        }

        tableHTML += `</tbody></table>`;
        calculatorResultsDiv.innerHTML = tableHTML;
        investmentAmountInput.classList.remove('invalid-input'); 
        return; 
    }

    if (companyName === "SANGEETH NIDHI") {
        if (amount < 5000) {
            calculatorResultsDiv.innerHTML = `<p class="error-message">Please enter an amount of ₹ 5,000 or more for Sangeeth Nidhi.</p>`;
            investmentAmountInput.classList.add('invalid-input');
            return;
        }
    } else if (specificAmountRequired && amount !== allowedMinAmount) {
        calculatorResultsDiv.innerHTML = `<p class="error-message">Please enter the specific amount: ₹ ${allowedMinAmount.toLocaleString('en-IN')}</p>`;
        investmentAmountInput.classList.add('invalid-input');
        return;
    } else if (!specificAmountRequired && (amount < allowedMinAmount || amount > allowedMaxAmount)) {
        let errorMessage = `<p class="error-message">Please enter an amount `;
        if (allowedMinAmount > 0 && allowedMaxAmount !== Infinity) {
            errorMessage += `between ₹ ${allowedMinAmount.toLocaleString('en-IN')} and ₹ ${allowedMaxAmount.toLocaleString('en-IN')}.`;
        } else if (allowedMinAmount > 0) {
            errorMessage += `of ₹ ${allowedMinAmount.toLocaleString('en-IN')} or more.`;
        }
        errorMessage += `</p>`;
        calculatorResultsDiv.innerHTML = errorMessage;
        investmentAmountInput.classList.add('invalid-input');
        return;
    }

    investmentAmountInput.classList.remove('invalid-input'); 

    if (total_period_in_months === 0) {
        total_period_in_months = getPeriodInMonths(detail.period);
    }
    const period_in_months = total_period_in_months;
    const period_in_years = period_in_months / 12;

    let resultsHTML = '';

    const isDoublingProduct = productName.toLowerCase().includes('doubling');
    const isNCDProduct = productName.toLowerCase().includes('ncd');

    if (isDoublingProduct) {
        const maturityAmount = amount * 2;
        resultsHTML = `
            <div class="calculator-result-card">
                <h4>Doubling Scheme Result</h4>
                <p><strong>₹ ${maturityAmount.toLocaleString('en-IN')}</strong></p>
                <p class="small-text">Investment Amount: ₹ ${amount.toLocaleString('en-IN')}</p>
                <p class="small-text">Period: ${detail.period}</p>
            </div>
        `;
    } else if (isNCDProduct || detail.type === 'SD') { 
        
        const monthlyRate = parsePercentage(detail.monthly);
        const yearlyRate = parsePercentage(detail.yearly);
        
        let calculatedMonthlyInterest = 0;
        if (monthlyRate !== null) {
            calculatedMonthlyInterest = amount * monthlyRate / 12;
        }

        let calculatedAnnualInterest = 0;
        if (yearlyRate !== null) {
            calculatedAnnualInterest = amount * yearlyRate;
        }
        
        const totalInterestMonthly = calculatedMonthlyInterest * period_in_months;
        const totalReturnMonthly = amount + totalInterestMonthly;

        const totalInterestAnnual = calculatedAnnualInterest * period_in_years;
        const totalReturnAnnual = amount + totalInterestAnnual;

        const monthlyInterestCard = `
            <div class="calculator-result-card">
                <h4>Monthly Interest Payout</h4>
                <p><strong>${monthlyRate !== null ? `₹ ${Math.round(calculatedMonthlyInterest).toLocaleString('en-IN')}` : 'N/A'}</strong></p>
                <p class="small-text">Interest Rate: ${detail.monthly || 'N/A'}</p>
            </div>
        `;
        
        const annualInterestCard = `
            <div class="calculator-result-card">
                <h4>Annual Interest Payout</h4>
                <p><strong>${yearlyRate !== null ? `₹ ${Math.round(calculatedAnnualInterest).toLocaleString('en-IN')}` : 'N/A'}</strong></p>
                <p class="small-text">Interest Rate: ${detail.yearly || 'N/A'}</p>
            </div>
        `;
        
        const monthlyMaturityCard = `
            <div class="calculator-result-card">
                <h4>Total Return (Monthly Payout)</h4>
                <p><strong>₹ ${Math.round(totalReturnMonthly).toLocaleString('en-IN')}</strong></p>
                <p class="small-text">Total Interest Earned: ₹ ${Math.round(totalInterestMonthly).toLocaleString('en-IN')}</p>
                <p class="small-text">on ${period_in_months} Months</p>
            </div>
        `;

        const annualMaturityCard = `
            <div class="calculator-result-card">
                <h4>Total Return (Annual Payout)</h4>
                <p><strong>₹ ${Math.round(totalReturnAnnual).toLocaleString('en-IN')}</strong></p>
                <p class="small-text">Total Interest Earned: ₹ ${Math.round(totalInterestAnnual).toLocaleString('en-IN')}</p>
                <p class="small-text">on ${period_in_months} Months</p>
            </div>
        `;
        
        let rdConversionResult = '';
        if (detail.monthly) {
            rdConversionResult = calculateRdConversion(amount, detail.monthly, period_in_months);
        }

        resultsHTML = monthlyInterestCard;
        resultsHTML += annualInterestCard;
        resultsHTML += monthlyMaturityCard;
        resultsHTML += annualMaturityCard;
        resultsHTML += rdConversionResult;
    }

    calculatorResultsDiv.innerHTML = `<div class="calculator-results-grid">${resultsHTML}</div>`;
}

// Event Listeners
companySelect.addEventListener('change', (event) => {
    const selectedCompany = event.target.value;
    populateProductSelect(selectedCompany);
});

productSelect.addEventListener('change', (event) => {
    const selectedProduct = event.target.value;
    const selectedCompany = companySelect.value;
    displayProductOptions(selectedCompany, selectedProduct); 
});

investmentAmountInput.addEventListener('input', calculateInvestmentReturns);

if (investmentPeriodInput) {
    investmentPeriodInput.addEventListener('input', calculateInvestmentReturns);
}

changeOptionButton.addEventListener('click', () => {
    showAllOptionsView();
});

goToCalculatorLink.addEventListener('click', function (e) {
    e.preventDefault();
    if (!singleOptionCalculatorView.classList.contains('hidden')) {
        singleOptionCalculatorView.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    } else {
        alert('Please select a product option first to go to the calculator!');
    }
});


function populateCompanySelect() {
    companySelect.innerHTML = ''; 
    let defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '-- Select a company --';
    companySelect.appendChild(defaultOption);
    
    Object.keys(investmentData).forEach(company => {
        const option = document.createElement('option');
        option.value = company;
        option.textContent = company;
        companySelect.appendChild(option);
    });
}
populateCompanySelect();
showAllOptionsView();
