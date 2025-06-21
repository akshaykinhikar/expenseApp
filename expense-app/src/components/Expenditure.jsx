import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import CONSTANTS from "../constants";
import { ExpenditureService } from "../services/common-services";

const AddExpenseComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "Expense",
    dueDate: "",
    paymentMethod: "Online",
    payee: "",
    notes: "",
    currency: "",
    recurring: "Once",
    recurringTill: "",
    income: 0,
    tag: "Loan",
    expenseType: "",
    status: false, // false for Pending, true for Done
    // userId: "",
  });

  const [editingId, setEditingId] = useState(null); // Track the index of the expense being edited

  const handleEdit = (id) => {
    const expenseToEdit = expenses.filter((e) => e._id === id)[0];
    setFormData(expenseToEdit); // Populate the form with the selected expense's data
    setEditingId(id); // Set the index of the expense being edited
  };

  const dummyData = [
    {
      name: "Chai",
      category: "Expense",
      dueDate: "2025-03-29",
      paymentMethod: "Online",
      payee: "akshay",
      notes: "",
      currency: "",
      recurring: "Once",
      tag: "Loan",
      expenseType: "",
      status: true,
      // "userId": "Akshay"
    },
    {
      name: "HomeLoan",
      category: "Expense",
      dueDate: "2025-03-30",
      paymentMethod: "Online",
      payee: "akshay",
      notes: "",
      currency: "",
      recurring: "Monthly",
      tag: "Loan",
      expenseType: "",
      status: false,
      income: 0
      // "userId": "Akshay"
    },
  ];

  const [expenses, setExpenses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchString, setSearchString] = useState("");

  const fetchFutureData = async () => {
    // if(selectedMonth && selectedYear) {
    console.log("********* Expendituredata 2", selectedMonth, selectedYear);
    try {
      const response = await ExpenditureService.getFutureExpenditures({
        page: page,
        size: size,
        year: selectedYear,
        month: selectedMonth,
      });

      // Check if response is already parsed
      const data = response.json ? await response.json() : response;
      setExpenses(data.data);

      console.log("********* Expendituredata 1", data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await ExpenditureService.getExpenditures({
        page: page,
        size: size,
        searchString: "",
      });

      // Check if response is already parsed
      const data = response.json ? await response.json() : response;
      setExpenses(data.data);

      console.log("********* Expendituredata 1", data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    if (selectedMonth && selectedYear) {
      fetchFutureData();
    } else {
      fetchData();
    }
  }, [selectedMonth, selectedYear, page, size]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    console.log("****** handle Submit:: ", formData);
    e.preventDefault();
    // setExpenses([...expenses, formData]);
    // setFormData({
    //   name: "",
    //   category: "Expense",
    //   dueDate: "",
    //   paymentMethod: "",
    //   payee: "",
    //   notes: "",
    //   // currency: "",
    //   recurring: "Daily",
    //   tag: "Loan",
    //   expenseType: "",
    //   status: false,
    //   userId: "",
    // });

    if (editingId) {
      formData._id = editingId;
    }

    formData.income = formData.income ? parseInt(formData.income) : 0;

    fetch(CONSTANTS.ADD_EXPENDITURE, {
      method: "post",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("********* Expendituredata", data);
      });
  };

  // const filteredExpenses =
  //   expenses &&
  //   expenses.filter((expense) => {
  //     console.log("******** expenses", expenses);
  //     if (!selectedMonth || !selectedYear) return true;
  //     const expenseDate = new Date(expense.dueDate);
  //     return (
  //       expenseDate.getMonth() + 1 === parseInt(selectedMonth) &&
  //       expenseDate.getFullYear() === parseInt(selectedYear) &&
  //       expense.status === false
  //     );
  //   });

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="text-center mb-4">Add Expense</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Expense">Expense</option>
                <option value="Savings">Savings</option>
                <option value="Income">Income</option>
                <option value="Non-financial">Non-financial</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Payment Method</Form.Label>
              <Form.Select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
              >
                <option value="Online">Online</option>
                <option value="CreditCard">CreditCard</option>
                <option value="DebitCard">DebitCard</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Payee</Form.Label>
              <Form.Control
                type="text"
                name="payee"
                value={formData.payee}
                onChange={handleChange}
                placeholder="Enter payee"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Enter notes"
              />
            </Form.Group>

            {/* <Form.Group className="mb-3">
              <Form.Label>Currency</Form.Label>
              <Form.Control
                type="text"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                placeholder="Enter currency"
              />
            </Form.Group> */}

            <Form.Group className="mb-3">
              <Form.Label>Recurring</Form.Label>
              <Form.Select
                name="recurring"
                value={formData.recurring}
                onChange={handleChange}
              >
                <option value="Once">Once</option>
                {/* <option value="Daily">Daily</option> */}
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Yearly">Yearly</option>
              </Form.Select>
            </Form.Group>


            <Form.Group className="mb-3">
              <Form.Label>Recurring Till</Form.Label>
              <Form.Control
                type="date"
                name="recurringTill"
                value={formData.recurringTill}
                placeholder="Enter recurring till date"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tag</Form.Label>
              <Form.Select
                name="tag"
                value={formData.tag}
                onChange={handleChange}
              >
                <option value="LOAN-EMI">LOAN EMI</option>
                <option value="EMI">EMI</option>
                <option value="Maintenance">Maintenance</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Check
                type="switch"
                name="status"
                label={formData.status ? "Done" : "Pending"}
                checked={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.checked })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Income</Form.Label>
              <Form.Control
                type="text"
                name="income"
                value={formData.income}
                onChange={handleChange}
                placeholder="Enter income"
              />
            </Form.Group>

            {/* 
            <Form.Group className="mb-3">
              <Form.Label>User</Form.Label>
              <Form.Control
                type="text"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                placeholder="Enter user"
              />
            </Form.Group> */}

            <Button variant="primary" type="submit" className="w-100">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <h3 className="text-center">Expense List</h3>
          <Row className="mb-4">
            <Col md={6}>
              <Form.Select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                <option value="">Select Month</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(0, i).toLocaleString("default", {
                      month: "long",
                    })}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md={6}>
              <Form.Select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="">Select Year</option>
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i} value={2020 + i}>
                    {2020 + i}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
          {expenses.length > 0 ? (
            <Row>
              {expenses.map((expense, index) => (
                <Col
                  onClick={() => handleEdit(expense._id)}
                  md={4}
                  className="mb-4"
                  key={index}
                >
                  <Card
                    className={`h-100 shadow-sm ${
                      expense.status ? "border-green" : "border-red"
                    }`}
                  >
                    <Card.Body>
                      <Card.Title>{expense.name}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        Category: {expense.category}
                      </Card.Subtitle>
                      <Card.Text>
                        <strong>Due Date:</strong> {expense.dueDate}
                        <br />
                        <strong>Tag:</strong> {expense.tag}
                        <br />
                        <strong>Status:</strong>{" "}
                        {expense.status ? "Done" : "Pending"}
                        {/* <br />
                        <strong>User:</strong> {expense.userId} */}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p className="text-center">
              No expenses found for the selected period.
            </p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AddExpenseComponent;
