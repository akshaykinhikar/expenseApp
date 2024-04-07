import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import ExpenseList from './ExpenseList';
import CONSTANTS from '../constants';
import toast, { Toaster } from 'react-hot-toast';
import ExpenseService from '../services/common-services';


const AddExpenseComponent = () => {

    const [selectedMembers, setSelectedMembers] = useState([]);
    const [membersList, setMembersList] = useState([]);
    const [groupList, setGroupList] = useState([]);
    const [expenseList, setExpenseList] = useState([]);
    const [transactions, setTransactions] = useState([]);

    const notify = (props) => toast(props);

    useEffect(() => {
        let shares = [];
        if (expenseList && expenseList.length > 0) {
            expenseList.map(exp => {
                let splitAmount = exp.amount / exp.members.length;
                exp.members.map(mem => {
                    if (mem !== exp['paidBy']) {
                        let obj = {
                            'owsTo': exp['paidBy'],
                            'amount': splitAmount,
                            'owsBy': mem,
                            'transactionTotalAmt': exp.amount,
                            'transactionOwner': exp['paidBy']
                        }
                        shares.push(obj);
                    }
                })
            });
            setTransactions(shares);
        }
    }, [expenseList])

    useEffect(() => {
        ExpenseService.getExpenses().then((data) => {
            setExpenseList(data);
        })
    }, []);

    useEffect(() => {
        ExpenseService.getMembers().then((data) => {
            console.log(data);
            setMembersList(data);
        })
    }, []);

    useEffect(() => {
        fetch(CONSTANTS.GET_GROUP, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then((res) => {
            return res.json();
        }).then((data) => {
            setGroupList(data);
        })
    }, [])

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm();

    const handleChange = (ev) => {
        setSelectedMembers(ev);
    }


    const onSubmit = (data) => {
        data.members = selectedMembers.map(e => e.value);

        if (data.members && data.members.length > 0) {
            fetch(CONSTANTS.ADD_EXPENSE, {
                method: 'post',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            }).then((res) => {
                return res.json();
            }).then((data) => {
                notify('Expense added: ' + data.expenseName);
                setExpenseList(prev => ([...prev, data]));
                reset({ expenseName: '', amount: '', paidBy: '', addedBy: '', groupId: '' })
            })
        }
    }

    // console.log(watch("example")) // watch input value by passing the name of it

    const deleteTransaction = (id) => {
        fetch(CONSTANTS.DELETE_EXPENSEBYID + `${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then((res) => {
            return res.json();
        }).then((data) => {
            notify('Expense deleted');
            setExpenseList(data.availableRecords);
        })
    }

    return (
        <>
            <Toaster />
            <Container>
                <Row>
                    <Col xs={12} md={6} lg={6}>
                        <h4 className='text-center my-3'>Add Expense</h4>
                        <form onSubmit={handleSubmit(onSubmit)} aria-label='add-expense'>
                            <div>
                                <label htmlFor="expenseName">Expense Name: </label>
                                <input placeholder="Add expense name" className="form-control" name="expenseName" defaultValue="" {...register("expenseName", { required: true })} />
                                {errors.expenseName && <span>This field is required</span>}
                            </div>

                            <div>
                                <label htmlFor="amount">Amount: </label>
                                <input placeholder="Amount" className="form-control" defaultValue="100" {...register("amount", { required: true })} />
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
                                    className="form-control"
                                    name="paidBy"
                                    placeholder="Paid By">
                                    <option key="defValue" value='null' className='disabled'>Select...</option>
                                    {membersList.map(e => {
                                        return (<option key={'___' + e.value} value={e.value}>{e.label}</option>)
                                    })
                                    }
                                </select>
                            </div>
                            <div>
                                <label htmlFor="addedBy">Added By: </label>
                                <select
                                    className="form-control"
                                    name="addedBy"
                                    placeholder="Added By"
                                    {...register("addedBy")}
                                >
                                    <option key="defValue" value='null' className='disabled'>Select...</option>
                                    {membersList.map(e => {
                                        return (<option key={'__' + e.value} value={e.value}>{e.label}</option>)
                                    })
                                    }
                                </select>
                            </div>
                            <div>
                                <label htmlFor="groupId">Group</label>
                                <select {...register("groupId")}
                                    className="form-control"
                                    placeholder="Group"
                                    name="groupId">
                                    <option key="defValue" value='null' className='disabled'>Select...</option>
                                    {groupList.map(e => {
                                        return (<option key={'_' + e.value} value={e.value}>{e.label}</option>)
                                    })
                                    }
                                </select>
                            </div>
                            <input type="submit" aria-label="submit" className='btn btn-primary my-3' />
                        </form>
                    </Col>
                </Row>

                <div>
                    {expenseList && expenseList.length > 0 &&
                        <ExpenseList deleteTransaction={deleteTransaction}
                            membersList={membersList}
                            expenseList={expenseList}
                            transactions={transactions} />}
                </div>

            </Container>

        </>
    )
}

export default AddExpenseComponent
