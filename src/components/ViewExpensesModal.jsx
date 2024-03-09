import { Button, Modal, Stack } from "react-bootstrap";
import useBudgets, {
  UNCATEGORIZED_BUDGET_ID,
} from "../contexts/BudgetsContext";
import { currencyFormater } from "../utils";
import {Chart as ChartJS} from "chart.js/auto"
import {Doughnut} from "react-chartjs-2";

function ViewExpensesModal({ budgetId, handleClose }) {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } =
    useBudgets();

  const expenses = getBudgetExpenses(budgetId);
  const budget =
    UNCATEGORIZED_BUDGET_ID === budgetId
      ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find((b) => b.id === budgetId);
  var coloR = [];
  var ict_unit = [];
  var efficiency = [];
  var dynamicColors = function() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
 };
 for (var i in expenses) {
    ict_unit.push("ICT Unit " + expenses[i].ict_unit);
    efficiency.push(expenses[i].efficiency);
    coloR.push(dynamicColors());
 }
  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
            <div>Expenses - {budget?.name}</div>
            {budgetId !== UNCATEGORIZED_BUDGET_ID && (
              <Button
                onClick={() => {
                  deleteBudget(budget);
                  handleClose();
                }}
                variant="outline-danger"
              >
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="3">
          {expenses.map((expense) => (
            <Stack direction="horizontal" gap="2" key={expense.id}>
              <div className="me-auto fs-4">{expense.description}</div>
              <div className="fs-5">
                {currencyFormater.format(expense.amount)}
              </div>
              \
              <Button
                onClick={() => deleteExpense(expense)}
                size="sm"
                variant="outline-danger"
              >
                &times;
              </Button>
            </Stack>
          ))}
        </Stack>
        <div className="dataCard categoryCard">
          <Doughnut
            data={{
              labels: expenses.map((expense) => expense.description),
              datasets: [
                {
                  label:"Count",
                  data: expenses.map((expense) => expense.amount),
                  backgroundColor:coloR,
                  borderColor: coloR,
                },
              ],
            }}
            options={{ maintainAspectRatio: false }}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ViewExpensesModal;
