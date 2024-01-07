// Copied from https://github.com/trekhleb/trekhleb.github.io/blob/7b151f8ac9024c24b1df818f9308bcaf2d354943/src/components/shared/Alert.tsx

import React from 'react';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { BiErrorCircle } from 'react-icons/bi';

import Row from './Row';

type AlertType = 'error' | 'info';

type AlertProps = {
  type: AlertType,
  children: React.ReactNode | null,
};

type alertIcons = Record<AlertType, React.ReactNode>;

type alertClasses = Record<AlertType, string>;

export const InfoAlert: AlertType = 'info';
export const ErrorAlert: AlertType = 'error';

const alertIcons: alertIcons = {
  [InfoAlert]: <BsFillInfoCircleFill size={18} />,
  [ErrorAlert]: <BiErrorCircle size={18} />,
};

const alertClasses: alertClasses = {
  [InfoAlert]: 'text-blue-600 bg-blue-100',
  [ErrorAlert]: 'text-red-600 bg-red-100',
};

const Alert = (props: AlertProps): React.ReactElement | null => {
  const { children, type } = props;

  if (!children) {
    return null;
  }

  return (
    <div className={`py-3 px-4 rounded-md ${alertClasses[type]}`}>
      <Row>
        <div className="mr-3">
          {alertIcons[type]}
        </div>
        <div className="text-sm">
          {children}
        </div>
      </Row>
    </div>
  );
};

export default Alert;
