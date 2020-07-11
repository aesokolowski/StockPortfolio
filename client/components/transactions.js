import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { centsToDollarString, toHumanDate } from '../code';

const Transactions = props => {
  const { username, transactions } = props;

  return (
    <div>
      <h3 className="user-indicator">{username}'s Transaction History</h3>
      <div>
        {
          transactions.map(transaction => (
            <div key={transaction.id} className="transactions-entry">
              <div className="transactions-line">
                <div className="transcat">Transaction #: </div>
                <div className="transval">{transaction.id}</div>
              </div>
              <div className="transactions-line">
                <div className="transcat">Symbol: </div>
                <div className="transval">
                  {transaction.symbol.toUpperCase()}
                </div>
              </div>
              <div className="transactions-line">
                <div className="transcat">Company Name: </div>
                <div className="transval">{transaction.companyName}</div>
              </div>
              <div className="transactions-line">
                <div className="transcat"># of shares: </div>
                <div className="transval">{transaction.quantity}</div>
              </div>
              <div className="transactions-line">
                <div className="transcat">Purchased price: </div>
                <div className="transval">
                  {centsToDollarString(transaction.boughtAt)}
                </div>
              </div>
              <div className="transactions-line">
                <div className="transcat">Total cost: </div>
                <div className="transval">
                  {centsToDollarString(transaction.transTotal)}
                </div>
              </div>
              <div className="transactions-line">
                <div className="transcat">Purchase date: </div>
                <div className="transval">
                  {toHumanDate(transaction.createdAt)}
                </div>
              </div>
              <br />
            </div>
          ))
        }
      </div>
    </div>
  );
};

//  map state to props
const mapState = state => {
  return {
    username: state.user.username,
    transactions: state.transactions
  };
};

export default connect(mapState)(Transactions);

/**
  * PROP TYPES
  */
Transactions.propTypes = {
  username: PropTypes.string.isRequired,
  transactions: PropTypes.array.isRequired
};
