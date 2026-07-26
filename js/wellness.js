// Select the budget calculator inputs, button, and result display.
const monthlyIncomeInput = document.querySelector('#monthly-income');
const foodExpensesInput = document.querySelector('#food-expenses');
const transportExpensesInput = document.querySelector('#transport-expenses');
const studyMaterialsExpensesInput = document.querySelector('#study-materials-expenses');
const calculateButton = document.querySelector('.budget-button');
const budgetResult = document.querySelector('#budget-result');

function getNumericValue(inputElement) {
  return Number(inputElement.value) || 0;
}

// Calculate the remaining balance when the button is clicked.
calculateButton.addEventListener('click', () => {
  const income = getNumericValue(monthlyIncomeInput);
  const foodExpenses = getNumericValue(foodExpensesInput);
  const transportExpenses = getNumericValue(transportExpensesInput);
  const studyMaterialsExpenses = getNumericValue(studyMaterialsExpensesInput);

  const totalExpenses = foodExpenses + transportExpenses + studyMaterialsExpenses;
  const remainingBalance = income - totalExpenses;

  budgetResult.textContent = `Remaining Balance: Rs. ${remainingBalance}`;

  // Highlight negative balances so they stand out clearly.
  if (remainingBalance < 0) {
    budgetResult.classList.add('negative-balance');
    budgetResult.style.color = 'var(--danger-color)';
  } else {
    budgetResult.classList.remove('negative-balance');
    budgetResult.style.color = 'var(--text-color)';
  }
});
