import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import ExpenseList from './ExpenseList';


const AddExpenseComponent = () => {

    const [selectedMembers, setSelectedMembers] = useState();
    const [expenseList, setExpenseList] = useState([]);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        let shares = [];
        if (expenseList && expenseList.length > 0) {
            expenseList.map(exp => {
                let splitAmount = exp.amount / exp.selectedMembers.length;
                exp.selectedMembers.map(mem => {
                    if (mem !== exp['paidBy']) {
                        let obj = {
                            'owsTo': exp['paidBy'],
                            'amount': splitAmount,
                            'owsBy': mem
                        }
                        shares.push(obj);
                    }
                })
            });
            console.log('shares->', shares);
            setTransactions(shares);
        }
    }, [expenseList])

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const membersList = [
        { value: "1", label: "Ram" },
        { value: "2", label: "Ganesh" },
        { value: "3", label: "Bhagwan" },
        { value: "4", label: "Seeta" }
    ];

    const groupList = [
        { groupName: 'recent', id: 1 }
    ];

    const handleChange = (ev) => {
        setSelectedMembers(ev);
    }


    const onSubmit = (data) => {
        data.selectedMembers = selectedMembers.map(e => e.value);
        setExpenseList(prev => ([...prev, data]));
    }

    console.log(watch("example")) // watch input value by passing the name of it



    return (
        <>
            <Container>
                <Row>
                    <Col xs={12} md={6} lg={6}>
                        <h3 className='text-center my-3'>Add Expense</h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label htmlFor="expenseName">Expense Name: </label>
                                <input className="form-control" name="expenseName" defaultValue="test expense" {...register("expenseName", { required: true })} />
                                {errors.expenseName && <span>This field is required</span>}
                            </div>

                            <div>
                                <label htmlFor="amount">Amount: </label>
                                <input className="form-control" defaultValue="100" {...register("amount", { required: true })} />
                                {errors.amount && <span>This field is required</span>}
                            </div>

                            <div>
                                <label htmlFor="members">Members: </label>
                                <Select
                                    isMulti
                                    name="members"
                                    options={membersList}
                                    onChange={(event) => handleChange(event)}
                                />
                            </div>
                            <div>
                                <label htmlFor="paidBy"> Paid By: </label>
                                <select {...register("paidBy")}
                                    className="form-control" >
                                    {membersList.map(e => {
                                        return (<option key={'___' + e.value} value={e.value}>{e.label}</option>)
                                    })
                                    }
                                </select>
                            </div>
                            <div>
                                <label htmlFor="addedBy">Added By: </label>
                                <select {...register("addedBy")}
                                    className="form-control">
                                    {membersList.map(e => {
                                        return (<option key={'__' + e.value} value={e.value}>{e.label}</option>)
                                    })
                                    }
                                </select>
                            </div>
                            <div>
                                <label htmlFor="groupName">Group</label>
                                <select {...register("groupName")}
                                    className="form-control">
                                    {groupList.map(e => {
                                        return (<option key={'_' + e.value} value={e.id}>{e.groupName}</option>)
                                    })
                                    }
                                </select>
                            </div>
                            <input type="submit" className='btn btn-primary my-3' />
                        </form>
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} md={6} lg={6}>

                    </Col>
                </Row>

                <div>
                    {expenseList && expenseList.length > 0 && <ExpenseList expenseList={expenseList} transactions={transactions} />}
                </div>

            </Container>

        </>
    )
}

export default AddExpenseComponent
