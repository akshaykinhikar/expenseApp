import React, { Component } from 'react'
import {
    FormBuilder,
    FieldGroup,
    FieldControl,
    Validators,
    FormGroup,
} from "react-reactive-form";
import Select from 'react-select'

class AddExpense extends Component {

    addExpForm = FormBuilder.group({
        expenseName: ['', Validators.required],
        amount: ['', Validators.required],
        members: ['', Validators.required],
        paidBy: ['', Validators.required],
        addedBy: ['', Validators.required],
        groupName: ['', Validators.required]
    });

    membersList = [
        { value: "mem1", label: "member 1" },
        { value: "mem2", label: "member 2" },
        { value: "mem3", label: "member 3" },
        { value: "mem4", label: "member 4" }
    ];

    handleReset = () => {
        this.addExpForm.reset();
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form values", this.addExpForm.value);
    }

    handleMemberUpdate = (e) => {
        console.log('updated Member')
    }

    handlePaidBy = (e) => {
        console.log('Handle Paid By')

    }

    render() {
        return (
            <div>
                <p>Hi</p>

                <FieldGroup
                    control={this.addExpForm}
                    render={({ get, invalid }) => (
                        <form onSubmit={this.handleSubmit}>
                            <label>Expense</label>
                            <FieldControl
                                name="expenseName"
                                render={({ handler, touched, hasError }) => (
                                    <div>
                                        <input {...handler()} />
                                        <span>
                                            {touched
                                                && hasError("required")
                                                && "Expense name is required"}
                                        </span>
                                    </div>
                                )}
                            />
                            <label>Amount</label>
                            <FieldControl
                                name="amount"
                                render={({ handler, touched, hasError }) => (
                                    <div>
                                        <input {...handler()} />
                                        <span>
                                            {touched
                                                && hasError("required")
                                                && "Amount is required"}
                                        </span>
                                    </div>
                                )}
                            />
                            <label>Members</label>
                            <FieldControl
                                name="members"
                                render={({ handler, touched, hasError }) => (
                                    <div>
                                        {/* <input {...handler()} /> */}
                                        <Select
                                            options={this.membersList}
                                            isMulti
                                            onChange={this.handleMemberUpdate()}

                                        />
                                        <span>
                                            {touched
                                                && hasError("required")
                                                && "members are required"}
                                        </span>
                                    </div>
                                )}
                            />
                            <label>Paid By</label>
                            <FieldControl
                                name="paidBy"
                                render={({ handler, touched, hasError }) => (
                                    <div>
                                        <Select
                                            options={this.membersList}
                                            onChange={this.handlePaidBy()}

                                        />
                                        <span>
                                            {touched
                                                && hasError("required")
                                                && "paidBy is required"}
                                        </span>
                                    </div>
                                )}
                            />
                            <label>addedBy</label>
                            <FieldControl
                                name="addedBy"
                                render={({ handler, touched, hasError }) => (
                                    <div>
                                        <Select
                                            options={this.membersList}
                                            onChange={handler()}

                                        />
                                        <span>
                                            {touched
                                                && hasError("required")
                                                && "addedBy is required"}
                                        </span>
                                    </div>
                                )}
                            />

                            <label>groupName</label>
                            <FieldControl
                                name="groupName"
                                render={({ handler, touched, hasError }) => (
                                    <div>
                                        <input {...handler()} />
                                        <span>
                                            {touched
                                                && hasError("required")
                                                && "groupName is required"}
                                        </span>
                                    </div>
                                )}
                            />

                            <button type="button" onClick={this.handleReset} > Reset </button>
                            {/* <button type="submit" disabled={invalid} > Submit </button> */}
                            <button type="submit" > Submit </button>
                            <p>{invalid}</p>


                        </form>
                    )}
                />


            </div>
        )

    }
}

export default AddExpense
