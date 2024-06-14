import React, { useEffect, useState, useMemo } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CONSTANTS from '../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';
import EditExpenseModal from './EditExpenseModal';
import Pagination from './Pagination';

const ExpenseList = (props) => {
  const [members, setMembers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [expenseList, setExpenseList] = useState([]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (props.page - 1) * props.size;
    const lastPageIndex = firstPageIndex + props.size;
    return props.expenseList.slice(firstPageIndex, lastPageIndex);
  }, [props.page]);

  useEffect(() => {
    setMembers(props.membersList);
    setExpenseList(props.expenseList);
    setTransactions(props.transactions);

  }, [props.expenseList, props.transactions, transactions, props.recordEdited]);

  const GetMemName = ({ id, members, shares }) => {
    let memObj = members.filter(e => e.value == id);
    if (id && members && (!shares)) {
      const mem = members.filter(e => e.value == id)
      return mem.length > 0 && <span>{mem[0]['label']}, </span>;
    } else {
      return <span>{memObj[0]['label']}: {shares}</span>;
    }
  }

  const searchExapense = (e) => {
    console.log(e);
    if (e.length > 2 || e == "") {
      console.log("setSearchString", e)
      props.setSearchString(e);
    }
  }

  return (
    <>

      <input type="text" className='search-expense form-control' placeholder='Type to search expense' onChange={(e) => searchExapense(e.target.value)} />

      {props.groupList && props.groupList.map(group => (
        <span class="badge text-bg-primary">{group.label}</span>
      ))}

      <h4 className='mt-3'>Expense List</h4>

      <Table responsive="sm" striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Expense Name</th>
            <th>Amount</th>
            <th>Members</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {members && expenseList && expenseList.length > 0 && expenseList.map((expense, i) => (
            <tr key={'tr' + i}>
              <td key={'td1' + i}>{((props.page - 1) * props.size) + i + 1}</td>
              <td key={'td2' + i}>{expense.expenseName} </td>
              <td key={'td3' + i}>{expense.amount} </td>
              <td key={'td4' + i}>
                {members && members.length > 0 && expense.members && expense.members.map((e, i) => (
                  <GetMemName key={'mem' + i} id={e} members={members} />

                ))}
              </td>
              <td key={'td5' + i}>
                <FontAwesomeIcon onClick={() => props.deleteTransaction(expense._id)} icon={faTrash} /> &nbsp; &nbsp; &nbsp;
                <FontAwesomeIcon icon={faPencil} onClick={() => props.handleShow(expense)} />
              </td>
            </tr>
          ))
          }
        </tbody>
      </Table >


      <Pagination
        className="pagination-bar"
        currentPage={props.page}
        totalCount={props.totalPages}
        pageSize={props.size}
        onPageChange={page => props.setPage(page)}
      />

      {/* <h4>Shares of Individual</h4> */}
      <Row>

        {props.expenseSummary.memShares && props.expenseSummary.memShares.length > 0 && props.expenseSummary.memShares.map((shares, i) => (

          <>
            <Col className="my-3" xs={12} md={3} lg={3} key={i} >
              <Card >
                {/* <Card.Img variant="top" src="" /> */}
                <Card.Body>
                  <Card.Title>{shares?.member && shares.member.label}
                    {members && members.length > 0 && shares?.amount && <span style={{ fontSize: "0.5em" }}> Ows to </span>}
                  </Card.Title>
                  {members && members.length > 0 && shares?.amount && (Object.keys(shares.amount)).map(((ele, i) => (
                    <Card.Text>
                      <div key={i}>
                        {ele && <GetMemName id={ele} members={members} shares={shares.amount[ele]} />}
                      </div>
                    </Card.Text>
                  )))}
                  <Card.Title>
                    Total Expense
                  </Card.Title>
                  <Card.Text>
                    {shares?.totalExpenseByMember}
                  </Card.Text>
                  <Button className="w-100" variant="primary">Pay</Button>
                </Card.Body>
              </Card>
            </Col>
          </>
        ))
        }
      </Row>
      <Row>
        <Col className="my-3" xs={12} md={3} lg={3} >
          <h3>Group Total: {JSON.stringify(props.expenseSummary.groupTotalExpense[0]['groupTotalExpense'])}</h3>
        </Col>
      </Row>
      <EditExpenseModal show={props.show}
        recordEdited={props.recordEdited}
        setRecordEdited={props.setRecordEdited}
        handleClose={props.handleClose} transaction={props.editTransaction} />
    </>
  )
}

export default ExpenseList


