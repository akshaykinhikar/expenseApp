import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CONSTANTS from '../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';

const ExpenseList = (props) => {

  const [members, setMembers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const [giveAway, setGiveAway] = useState([]);

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

    setGiveAway(_memShares);

  }, [props.expenseList, props.transactions, transactions]);

  const GetMemName = ({ id, members, shares }) => {
    let memObj = members.filter(e => e.value == id);
    if (id && members && (!shares)) {
      const mem = members.filter(e => e.value == id)
      return mem.length > 0 && <p>{mem[0]['label']}</p>;
    } else {
      return <span>{memObj[0]['label']}: {shares}</span>;
    }
  }



  return (

    <div>
      <h4>Expense List</h4>
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
              <tr key={'tr' + i}>
                <td>{i + 1}</td>
                <td>{expense.expenseName} </td>
                <td>{expense.amount} </td>
                <td>
                  {members && members.length > 0 && expense.members && expense.members.map(e => (
                    // <p>{e}</p>
                    <GetMemName key={e} id={e} members={members} />

                  ))}
                </td>
                <td>
                  <FontAwesomeIcon onClick={() => props.deleteTransaction(expense._id)} icon={faTrash} /> &nbsp;&nbsp;&nbsp;&nbsp;
                  <FontAwesomeIcon icon={faPencil} />
                </td>
              </tr>
            ))
            }
          </tbody>
        </Table >
      </>


      {/* <h4>Shares of Individual</h4> */}
      <Row>
        {giveAway && giveAway.length > 0 && giveAway.map((shares, i) => (

          <>
            <Col className="my-3" xs={4} md={3} lg={3} key={i} >
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


