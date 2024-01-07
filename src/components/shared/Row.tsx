// Copied from https://github.com/trekhleb/trekhleb.github.io/blob/7b151f8ac9024c24b1df818f9308bcaf2d354943/src/components/shared/Row.tsx

import React, { CSSProperties } from 'react';

type RowProps = {
  children: React.ReactNode,
  className?: string,
  responsive?: boolean,
  style?: CSSProperties,
};

const Row = (props: RowProps): React.ReactElement | null => {
  const {
    children,
    className = '',
    responsive = false,
    style = {},
  } = props;

  if (!children) {
    return null;
  }

  const classes = responsive ? 'flex flex-col sm:flex-row items-center' : 'flex flex-row items-center';

  return (
    <div style={style} className={`${classes} ${className}`}>
      {children}
    </div>
  );
};

export default Row;
