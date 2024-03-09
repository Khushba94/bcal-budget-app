# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Simple Budget App
A simple CRUD app using React where you can keep track of your budgets and expenses. 
- Add Budget (let the user add budget description, the amount allocated for that budget )
- Add Expense (let the user add expense description, amount to be spend for the expense, and can select which budget category to add the expense in. If there is no budget added, the expense is automatically added to 'Uncategorized' catefory)
- View Expense (let the user view the added expenses in doughnout chart form, and also remove the expense that is not required anymore)
- Delete (let the user delete the budget that is not required anymore)
- Total card (let the user view the total budget)
- Uncategorized (the expenses that are not required is moved to this category so that the user can check later which items were removed)
- ProgressBar(blue-good to go, yellow-warning, red-need to watch out on spending limit) in each section let the user know if they have exceeded the specified amount 
