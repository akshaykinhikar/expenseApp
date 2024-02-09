import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import ExpenseList from './ExpenseList';
import CONSTANTS from '../constants';


const AddExpenseComponent = () => {

    const [selectedMembers, setSelectedMembers] = useState();
    const [membersList, setMembersList] = useState([]);
    const [groupList, setGroupList] = useState([]);
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

    useEffect(() => {
        fetch(CONSTANTS.GET_MEMBERS, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then((res) => {
            return res.json();
        }).then((data) => {
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
            console.log('groupList')
            console.log(data);
            setGroupList(data);
        })
    }, [])

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const handleChange = (ev) => {
        setSelectedMembers(ev);
    }


    const onSubmit = (data) => {
        data.selectedMembers = selectedMembers.map(e => e.value);
        setExpenseList(prev => ([...prev, data]));
        setExpenseList(prev => ([...prev, data]));

        fetch(CONSTANTS.ADD_EXPENSE, {
            method: 'post',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then((res) => {
            return res.json();
        }).then((data) => {
            console.log('Expense added');
            console.log(data);
        })
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
                                    className="form-control"
                                    name="paidBy" >
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
                                    {...register("addedBy")}
                                >
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
                                    name="groupId">
                                    {groupList.map(e => {
                                        return (<option key={'_' + e.value} value={e.value}>{e.label}</option>)
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
