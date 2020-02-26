import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Transactions = props => {
  const { username, transactions } = props;

  //  helper function to display cents in dollar format:
  const centsToDollarString = cents => {
    let charArr = ('$' + cents.toString()).split('');

    charArr.splice(-2, 0, '.');
    return charArr.join('');
  };

  return (
    <div>
      <h3>{username}'s Transaction History</h3>
      <div>
        {
          transactions.map(transaction => (
            <div key={transaction.id}>
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
  username: PropTypes.string,
  transactions: PropTypes.array
};
