// =====================================================================
// JavaScript Function Practice: Scenario Based Questions
// Arrow functions + callbacks. Run with: node javascript_function_practice.js
// =====================================================================

const heading = (text) => console.log(`\n===== ${text} =====`);

// ---------------------------------------------------------------------
// Question 1: Smart Electricity Bill Calculator
// calculateBill computes; displayBill only displays (callback does the work)
// ---------------------------------------------------------------------
const SERVICE_FEE = 50;

const calculateBill = (units) => {
  let energyCharge = 0;
  if (units <= 20) {
    energyCharge = units * 5;
  } else if (units <= 50) {
    energyCharge = 20 * 5 + (units - 20) * 7;
  } else {
    energyCharge = 20 * 5 + 30 * 7 + (units - 50) * 10;
  }
  return energyCharge + SERVICE_FEE;
};

const displayBill = (name, units, callback) => {
  const bill = callback(units);
  console.log(`Customer: ${name}`);
  console.log(`Units Consumed: ${units}`);
  console.log(`Total Electricity Bill: Rs. ${bill}`);
};

heading("Q1: Electricity Bill");
displayBill("Ram", 65, calculateBill);

// ---------------------------------------------------------------------
// Question 2: Student Result Processing System
// The callback calculates the average; getDivision is a separate step.
// ---------------------------------------------------------------------
const calculateAverage = (m1, m2, m3) => (m1 + m2 + m3) / 3;

const getDivision = (average) => {
  if (average >= 70) return "First Division";
  if (average >= 60) return "Second Division";
  if (average >= 50) return "Third Division";
  return "Fail";
};

const processResult = (name, m1, m2, m3, callback) => {
  const average = callback(m1, m2, m3);
  const division = getDivision(average);
  console.log(`Student: ${name}`);
  console.log(`Average: ${Number(average.toFixed(2))}`);
  console.log(`Division: ${division}`);
};

heading("Q2: Student Result");
processResult("Sita", 80, 70, 75, calculateAverage);

// ---------------------------------------------------------------------
// Question 3: Online Shopping Discount System
// ---------------------------------------------------------------------
const calculateDiscount = (amount) => {
  if (amount >= 5000) return 20;
  if (amount >= 3000) return 15;
  if (amount >= 1000) return 10;
  return 0;
};

const calculateFinalPrice = (amount, discount) =>
  amount - (amount * discount) / 100;

const checkout = (customerName, amount, callback) => {
  const discount = calculateDiscount(amount);
  const finalPrice = callback(amount, discount); // callback = calculateFinalPrice
  console.log(`Customer: ${customerName}`);
  console.log(`Original Price: Rs. ${amount}`);
  console.log(`Discount: ${discount}%`);
  console.log(`Final Price: Rs. ${finalPrice}`);
};

heading("Q3: Shopping Discount");
checkout("Nikesh", 6000, calculateFinalPrice);

// ---------------------------------------------------------------------
// Question 4: Movie Ticket Booking System
// Discount is applied AFTER the total is calculated.
// ---------------------------------------------------------------------
const getTicketPrice = (age) => {
  if (age < 12) return 150;
  if (age <= 17) return 200;
  if (age <= 59) return 300;
  return 200; // 60 and above
};

const calculateTotal = (price, quantity) => price * quantity;

// returns the discount AMOUNT (10% when 5 or more tickets)
const applyDiscount = (total, quantity) => (quantity >= 5 ? total * 0.1 : 0);

const bookTicket = (name, age, quantity, callback) => {
  const price = getTicketPrice(age);
  const total = callback(price, quantity); // callback = calculateTotal
  const discount = applyDiscount(total, quantity);
  const finalAmount = total - discount;
  console.log(`Customer: ${name}`);
  console.log(`Age: ${age}`);
  console.log(`Tickets: ${quantity}`);
  console.log(`Total Before Discount: Rs. ${total}`);
  console.log(`Discount: Rs. ${discount}`);
  console.log(`Final Amount: Rs. ${finalAmount}`);
};

heading("Q4: Movie Tickets");
bookTicket("Hari", 25, 5, calculateTotal);

// ---------------------------------------------------------------------
// Question 5: Employee Salary Processing System (two callbacks)
// ---------------------------------------------------------------------
const calculateBonus = (salary) =>
  salary >= 40000 ? salary * 0.1 : salary * 0.05;

const calculateTax = (salary) => salary * 0.05;

const calculateNetSalary = (salary, bonusCallback, taxCallback) =>
  salary + bonusCallback(salary) - taxCallback(salary);

const generatePayslip = (name, salary, callback) => {
  const bonus = calculateBonus(salary);
  const tax = calculateTax(salary);
  const net = callback(salary, calculateBonus, calculateTax);
  console.log(`Employee: ${name}`);
  console.log(`Basic Salary: Rs. ${salary}`);
  console.log(`Bonus: Rs. ${bonus}`);
  console.log(`Tax: Rs. ${tax}`);
  console.log(`Net Salary: Rs. ${net}`);
};

heading("Q5: Salary Payslip");
generatePayslip("Ram", 50000, calculateNetSalary);

// ---------------------------------------------------------------------
// Question 6: Food Delivery Charge Calculator
// If delivery is free, the delivery calculation is skipped entirely.
// ---------------------------------------------------------------------
const calculateDelivery = (distance) =>
  distance <= 2 ? 30 : 30 + (distance - 2) * 15;

const checkFreeDelivery = (orderAmount) => orderAmount >= 1000;

