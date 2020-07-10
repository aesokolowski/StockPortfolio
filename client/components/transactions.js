import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { centsToDollarString } from '../code';

const Transactions = props => {
  const { username, transactions } = props;

  return (
    <div>
      <h3 id="transactions-title">{username}'s Transaction History</h3>
      <div>
        {
          transactions.map(transaction => (
            <div key={transaction.id} className="transactions-entry">
              <div>
                Transaction #: {transaction.id}
                <br />
                Symbol: {transaction.symbol.toUpperCase()}
                <br />
                Company Name: {transaction.companyName}
                <br />
                # of Shares: {transaction.quantity}
                <br />
                Share price: {centsToDollarString(transaction.boughtAt)}
                <br />
                Total cost: {centsToDollarString(transaction.transTotal)}
                <br />
                Purchase date: {transaction.createdAt}
                <br />
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
