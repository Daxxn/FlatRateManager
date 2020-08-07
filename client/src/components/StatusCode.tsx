import React from 'react';
import '../styles/StatusCode.css';

export interface StatusCodeProps {
  statusCode: number;
  message: string | null;
}

const StatusCode = (props: StatusCodeProps): JSX.Element => {
  const { statusCode, message } = props;

  const bgClass = 
    (statusCode >= 200 && statusCode < 300)
    ? 'statusGood'
    : 'statusBad';

  return (
    <div className={`statusCodeBase ${bgClass}`}>
      <p className="statusCodeText">{statusCode}</p>
      <p className="statusCodeText">{message ? message : 'no messaage'}</p>
    </div>
  );
};

export default StatusCode;