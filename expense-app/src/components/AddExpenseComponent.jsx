import React, { useCallback, useEffect, useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import ExpenseList from './ExpenseList';
import CONSTANTS from '../constants';
import toast, { Toaster } from 'react-hot-toast';
import ExpenseService from '../services/common-services';
import LoadingSpinner from './LoadingSpinner';

const AddExpenseComponent = ({ transaction, closeModal, recordUpdated, setRecordUpdated }) => {

    const [selectedMembers, setSelectedMembers] = useState([]);
    const [membersList, setMembersList] = useState([]);
    const [groupList, setGroupList] = useState([]);
    const [expenseList, setExpenseList] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [editTransaction, setEditTransaction] = useState({});
    const [expenseSummary, setExpenseSummary] = useState({});

    const [show, setShow] = useState(false);
    const [membersAvailable, setMembersAvailable] = useState(false);
    const formRef = useRef();
    const notify = (props) => toast(props);
    const [recordEdited, setRecordEdited] = useState(0);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [pageCount, setPageCount] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchString, setSearchString] = useState('');

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
    }, [expenseList, recordUpdated]);


    useEffect(() => {
        if (membersList.length > 0) {
            setMembersAvailable(true)
        } else {
            setMembersAvailable(false)
        }
    }, [membersList])


    useEffect(() => {
        console.log('calling effect expenseList')
        setIsLoading(true);
        Promise.all([
            ExpenseService.getExpenses({ page: page, size: size, searchString: '' }),
            ExpenseService.getMembers(),
            ExpenseService.getExpenseSummary({}),
        ]).then(res => {
            setExpenseList(res[0].data);
            setPage(res[0].page);
            setPageCount(res[0].pageCount);
            setTotalPages(res[0].totalPages)
            setMembersList(res[1]);
            setExpenseSummary(res[2])
            setIsLoading(false);
        }).catch(err => {
            setIsLoading(false);
        })
    }, [recordEdited, page]);

    useEffect(() => {
        if (transaction?._id) {
            reset({
                expenseName: transaction?.expenseName,
                amount: transaction?.amount,
                paidBy: transaction?.paidBy,
                addedBy: transaction?.addedBy,
                groupId: transaction?.groupId
            });
            const memList = getMembersObj(transaction.members);
            handleChange(memList);
        }
    }, [transaction?._id, membersList]);

    useEffect(() => {
        setIsLoading(true);
        fetch(CONSTANTS.GET_GROUP, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then((res) => {
            setIsLoading(false);
            return res.json();
        }).then((data) => {
            setGroupList(data);
        })
    }, [])

    const {
        register, handleSubmit, reset, setValue, getValues, errors, formState, watch
    } = useForm();

    const handleChange = (ev) => {
        setSelectedMembers(ev);
    };

    const onSubmit = (data) => {
        console.info('data ', data);
        if (data) {
            data.members = selectedMembers.map(e => e.value);
            console.info('data ', data);

            if (transaction) {
                data._id = transaction._id;
            }
            if (data.members && data.members.length > 0) {
                setIsLoading(true);
                fetch(CONSTANTS.ADD_EXPENSE, {
                    method: 'post',
                    body: JSON.stringify(data),
                    headers: { 'Content-Type': 'application/json' }
                }).then((res) => {
                    return res.json();
                }).then((data) => {
                    setIsLoading(false);
                    notify('Expense ' + (transaction ? 'updated:' : 'added:') + data.expenseName);
                    setExpenseList(prev => ([...prev, data]));
                    reset({ expenseName: '', amount: '', paidBy: '', addedBy: '' });
                    if (transaction?._id) {
                        setRecordUpdated(recordUpdated + 1);
                        closeModal();
                    }
                })

            }

        }
    }

    console.log(watch("example")) // watch input value by passing the name of it

    const deleteTransaction = (id) => {
        setIsLoading(true);
        fetch(CONSTANTS.DELETE_EXPENSEBYID + `${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then((res) => {
            setIsLoading(false);
            return res.json();
        }).then((data) => {
            notify('Expense deleted');
            setExpenseList(data.availableRecords);
        })
    }

    const handleShow = useCallback((id) => {
        console.log('in  --->');
        setEditTransaction(id);
        setShow(true)
    }, [show]);

    const handleClose = () => {
        console.log("in handle close");
        setShow(false);
    };

    const getMembersObj = (members) => {
        let _selectedMembers = [];
        if (membersList.length)
            _selectedMembers = membersList?.filter(e => {
                return ([...members]).indexOf(e._id) > -1
            });
        return _selectedMembers
    }

    // fetch search result
    useEffect(() => {
        const getData = setTimeout(async () => {
            // setIsLoading(true);
            const payload = { page: 1, size: 10, searchString: searchString }
            const api = await fetch(CONSTANTS.GET_EXPENSES, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: { 'Content-Type': 'application/json' }
            });

            const data = api.json();
            console.log(data);
            data.then(res => {
                setExpenseList(res?.data);
                setPageCount(res.pageCount);
                setTotalPages(res.totalPages)
                // setIsLoading(false);
            })
        }, 500);
        return () => clearTimeout(getData)
    }, [searchString]);

    return (
        <>
            <Toaster />
            {isLoading ? <LoadingSpinner /> : (
                membersAvailable && <>

                    <Container fluid className='background-add-exp'>
                        <Container>
                            <Row>
                                <Col xs={12} md={6} lg={6} className="back-form-add-exp">
                                    {!transaction?._id && <h4 className='text-center my-3'>Add Expense</h4>}
                                    <form className="add-exp-form" onSubmit={handleSubmit(onSubmit)} aria-label='add-expense' ref={formRef}>
                                        <div className='mb-2'>
                                            <label htmlFor="expenseName">Expense Name: </label>
                                            <input placeholder="Add expense name" className="form-control" name="expenseName" defaultValue="" {...register('expenseName', { required: true })} />
                                            {/* {errors.expenseName && <span>This field is required</span>} */}
                                        </div>

                                        <div className='mb-2'>
                                            <label htmlFor="amount">Amount: </label>
                                            <input placeholder="Amount" className="form-control" defaultValue="" {...register("amount", { required: true })} />
                                            {/* {errors.amount && <span>This field is required</span>} */}
                                        </div>

                                        <div className='mb-2'>
                                            <label htmlFor="members">Members: </label>
                                            <Select
                                                isMulti
                                                name="members"
                                                options={membersList}
                                                defaultValue={transaction?.members ? getMembersObj(transaction?.members) : []}
                                                onChange={(event) => handleChange(event)}
                                            />
                                        </div>
                                        <div className='mb-2'>
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
                                        <div className='mb-2'>
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
                                        <div className='mb-2'>
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
                                        <input type="submit" aria-label="submit" className='btn btn-primary my-3'
                                            style={{ width: '100%' }} />
                                    </form>
                                </Col>
                            </Row>
                        </Container>
                    </Container>
                    <Container fluid className="background-exp-list">
                        <Container>
                            <Row>
                                <Col xs={12} md={12} lg={12}>
                                    {!transaction?._id &&
                                        <div>
                                            {expenseList && expenseList.length && membersList && membersList.length > 0 &&
                                                <ExpenseList deleteTransaction={deleteTransaction}
                                                    membersList={membersList}
                                                    expenseList={expenseList}
                                                    transactions={transactions}
                                                    handleShow={handleShow}
                                                    handleClose={handleClose}
                                                    show={show}
                                                    editTransaction={editTransaction}
                                                    recordEdited={recordEdited}
                                                    setRecordEdited={setRecordEdited}
                                                    page={page}
                                                    setPage={setPage}
                                                    size={size}
                                                    pageCount={pageCount}
                                                    totalPages={totalPages}
                                                    expenseSummary={expenseSummary}
                                                    groupList={groupList}
                                                    setSearchString={setSearchString}
                                                />}
                                        </div>
                                    }
                                </Col>
                            </Row>
                        </Container>
                    </Container>
                </>
            )
            }
        </>
    )
}

export default AddExpenseComponent
