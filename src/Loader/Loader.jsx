import React from 'react';
import { css } from '@emotion/react';
import { BarLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const LoadingSpinner = ({ loading }) => {
  return (
    <div className="sweet-loading">
      <BarLoader css={override} size={150} color={"#36D7B7"} loading={loading} />
    </div>
  );
};

export default LoadingSpinner;
