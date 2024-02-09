import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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

    console.log(_memShares);
    setGiveAway(_memShares);

  }, [props.expenseList, props.transactions, transactions]);

  const GetMemName = ({ id, members, shares }) => {
    let memObj = members.filter(e => e.value == id);
    if (id && members && (!shares)) {
      return <span>{memObj[0]['label']}</span>;
    } else {
      return <span>{memObj[0]['label']}: {shares}</span>;
    }
  }

  return (

    <div>
      <h3>Transactions</h3>
      {expenseList && expenseList.length > 0 && expenseList.map((expense, i) => (
        <Row key="i" style={{ backgroundColor: i % 2 ? '#FFF' : '#bebebe' }}>
          <Col xs={12} md={6} lg={6}>
            <p>{expense.expenseName}   || {expense.amount}  ||  {expense.selectedMembers} </p>
          </Col>
        </Row>
      ))}



      <h3>Shares of Individual</h3>
      <Row>
        {giveAway && giveAway.length > 0 && giveAway.map((shares, i) => (
          <Col xs={12} md={3} lg={3} key={i}>
            <h6 >{shares?.member && shares.member.label}</h6>
            <h6>Ows To</h6>
            {shares?.amount && (Object.keys(shares.amount)).map(((ele, i) => (
              <div>
                <div key={i}>
                  {ele && <GetMemName id={ele} members={members} shares={shares.amount[ele]} />}
                </div>
              </div>
            )))}
            {/* {shares && shares?.owsBy && <p>Ows By: <GetMemName id={shares.owsBy} members={members} /> </p>} */}
          </Col>))
        }

      </Row>
      <div>
      </div>
    </div>
  )
}

export default ExpenseList
