//react
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { Container, Stack } from "react-bootstrap";
import { useState } from "react";
// navbar
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
// components
import BudgetCard from "./components/BudgetCard.jsx";
import AddBudgetModal from "./components/AddBudgetModal.jsx";
import AddExpenseModal from "./components/AddExpenseModal.jsx";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard.jsx";
import TotalBudgetCard from "./components/TotalBudgetCard.jsx";
import ViewExpensesModal from "./components/ViewExpensesModal.jsx";
// context
import useBudgets, {
  UNCATEGORIZED_BUDGET_ID,
} from "./contexts/BudgetsContext.jsx";
// background img
import background from "./images/pie-chart.png";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const { budgets, getBudgetExpenses } = useBudgets();

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }
  return (
    <>
        <Navbar expand="lg" className="bg-body-tertiary px-4 justify-content-between">
          <div>
            <Navbar.Brand className="" href="#home"><img className="pe-2" src={background} alt="logo" /><b>BCal</b></Navbar.Brand>
          </div>
          <div>
          <Stack direction="horizontal" gap="2" className="my-1">
            <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
              Add Budget
            </Button>
            <Button variant="outline-primary" onClick={openAddExpenseModal}>
              Add Expense
            </Button>
          </Stack>
          </div>
        </Navbar>
        <Container className="my-4">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1rem",
              alignItems: "flex-start",
            }}
          >
            {budgets.map((budget) => {
              const amount = getBudgetExpenses(budget.id).reduce(
                (total, expense) => total + expense.amount,
                0
              );
              return (
                <BudgetCard
                  key={budget.id}
                  name={budget.name}
                  amount={amount}
                  max={budget.max}
                  onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                  onViewExpensesClick={() =>
                    setViewExpensesModalBudgetId(budget.id)
                  }
                />
              );
            })}
            <UncategorizedBudgetCard
              onAddExpenseClick={openAddExpenseModal}
              onViewExpensesClick={() =>
                setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)
              }
            />
            <TotalBudgetCard />
          </div>
        </Container>

        <AddBudgetModal
          show={showAddBudgetModal}
          handleClose={() => setShowAddBudgetModal(false)}
        />
        <AddExpenseModal
          show={showAddExpenseModal}
          defaultBudgetId={addExpenseModalBudgetId}
          handleClose={() => setShowAddExpenseModal(false)}
        />
        <ViewExpensesModal
          budgetId={viewExpensesModalBudgetId}
          handleClose={() => setViewExpensesModalBudgetId()}
        />
    </>
  );
}

export default App;
