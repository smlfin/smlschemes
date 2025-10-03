// Increment CACHE_NAME for Service Worker update to force fresh load of ALL files
const CACHE_NAME = 'investment-comparator-v23'; // NEW VERSION for RD integration
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

// --- ORIGINAL INVESTMENT DATA STRUCTURE (with RD added) ---
const investmentData = {
    "SML Finance Ltd": {
        "SD 5.5 Year": [
            { "monthly": "12.5%", "yearly": "13.0%", "period": "5.5 YEARS", "remarks": "5000 to less than 5 Lakhs", "generalRemark": "No Premature Closing Allowed", "type": "SD" },
            { "monthly": "13.0%", "yearly": "13.5%", "period": "5.5 YEARS", "remarks": "5 Lakhs to less than 25 Lakhs", "generalRemark": "No Premature Closing Allowed", "type": "SD" },
            { "monthly": "14.0%", "yearly": "14.5%", "period": "5.5 YEARS", "remarks": "25 Lakhs & above", "generalRemark": "No Premature Closing Allowed", "type": "SD" }
        ],
        "Doubling Scheme": [
            { "period": "6 YEARS", "remarks": "5000 & Above", "doublingRemark": "Doubles on maturity.", "generalRemark": "No Premature Closing Allowed", "type": "Doubling" }
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
            { "period": "6 YEARS", "remarks": "5000 & Above", "doublingRemark": "Doubles on maturity.", "generalRemark": "No Premature Closing Allowed", "type": "Doubling" }
        ],
        "Non-Convertible Debentures (NCD)": [
            {
                "monthly": "12.5%",
                "yearly": "13.0%",
                "period": "10 YEARS",
                "remarks": "5 Lakhs to less than 15 Lakhs",
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
                "monthly": "13.0%",
                "yearly": "13.5%",
                "period": "10 YEARS",
                "remarks": "15 Laksh & above",
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
            { "period": "6 MONTHS to Less than 1 Year", "yearly": "9%", "remarks": "5000 and above", "type": "SD" },
            { "period": "1 Year to 5 Years", "monthly": "12%", "yearly": "12.50%", "remarks": "5000 and above", "type": "SD" }
        ]
    },
    // --- NEW: Recurring Deposit Product Category ---
    "Special Calculators": {
        "Recurring Deposit (RD)": [
            {
                "type": "RD", // Custom type to identify RD
                "fixedRate": 12.12,
                "minAmount": 1000, // Minimum monthly deposit for RD
                "period": "1 to 5 Years", // A general period description for display
                "displayRemarks": "Monthly Deposit (₹1000 or more)" // Custom remark for UI
            }
        ]
    }
};

// DOM Elements
const companySelect = document.getElementById('company-select');
const productSelect = document.getElementById('product-select');

// Elements for "All Options" view
const allOptionsView = document.getElementById('all-options-view');
const selectedCompanyNameAll = document.getElementById('selected-company-name-all');
const selectedProductNameAll = document.getElementById('selected-product-name-all');
const productOptionsGrid = document.getElementById('product-options-grid'); // Renamed from productDetailsDiv

// Elements for "Single Option + Calculator" view
const singleOptionCalculatorView = document.getElementById('single-option-calculator-view');
const selectedCompanyNameSingle = document.getElementById('selected-company-name-single');
const selectedProductNameSingle = document.getElementById('selected-product-name-single');
const selectedProductDetailCard = document.getElementById('selected-product-detail-card');
const changeOptionButton = document.getElementById('change-option-button');

const investmentAmountInput = document.getElementById('investment-amount');
const calculatorResultsDiv = document.getElementById('calculator-results');
const goToCalculatorLink = document.getElementById('go-to-calculator-link'); // Get the header link


// Global state variables
let currentSelectedProductOptions = []; // Stores ALL options for the selected product type
let currentSelectedProductType = '';    // Stores the product name (e.g., "SD 5.5 Year" or "Recurring Deposit (RD)")
let currentSelectedDetailForCalc = null; // Stores the specific detail object chosen by radio button or directly for RD
let currentSelectedDetailIndex = -1; // To keep track of the selected radio button visually

let allowedMinAmount = 0;
let allowedMaxAmount = Infinity;
let specificAmountRequired = false;


// --- UI View Management Functions ---

function showAllOptionsView() {
    singleOptionCalculatorView.classList.add('hidden');
    allOptionsView.classList.remove('hidden');
    investmentAmountInput.value = ''; // Clear calculator input when changing view
    calculatorResultsDiv.innerHTML = '<p class="placeholder-text">Enter an amount and select a product option above to calculate returns.</p>';
    resetAmountConstraints(); // Reset calculator constraints
    // Update header company/product names for this view
    selectedCompanyNameAll.textContent = companySelect.value ? companySelect.value : '';
    selectedProductNameAll.textContent = productSelect.value ? productSelect.value : '';
    // Scroll to top of the controls/company/product area
    companySelect.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function showSingleOptionCalculatorView() {
    allOptionsView.classList.add('hidden');
    singleOptionCalculatorView.classList.remove('hidden');
    // Update header company/product names for this view
    selectedCompanyNameSingle.textContent = companySelect.value ? companySelect.value : '';
    selectedProductNameSingle.textContent = productSelect.value ? productSelect.value : '';
    // Scroll to the top of this new view
    singleOptionCalculatorView.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// --- Data Population and Display Functions ---

function populateProductSelect(companyName) {
    productSelect.innerHTML = '<option value="">-- Select a product type --</option>'; // Clarified text
    productSelect.disabled = true;
    selectedProductNameAll.textContent = '';
    selectedCompanyNameAll.textContent = companyName ? companyName : '';
    productOptionsGrid.innerHTML = '<p class="placeholder-text">Select a company and a product type to view available options.</p>';

    // Always show the all-options view when company/product type changes
    showAllOptionsView();
    currentSelectedDetailForCalc = null;
    currentSelectedDetailIndex = -1; // Reset selected index
    resetAmountConstraints();

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
    currentSelectedDetailIndex = -1; // Reset selected index
    showAllOptionsView(); // Ensure we are in the all-options view

    if (!companyName || !productName || !investmentData[companyName] || !investmentData[companyName][productName]) {
        productOptionsGrid.innerHTML = '<p class="placeholder-text">Select a company and a product type to view available options.</p>';
        return;
    }

    const detailsArray = investmentData[companyName][productName];
    currentSelectedProductOptions = detailsArray; // Store all options for the selected product type

    // --- Special handling for RD product: directly show calculator view ---
    if (detailsArray.length === 1 && detailsArray[0].type === "RD") {
        // Since there's only one RD option, directly select it and show the calculator
        handleOptionSelection(0, null); // Pass null for clickedCard as it's not a card click
        return; // Exit as RD handled
    }

    // --- Existing logic for other products (SD, Doubling, NCD) ---
    if (companyName === "Vanchinad Finance (P) Ltd" && productName === "Non-Convertible Debentures (NCD)") {
        productOptionsGrid.innerHTML = `
            <div class="no-ncd-message">
                <p><strong>Currently no NCD issue available. Kindly Opt SML NCD.</strong></p>
            </div>
        `;
        return;
    }

    detailsArray.forEach((detail, index) => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        // Add click listener to the entire card
        card.addEventListener('click', () => handleOptionSelection(index, card));

        const sanitizedCompanyName = companyName.replace(/[^a-zA-Z0-9]/g, '');
        const sanitizedProductName = productName.replace(/[^a-zA-Z0-9]/g, '');
        const radioGroupName = `${sanitizedCompanyName}-${sanitizedProductName}-option`;
        const radioId = `option-${sanitizedCompanyName}-${sanitizedProductName}-${index}`;

        let displayLabel = "For Amount:";
        let displayValue = detail.remarks || 'No specific remarks.';

        // Special handling for SANGEETH NIDHI
        if (companyName === "SANGEETH NIDHI") {
            displayLabel = "For Period:";
            displayValue = detail.period || 'Not specified';
        } else {
            // Apply existing remark cleaning only if it's not SANGEETH NIDHI
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
        // Note: Full details like monthly/yearly/closure terms are NOT shown here initially.

        card.innerHTML = cardContent;
        productOptionsGrid.appendChild(card);

        // If this card was previously selected, apply the 'selected' class
        if (currentSelectedDetailIndex === index) {
            card.classList.add('selected');
        }
    });
}


function handleOptionSelection(index, clickedCard) {
    // Unselect previous card, if any, and if a card was actually clicked
    if (clickedCard) {
        const previouslySelectedCard = document.querySelector('.product-card.selected');
        if (previouslySelectedCard) {
            previouslySelectedCard.classList.remove('selected');
        }
        // Select current card
        clickedCard.classList.add('selected');
        const radioElement = clickedCard.querySelector('.product-option-select');
        if (radioElement) {
            radioElement.checked = true;
        }
    }

    currentSelectedDetailForCalc = currentSelectedProductOptions[index];
    currentSelectedDetailIndex = index; // Store the index of the selected item
    setAmountConstraints(currentSelectedDetailForCalc);
    displaySingleProductDetailsAndCalculator(companySelect.value, productSelect.value, currentSelectedDetailForCalc);
    calculateInvestmentReturns(); // Perform initial calculation
}


function displaySingleProductDetailsAndCalculator(companyName, productName, detail) {
    if (!detail) {
        selectedProductDetailCard.innerHTML = '<p class="placeholder-text">No option selected for detailed view.</p>';
        calculatorResultsDiv.innerHTML = '<p class="placeholder-text">Select an option to calculate returns.</p>';
        return;
    }

    // Populate the single view's header
    selectedCompanyNameSingle.textContent = companyName;
    selectedProductNameSingle.textContent = productName;

    const isDoublingProduct = productName.toLowerCase().includes('doubling');
    const isNCDProduct = productName.toLowerCase().includes('ncd');
    const isRDProduct = detail.type === 'RD'; // Check if it's the RD type

    let cardContent = isRDProduct ? '<h4>Recurring Deposit Details</h4>' : `<h4>Option ${currentSelectedDetailIndex + 1}</h4>`; // Dynamic title

    if (isRDProduct) {
        cardContent += `<p><strong>Product:</strong> ${detail.name || productName}</p>`;
        cardContent += `<p><strong>Interest Rate:</strong> 12%</p>`;
        cardContent += `<p><strong>Period:</strong> ${detail.period}</p>`;
        cardContent += `<p><strong>Minimum Monthly Deposit:</strong> ₹ ${detail.minAmount.toLocaleString('en-IN')}</p>`;
    } else if (companyName === "SANGEETH NIDHI") {
        if (detail.period) {
            cardContent += `<p><strong>For Period:</strong> ${detail.period}</p>`;
        }
    } else {
        // For other companies, display remarks as "For Amount"
        if (detail.remarks) {
            let remarkText = detail.remarks;
            remarkText = remarkText.replace(/^(Between\s|between\s)/, '');
            remarkText = remarkText.replace(/\sbetween\s/ig, ' ');
            remarkText = remarkText.trim();
            cardContent += `<p><strong>For Amount:</strong> ${remarkText}</p>`;
        }
        if (detail.period) { // Still display period if it exists and is relevant
            cardContent += `<p><strong>Period:</strong> ${detail.period}</p>`;
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
    } else if (!isRDProduct) { // SD and Sangeeth Nidhi (after specific SANGEETH NIDHI check)
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

    // Show the single option + calculator view
    showSingleOptionCalculatorView();
}


// --- Calculator Logic (modified to include RD) ---

// Function to safely parse percentage strings
function parsePercentage(value) {
    if (typeof value === 'string') {
        const num = parseFloat(value.replace('%', ''));
        return isNaN(num) ? null : num / 100;
    }
    return null;
}

// New function to parse the amount from the remarks string
function parseAmountRange(remarks) {
    let min = 0;
    let max = Infinity;
    let specific = null;

    if (!remarks) {
        return { min, max, specific };
    }

    const lowerCaseRemarks = remarks.toLowerCase();

    // Check for "X Lakhs & above" or "X & above" (e.g., "25 Lakhs & above", "5000 & Above")
    const aboveMatch = lowerCaseRemarks.match(/(\d+\s*lakhs|\d+)\s*&?\s*above/);
    if (aboveMatch) {
        min = parseAmountString(aboveMatch[1]);
        // max remains Infinity
    }
    // Check for ranges like "X to less than Y Lakhs/amount"
    else if (lowerCaseRemarks.includes('to less than')) {
        const match = lowerCaseRemarks.match(/(\d+\s*lakhs|\d+)\s*to less than\s*(\d+\s*lakhs|\d+)/);
        if (match) {
            min = parseAmountString(match[1]);
            max = parseAmountString(match[2]) - 1; // "less than" means up to the number minus one
        }
    }
    // Check for exact amounts like "X Lakhs" or "X" (e.g., "5 Lakhs", "5000")
    else if (/\d+/.test(lowerCaseRemarks)) { // If there's a number, and it's not a range or "above"
        const exactMatch = lowerCaseRemarks.match(/(\d+\s*lakhs|\d+)/);
        if (exactMatch) {
            specific = parseAmountString(exactMatch[0]);
            min = specific;
            max = specific;
        }
    }

    return { min, max, specific };
}

// Helper function to convert Lakhs strings to numbers
function parseAmountString(amountStr) {
    amountStr = amountStr.toLowerCase().replace(/\s/g, '');
    if (amountStr.includes('lakhs')) {
        return parseFloat(amountStr.replace('lakhs', '')) * 100000;
    }
    return parseFloat(amountStr);
}

// Function to set min/max attributes on the investment amount input
function setAmountConstraints(detail) {
    // --- NEW: RD Product Specific Constraints ---
    if (detail && detail.type === "RD") {
        specificAmountRequired = false;
        investmentAmountInput.readOnly = false;
        investmentAmountInput.min = detail.minAmount.toString();
        investmentAmountInput.max = ''; // No max for RD
        allowedMinAmount = detail.minAmount;
        allowedMaxAmount = Infinity;
        investmentAmountInput.placeholder = `Enter monthly deposit (₹${detail.minAmount.toLocaleString('en-IN')} or more)`;
        return; // Exit early as RD has its own logic
    }

    // --- Existing logic for other products ---
    if (companySelect.value === "SANGEETH NIDHI") {
        specificAmountRequired = false;
        investmentAmountInput.readOnly = false;
        investmentAmountInput.min = '5000'; // Default minimum for Sangeeth Nidhi
        investmentAmountInput.max = ''; // No max
        allowedMinAmount = 5000;
        allowedMaxAmount = Infinity;
        investmentAmountInput.placeholder = 'Enter ₹ 5,000 and above';
        return; // Exit early as no further parsing of remarks is needed for constraints
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
        investmentAmountInput.value = specific; // Pre-fill with specific amount
        investmentAmountInput.readOnly = true; // Make it read-only
        investmentAmountInput.min = specific;
        investmentAmountInput.max = specific;
    } else {
        specificAmountRequired = false;
        investmentAmountInput.readOnly = false; // Make it editable
        investmentAmountInput.min = min === 0 ? '' : min;
        investmentAmountInput.max = max === Infinity ? '' : max;
    }

    investmentAmountInput.placeholder = getPlaceholderText(min, max, specific);
}

// Helper function to generate placeholder text based on constraints
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

// Function to reset min/max attributes
function resetAmountConstraints() {
    allowedMinAmount = 0;
    allowedMaxAmount = Infinity;
    specificAmountRequired = false;
    investmentAmountInput.readOnly = false;
    investmentAmountInput.min = '';
    investmentAmountInput.max = '';
    investmentAmountInput.placeholder = 'e.g., 10000';
    investmentAmountInput.classList.remove('invalid-input'); // Remove any invalid styling
}


// Calculate Investment Returns (MODIFIED)
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

    // --- NEW: RD Calculator Logic (TOP PRIORITY) ---
    if (detail.type === 'RD') {
        // Validate amount specifically for RD (must be >= 1000)
        if (isNaN(amount) || amount < detail.minAmount) {
            calculatorResultsDiv.innerHTML = `<p class="error-message">Please enter a monthly deposit amount (₹${detail.minAmount.toLocaleString('en-IN')} or more) to see maturity details.</p>`;
            investmentAmountInput.classList.add('invalid-input');
            return;
        }

        const annualRatePercentage = detail.fixedRate; // Use the fixed rate from RD product data

        let tableHTML = `
            <table class="maturity-table">
                <thead>
                    <tr>
                        <th>Period (Years)</th>
                        <th>Maturity Amount</th>
                    </tr>
                </thead>
                <tbody>
        `;

        // Loop from 1 to 5 years for RD
        for (let years = 1; years <= 5; years++) {
            const r = annualRatePercentage / 400; // Quarterly interest rate (from RD formula: I3/400)
            const n_quarters = (years * 12) / 3; // Total compounding periods (quarters: H3 = (B3*12)/3)

            // Implement the main maturity formula: A3 * (((1 + r)^H3 - 1) / (1 - ((1 + r)^(-1/3))))
            const numerator = Math.pow((1 + r), n_quarters) - 1;
            const denominator = 1 - Math.pow((1 + r), -1/3);

            let maturityAmount = 0;
            if (denominator !== 0) { // Avoid division by zero
                maturityAmount = amount * (numerator / denominator);
            }

            const roundedMaturity = Math.round(maturityAmount);

            tableHTML += `
                <tr>
                    <td>${years} Year${years > 1 ? 's' : ''}</td>
                    <td>₹ ${roundedMaturity.toLocaleString('en-IN')}</td>
                </tr>
            `;
        }

        tableHTML += `
                </tbody>
            </table>
        `;
        calculatorResultsDiv.innerHTML = tableHTML;
        investmentAmountInput.classList.remove('invalid-input'); // If validation passes
        return; // Exit function after handling RD
    }

    // --- Existing Amount Validation for other products (Runs ONLY if not an RD product) ---
    // If we reach here, it's not an RD product, so use the existing amount validation logic
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

    investmentAmountInput.classList.remove('invalid-input'); // If validation passes for non-RD

    // --- Existing Calculation Logic for SD, Doubling, NCD (Runs ONLY if not an RD product) ---
    const isDoublingProduct = productName.toLowerCase().includes('doubling');
    const isNCDProduct = productName.toLowerCase().includes('ncd');

    let resultsHTML = '';

    if (companyName === "Vanchinad Finance (P) Ltd" && productName === "Non-Convertible Debentures (NCD)") {
        calculatorResultsDiv.innerHTML = `
            <div class="no-ncd-message">
                <p><strong>Currently no NCD Issue Available for calculation. Kindly Opt SML NCD.</strong></p>
            </div>
        `;
        return;
    }


    if (isDoublingProduct) {
        const maturityAmount = amount * 2;
        resultsHTML += `
            <div class="calculator-result-card">
                <h4>Doubling Scheme Result</h4>
                <p>Investment Amount: <strong>₹ ${amount.toLocaleString('en-IN')}</strong></p>
                <p>Maturity Amount (Approx): <strong>₹ ${maturityAmount.toLocaleString('en-IN')}</strong></p>
                <p>Period: ${detail.period}</p>
                <p>Remarks: ${detail.doublingRemark}</p>
            </div>
        `;
    } else if (isNCDProduct) {
        const monthlyRate = parsePercentage(detail.monthly);
        const yearlyRate = parsePercentage(detail.yearly);

        let monthlyInterestDisplay = '';
        if (monthlyRate !== null) {
            const calculatedMonthlyInterest = amount * monthlyRate / 12;
            monthlyInterestDisplay = `₹ ${calculatedMonthlyInterest.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        } else if (detail.monthly && (detail.monthly.toLowerCase().includes('not available') || detail.monthly.toLowerCase().includes('monthly'))) {
            monthlyInterestDisplay = "Not Available";
        } else {
             monthlyInterestDisplay = "N/A";
        }

        let annualInterestDisplay = '';
        if (yearlyRate !== null) {
            const calculatedAnnualInterest = amount * yearlyRate;
            annualInterestDisplay = `₹ ${calculatedAnnualInterest.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        } else if (detail.yearly && detail.yearly.toLowerCase().includes('not available')) {
             annualInterestDisplay = "Not Available";
        } else {
             annualInterestDisplay = "N/A";
        }


        resultsHTML += `
            <div class="calculator-result-card">
                <h4>NCD Return Calculation</h4>
                <p>Investment Amount: <strong>₹ ${amount.toLocaleString('en-IN')}</strong></p>
                <p>Estimated Monthly Interest: <strong>${monthlyInterestDisplay}</strong></p>
                <p>Estimated Annual Interest: <strong>${annualInterestDisplay}</strong></p>
                <p>Period: ${detail.period}</p>
                <p>Closure Remark: ${detail.closureRemark}</p>
            </div>
            <div class="calculator-result-card">
                <h4>Premature Closure Interest Cut</h4>
                <p>Refer to the table below for potential interest reductions if closed before maturity.</p>
                <table class="closure-table">
                    <thead>
                        <tr>
                            <th>Closure Period</th>
                            <th>Interest Cut / Effective Rate</th> </tr>
                    </thead>
                    <tbody>`;
                if (detail.closureTerms && detail.closureTerms.length > 0) {
                    detail.closureTerms.forEach(term => {
                        resultsHTML += `
                            <tr>
                                <td>${term.period}</td>
                                <td>${term.cut}</td>
                            </tr>
                        `;
                    });
                } else {
                    resultsHTML += `<tr><td colspan="2">No specific closure terms provided.</td></tr>`;
                }
                resultsHTML += `
                    </tbody>
                </table>
            </div>
        `;
    } else { // Handles SD and Sangeeth Nidhi Deposits
        const monthlyRate = parsePercentage(detail.monthly);
        const yearlyRate = parsePercentage(detail.yearly);

        let monthlyInterestDisplay = '';
        if (monthlyRate !== null) {
            const calculatedMonthlyInterest = amount * monthlyRate / 12;
            monthlyInterestDisplay = `₹ ${calculatedMonthlyInterest.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        } else if (detail.monthly && detail.monthly.toLowerCase().includes('not available')) {
            monthlyInterestDisplay = "Not Available";
        } else {
             monthlyInterestDisplay = "N/A";
        }

        let annualInterestDisplay = '';
        if (yearlyRate !== null) {
            const calculatedAnnualInterest = amount * yearlyRate;
            annualInterestDisplay = `₹ ${calculatedAnnualInterest.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        } else if (detail.yearly && detail.yearly.toLowerCase().includes('not available')) {
             annualInterestDisplay = "Not Available";
        } else {
             annualInterestDisplay = "N/A";
        }

        resultsHTML += `
            <div class="calculator-result-card">
                <h4>Estimated Interest Earnings</h4>
                <p>Investment Amount: <strong>₹ ${amount.toLocaleString('en-IN')}</strong></p>
                <p>Estimated Monthly Interest: <strong>${monthlyInterestDisplay}</strong></p>
                <p>Estimated Annual Interest: <strong>${annualInterestDisplay}</strong></p>
                <p>Period: ${detail.period}</p>
                ${detail.generalRemark ? `<p class="general-remark"><strong>Important:</strong> ${detail.generalRemark}</p>` : ''}
            </div>
        `;
    }

    calculatorResultsDiv.innerHTML = resultsHTML;
}

// Event Listeners
companySelect.addEventListener('change', (event) => {
    const selectedCompany = event.target.value;
    populateProductSelect(selectedCompany);
});

productSelect.addEventListener('change', (event) => {
    const selectedProduct = event.target.value;
    const selectedCompany = companySelect.value;
    displayProductOptions(selectedCompany, selectedProduct); // Now calls displayProductOptions
});

// Listener for amount input
investmentAmountInput.addEventListener('input', calculateInvestmentReturns);

// Listener for the "Change Option" button
changeOptionButton.addEventListener('click', () => {
    showAllOptionsView();
});

// Smooth scroll for calculator link (Modified behavior for new UI)
goToCalculatorLink.addEventListener('click', function (e) {
    e.preventDefault();
    // Only scroll if single option view is active, otherwise just selecting product will show it
    if (!singleOptionCalculatorView.classList.contains('hidden')) {
        singleOptionCalculatorView.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    } else {
        // If not in single view, do nothing or show a message to select option first
        alert('Please select a product option first to go to the calculator!');
    }
});


// Initial state
populateCompanySelect();
showAllOptionsView(); // Ensure the selection view is shown initially