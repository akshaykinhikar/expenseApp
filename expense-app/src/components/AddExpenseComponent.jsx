import React, { useEffect, useState } from 'react'
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
        { value: "1", label: "member 1" },
        { value: "2", label: "member 2" },
        { value: "3", label: "member 3" },
        { value: "4", label: "member 4" }
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
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div>
                    <label htmlFor="expenseName">Expense Name: </label>
                    <input name="expenseName" defaultValue="test expense" {...register("expenseName", { required: true })} />
                    {errors.expenseName && <span>This field is required</span>}
                </div>

                <div>
                    <label htmlFor="amount">Amount: </label>
                    <input defaultValue="100" {...register("amount", { required: true })} />
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
                    <select {...register("paidBy")}>
                        {membersList.map(e => {
                            return (<option key={'___' + e.value} value={e.value}>{e.label}</option>)
                        })
                        }
                    </select>
                </div>
                <div>
                    <label htmlFor="addedBy">Added By: </label>
                    <select {...register("addedBy")}>
                        {membersList.map(e => {
                            return (<option key={'__' + e.value} value={e.value}>{e.label}</option>)
                        })
                        }
                    </select>
                </div>
                <div>
                    <label htmlFor="groupName">Group</label>
                    <select {...register("groupName")}>
                        {groupList.map(e => {
                            return (<option key={'_' + e.value} value={e.id}>{e.groupName}</option>)
                        })
                        }
                    </select>
                </div>
                <input type="submit" />
            </form>
            <div>
                {expenseList && expenseList.length > 0 && <ExpenseList expenseList={expenseList} transactions={transactions} />}
            </div>

        </div>


    )
}

export default AddExpenseComponent
