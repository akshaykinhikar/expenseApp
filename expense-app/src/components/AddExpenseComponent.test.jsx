import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddExpenseComponent from './AddExpenseComponent';
import userEvent from '@testing-library/user-event';
import React from 'react';
import '@testing-library/jest-dom';
import ExpenseService from '../services/common-services';
import { useForm } from 'react-hook-form';

// Helper function to render the component
const mockHandleSubmit = jest.fn();
const renderComponent = () => {
    return render(<AddExpenseComponent />);
};

const mockGetExpenses = [
    {
        "members": [
            "65c6f8fab98a70ca79c99509",
            "65dc82418a3e3320175e07bb"
        ],
        "_id": "65e02a87cbc91d6d83ebf97e",
        "expenseName": "lorem",
        "amount": 100,
        "paidBy": "65c6f8fab98a70ca79c99509",
        "addedBy": "65c6f8fab98a70ca79c99509",
        "groupId": "65c6f91cb98a70ca79c99511",
        "__v": 0
    }
];

const mockMembers = [
    {
        "_id": "65c6f8fab98a70ca79c99509",
        "label": "Akshay",
        "value": "65c6f8fab98a70ca79c99509"
    }
];

describe('Expense', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // it('Spy on use Effect', () => {
    //     jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
    //     jest.spyOn(ExpenseService, 'getExpenses')
    //     renderComponent();
    //     expect(ExpenseService.getExpenses).toHaveBeenCalledTimes(1);
    // expect(ExpenseService.getExpenses).toHaveBeenCalledWith('');
    // });

    it('Spy on use Effect with Data', async () => {
        const setExpenseList = jest.fn();
        const expenseList = (useState) => [useState, setExpenseList];
        jest.spyOn(React, 'useState').mockImplementation(expenseList);

        jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
        // jest.mock('../services/common-services', () => {
        //     return { getExpenses: jest.fn(() => { return mockGetExpenses }) }
        // });
        // jest.spyOn(ExpenseService, 'getExpenses');

        const mockFetchData = jest.spyOn(ExpenseService, 'getExpenses')
            .mockImplementation(async () => {
                return mockGetExpenses;
            })

        renderComponent();

        expect(ExpenseService.getExpenses).toHaveBeenCalled();
        await waitFor(() => {
            expect(screen.getByText(/lorem/i)).toBeInTheDocument();
        })

    });


});


/*
test('AddExpenseComponent mounted', () => {
    renderComponent();
    const ele = screen.getByText(/Add Expense/i);
    expect(ele).toBeInTheDocument();
})

test('form should submit', async () => {

    renderComponent();
    screen.getByRole("form", { name: "add-expense" }).onsubmit =
        mockHandleSubmit;

    // Submit the empty form
    fireEvent.click(screen.getByRole("button", { name: "submit" }));

    // Expectations for form submission
    expect(mockHandleSubmit).toHaveBeenCalled();

});

test("submits the form only with valid data", () => {

    renderComponent();
    screen.getByRole("form", { name: "add-expense" }).onsubmit =
        mockHandleSubmit;

    // Fill in the form fields with valid data
    fireEvent.change(screen.getByPlaceholderText("Add expense name"), {
        target: { value: "Chai" },
    });
    fireEvent.change(screen.getByPlaceholderText("Amount"), {
        target: { value: "100" },
    });
    fireEvent.change(screen.getByPlaceholderText("Paid By"), {
        target: { value: "lorem" },
    });
    fireEvent.change(screen.getByPlaceholderText("Added By"), {
        target: { value: "lorem" },
    });
    fireEvent.change(screen.getByPlaceholderText("Group"), {
        target: { value: "ValidPassword1!" },
    });

    // Submit the empty form
    fireEvent.click(screen.getByRole("button", { name: "submit" }));

    // Expectations for form submission
    expect(mockHandleSubmit).toHaveBeenCalled();
});
*/
// https://stackoverflow.com/questions/66110028/how-to-test-button-that-call-submit-form-using-jest-and-react-testing-library/77035248#77035248
// https://www.freecodecamp.org/news/how-to-write-unit-tests-in-react/
