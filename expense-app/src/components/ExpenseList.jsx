import React, { useEffect, useState } from 'react'

const ExpenseList = (props) => {

  const [members, setMembers] = useState([1, 2, 3, 4]);
  const [transactions, setTransactions] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const [giveAway, setGiveAway] = useState([]);

  useEffect(() => {
    setExpenseList(props.expenseList);
    setTransactions(props.transactions);

    // calcuculate individual shares
    let _memShares = members.map((mem, i) => {
      return transactions && transactions.length > 0 && transactions.reduce((acc, ele) => {
        if (ele['owsBy'] == mem) {
          acc['owsBy'] = mem;

          if (acc['amount'][ele['owsTo']]) {
            acc['amount'][ele['owsTo']] = acc['amount'][ele['owsTo']] + ele['amount'];

          } else {
            acc['amount'][ele['owsTo']] = ele['amount'];

          }
        }
        acc.memberId = mem;
        return acc
      }, { amount: {} }) || [];


    });

    console.log(_memShares);
    setGiveAway(_memShares);

  }, [props.expenseList, props.transactions, transactions]);

  return (
    <div>

      <div>
        {expenseList && expenseList.length > 0 && expenseList.map((expense, i) => (
          <div key="i">
            <p>--------------------------</p>
            <p>{expense.expenseName}</p>
            <p>{expense.amount}</p>
            <p>{expense.selectedMembers}</p>
            <p>--------------------------</p>
          </div>
        ))}
      </div>

      <div>
        {giveAway && giveAway.length > 0 && giveAway.map((shares) => (
          <div>
            <p>*********************</p>
            <p>Member: {shares?.memberId}</p>
            <p>Ows To :{shares?.amount && (Object.keys(shares.amount)).map((ele => (
              <div>
                <p>{ele}: {shares.amount[ele]}</p>
              </div>
            )))}</p>
            {/* <p>Amount: {shares?.amount}</p> */}
            <p>Ows By: {shares?.owsBy}</p>
            <p>*********************</p>

          </div>))
        }
        <div>
        </div>
      </div>
    </div>
  )
}

export default ExpenseList
