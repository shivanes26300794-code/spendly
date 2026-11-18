"use strict";
/* =========================================================================
   Spendly — a mini expense tracker (starter)
   Fill in every TODO. Your code must compile with `npm run build`
   (tsc, strict mode) with ZERO type errors. Do NOT use `any` to dodge types.
   See TODO.md for the task list and marks.
   ========================================================================= */
/* -------------------------------------------------------------------------
   TASK 1 — Enum (LU: Enums & Tuples)
   TODO: Define a string enum `Category` with: Food, Travel, Bills, Other.
   ------------------------------------------------------------------------- */
var Category;
(function (Category) {
    Category["Food"] = "Food";
    Category["Travel"] = "Travel";
    Category["Bills"] = "Bills";
    Category["Other"] = "Other";
})(Category || (Category = {}));
/* In-memory store (already typed once you define Expense above). */
// const expenses: Expense[] = [];
let nextId = 1;
/* -------------------------------------------------------------------------
   TASK 5 — Type guard / narrowing (LU: Type Guards & Narrowing)
   TODO: Write `toNewExpense` that takes the RAW form strings and either
         returns a valid `NewExpense` or `null`.
         Use typeof / Number checks and verify the category is a real enum
         value. Reject: empty title, non-positive or non-numeric amount,
         invalid category. No `any`.
   ------------------------------------------------------------------------- */
function isCategory(val) {
    return Object.values(Category).includes(val);
}
function toNewExpense(rawTitle, rawAmount, rawCategory) {
    const title = rawTitle.trim();
    const amount = Number(rawAmount);
    if (typeof title !== "string" ||
        title.length === 0 ||
        typeof amount !== "number" ||
        Number.isNaN(amount) ||
        !Number.isFinite(amount) ||
        amount <= 0 ||
        !isCategory(rawCategory)) {
        return null;
    }
    return { title, amount, category: rawCategory };
}
/* -------------------------------------------------------------------------
   TASK 6 — Core logic
   TODO: total()      -> sum of all expense amounts (number)
         breakdown()  -> SummaryRow[] : one [category, total] row per Category
   ------------------------------------------------------------------------- */
function total(items) {
    return items.reduce((sum, item) => sum + item.amount, 0);
}
function breakdown(items) {
    const totals = {
        [Category.Food]: 0,
        [Category.Travel]: 0,
        [Category.Bills]: 0,
        [Category.Other]: 0,
    };
    for (const item of items) {
        totals[item.category] + ;
        item.amount;
    }
    return Object.keys(totals).map((cat) => [cat, totals[cat]]);
}
/* -------------------------------------------------------------------------
   TASK 7 — DOM wiring + render (LU: TypeTasks UI, Build & Ship)
   TODO:
     - Grab the form + inputs with getElementById and cast to the right
       HTMLElement types (e.g. `as HTMLInputElement`).
     - On submit: preventDefault, call toNewExpense, show an error message
       if invalid, else push a full Expense (add the id) and re-render.
     - render(): paint the #list, #total, and #breakdown from the data.
   ------------------------------------------------------------------------- */
const form = document.getElementById("expense-form");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const categorySelect = document.getElementById("category");
const errorEl = document.getElementById("error");
const listEl = document.getElementById("expense-list");
const totalEl = document.getElementById("total");
const breakdownEl = document.getElementById("breakdown");
function render() {
    listEl.innerHTML = "";
    for (const exp of expenses) {
        const li = document.createElement("li");
        li.textContent = '${exp.title} - ₹${exp.amount.toFixed(2)}. (${exp.category}0';
        listEl.appendChild(li);
    }
    totalEl.textContent = total(expenses).toFixed(2);
}
;
breakdownEl.innerHTML = "";
const rows = breakdown(expenses);
for (const [category, catTotal] of rows) {
    const li = document.createElement("li");
    li.textContent = '${category}: ₹${catTotal.toFixed(2)}';
    breakdownEl.appendChild(li);
}
form.addEventListener("submit"), (event) => {
    event.preventDefault();
    const validExpense = toNewExpense(titleInput.value, amountInput.value, categorySelect.value);
    if (!validExpense) {
        errorEl.textContent =
            "Please enter a valid title, a positive amount, and a valid category.";
        return;
    }
    errorEl.textContent = ";;
    expenses.push({
        id: nextId++,
        ...validExpense,
    });
    form.reset();
    render();
};
// ... wire up the submit handler and render() here ...
/* Call render() once on load so the UI reflects the (empty) state. */
render();
