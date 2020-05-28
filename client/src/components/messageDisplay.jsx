import React from 'react';
import PropTypes from 'prop-types';

const MessageDisplay = (props) => {
  return (
    <div>
      <p>{props.message}</p>
    </div>
  );
}
MessageDisplay.propTypes = {
  message: PropTypes.string.isRequired,
  //code: PropTypes.number.isRequired,
}
export default MessageDisplay;