const processOrder = (customer, distance, orderAmount, callback) => {
  const charge = checkFreeDelivery(orderAmount) ? 0 : callback(distance);
  console.log(`Customer: ${customer}`);
  console.log(`Order Amount: Rs. ${orderAmount}`);
  console.log(`Distance: ${distance} km`);
  console.log(
    `Delivery Charge: ${charge === 0 ? "Free" : "Rs. " + charge}`
  );
};

heading("Q6: Food Delivery");
processOrder("Shyam", 5, 800, calculateDelivery);
processOrder("Gita", 8, 1200, calculateDelivery); // free delivery case

// ---------------------------------------------------------------------
// Question 7: ATM Withdrawal System
// validateWithdrawal returns { valid, message } so the caller knows WHY
// it failed. Balance is only changed on success.
// ---------------------------------------------------------------------
const WITHDRAWAL_FEE = 25;

const validateWithdrawal = (amount, balance) => {
  if (amount <= 0) {
    return { valid: false, message: "Amount must be greater than zero." };
  }
  if (amount % 500 !== 0) {
    return { valid: false, message: "Amount must be a multiple of 500." };
  }
  if (amount + WITHDRAWAL_FEE > balance) {
    return { valid: false, message: "Insufficient balance." };
  }
  return { valid: true, message: "Withdrawal Successful!" };
};

const withdrawMoney = (amount, balance, callback) => {
  console.log(`Account Balance: Rs. ${balance}`);
  console.log(`Withdrawal Amount: Rs. ${amount}`);

  const result = callback(amount, balance);
  let newBalance = balance; // unchanged unless valid

  if (result.valid) {
    newBalance = balance - amount - WITHDRAWAL_FEE;
    console.log(result.message);
    console.log(`Transaction Fee: Rs. ${WITHDRAWAL_FEE}`);
  } else {
    console.log(`Transaction Failed: ${result.message}`);
  }

  console.log(`Remaining Balance: Rs. ${newBalance}`);
  return newBalance;
};

heading("Q7: ATM Withdrawal");
withdrawMoney(3000, 10000, validateWithdrawal);
console.log("--- invalid attempts ---");
withdrawMoney(3250, 10000, validateWithdrawal); // not multiple of 500
withdrawMoney(20000, 10000, validateWithdrawal); // insufficient

// ---------------------------------------------------------------------
// Question 8: Restaurant Order Management System
// ---------------------------------------------------------------------
const menu = { burger: 250, pizza: 500, momo: 150, chowmein: 180 };

// returns undefined for an invalid item
const getFoodPrice = (foodName) => menu[foodName.toLowerCase()];

const calculateServiceCharge = (total) => total * 0.05;

const calculateOrder = (foodName, quantity, callback) => {
  const price = callback(foodName); // callback = getFoodPrice
  if (price === undefined) return null; // invalid item
  return price * quantity;
};

const generateReceipt = (customerName, foodName, quantity, callback) => {
  const foodAmount = callback(foodName, quantity, getFoodPrice);
  if (foodAmount === null) {
    console.log(`Sorry ${customerName}, "${foodName}" is not on the menu.`);
    return;
  }
  const serviceCharge = calculateServiceCharge(foodAmount);
  const finalAmount = foodAmount + serviceCharge;
  console.log(`Customer: ${customerName}`);
  console.log(`Food: ${foodName}`);
  console.log(`Quantity: ${quantity}`);
  console.log(`Food Amount: Rs. ${foodAmount}`);
  console.log(`Service Charge: Rs. ${serviceCharge}`);
  console.log(`Final Amount: Rs. ${finalAmount}`);
};

heading("Q8: Restaurant Receipt");
generateReceipt("Suman", "Burger", 2, calculateOrder);
generateReceipt("Suman", "Sushi", 1, calculateOrder); // invalid item

// ---------------------------------------------------------------------
// Question 9: Mobile Recharge System
// calculateBonus returns an actual MONEY amount (not a percentage), which
// makes calculateTotalBalance a simple addition.
// ---------------------------------------------------------------------
const calculateBonusAmount = (amount) => {
  if (amount >= 1000) return amount * 0.15;
  if (amount >= 500) return amount * 0.1;
  if (amount >= 100) return amount * 0.05;
  return 0;
};

const calculateTotalBalance = (amount, bonus) => amount + bonus;

const recharge = (number, amount, callback) => {
  const bonus = calculateBonusAmount(amount);
  const total = callback(amount, bonus); // callback = calculateTotalBalance
  console.log(`Mobile Number: ${number}`);
  console.log(`Recharge Amount: Rs. ${amount}`);
  console.log(`Bonus Received: Rs. ${bonus}`);
  console.log(`Total Balance: Rs. ${total}`);
};

heading("Q9: Mobile Recharge");
recharge("9800000000", 1000, calculateTotalBalance);

// ---------------------------------------------------------------------
// Question 10: Smart Function Based Calculator
// calculate() receives a FUNCTION, so adding a new operation (e.g. power)
// needs no change to calculate() itself (open/closed principle).
// ---------------------------------------------------------------------
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (b === 0 ? "Error: Division by zero" : a / b);

const calculate = (a, b, operationCallback) => operationCallback(a, b);

heading("Q10: Calculator");
console.log(`Addition: 20 + 10 = ${calculate(20, 10, add)}`);
console.log(`Subtraction: 20 - 10 = ${calculate(20, 10, subtract)}`);
console.log(`Multiplication: 20 * 10 = ${calculate(20, 10, multiply)}`);
console.log(`Division: 20 / 10 = ${calculate(20, 10, divide)}`);
console.log(`Division: 20 / 0 = ${calculate(20, 0, divide)}`);
