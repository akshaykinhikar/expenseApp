import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CONSTANTS from '../constants';




const ExpenseList = (props) => {

  const [members, setMembers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const [giveAway, setGiveAway] = useState([]);
  const [isExpenseDeleted, setIsExpenseDeleted] = useState(0);

  useEffect(() => {
    setMembers(props.membersList);
    setExpenseList(props.expenseList);
    setTransactions(props.transactions);

    // calcuculate individual shares
    let _memShares = members.map((mem, i) => {
      return transactions && transactions.length > 0 && transactions.reduce((acc, ele) => {
        if (ele['owsBy'] == mem['value']) {
          acc['owsBy'] = mem['value'];

          if (acc['amount'][ele['owsTo']]) {
            acc['amount'][ele['owsTo']] = acc['amount'][ele['owsTo']] + ele['amount'];

          } else {
            acc['amount'][ele['owsTo']] = ele['amount'];

          }
        }
        acc.member = mem;
        return acc
      }, { amount: {} }) || [];


    });

    console.log(_memShares);
    setGiveAway(_memShares);

  }, [props.expenseList, props.transactions, transactions, isExpenseDeleted]);

  const GetMemName = ({ id, members, shares }) => {
    let memObj = members.filter(e => e.value == id);
    if (id && members && (!shares)) {
      const mem = members.filter(e => e.value == id)
      return <p>{mem[0]['label']}</p>;
    } else {
      return <span>{memObj[0]['label']}: {shares}</span>;
    }
  }

  const deleteTransaction = (id) => {
    console.log("delete recored", id)
    fetch(CONSTANTS.DELETE_EXPENSEBYID + `${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }).then((res) => {
      return res.json();
    }).then((data) => {
      console.log('deleted exprense')
      console.log(data);
      setIsExpenseDeleted(() => isExpenseDeleted + 1)
      // setGroupList(data);
    })
  }

  return (

    <div>
      <h4>Transactions</h4>
      {/* {expenseList && expenseList.length > 0 && expenseList.map((expense, i) => (
        <Row key="i" style={{ backgroundColor: i % 2 ? '#FFF' : '#bebebe' }}>
          <Col xs={12} md={6} lg={6}>
            <p>{expense.expenseName}   || {expense.amount}  ||  {expense.selectedMembers} </p>
          </Col>
        </Row>
      ))} */}


      <>
        < Table striped bordered hover >
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
              <tr>
                <td>{i + 1}</td>
                <td>{expense.expenseName} </td>
                <td>{expense.amount} </td>
                <td>
                  {members && members.length > 0 && expense.members && expense.members.map(e => (
                    // <p>{e}</p>
                    <GetMemName id={e} members={members} />

                  ))}
                </td>
                <td>
                  <p onClick={() => deleteTransaction(expense._id)} >delete</p>
                </td>
              </tr>
            ))
            }
          </tbody>
        </Table >
      </>


      <h4>Shares of Individual</h4>
      <Row>
        {giveAway && giveAway.length > 0 && giveAway.map((shares, i) => (

          <>
            <Col className="my-3" xs={12} md={3} lg={3} key={i} >
              <Card >
                {/* <Card.Img variant="top" src="" /> */}
                <Card.Body>
                  <Card.Title>{shares?.member && shares.member.label}</Card.Title>
                  {members && members.length > 0 && shares?.amount && (Object.keys(shares.amount)).map(((ele, i) => (
                    <Card.Text>
                      <div key={i}>
                        {ele && <GetMemName id={ele} members={members} shares={shares.amount[ele]} />}
                      </div>
                    </Card.Text>
                  )))}
                  <Button variant="primary">Pay</Button>
                </Card.Body>
              </Card>
            </Col>
          </>
        ))
        }
      </Row>
      <div>
      </div>
    </div >
  )
}

export default ExpenseList


