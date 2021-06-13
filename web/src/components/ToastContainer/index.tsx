import React from 'react';
import { useTransition } from 'react-spring';

import Toast from './Toast';

import { IToastMessage } from '../../hooks/toast';
import { Container } from './styles';

interface IToastContainerProps {
  messages: IToastMessage[];
}

const ToastContainer: React.FC<IToastContainerProps> = ({ messages }) => {
  const messagesWithTransactions = useTransition(
    messages,
    message => message.id,
    {
      from: { right: '-120%', opacity: 0 },
      enter: { right: '0%', opacity: 1 },
      leave: { right: '-120%', opacity: 0 },
    },
  );

  return (
    <Container>
      {messagesWithTransactions.map(({ item, key, props }) => (
        <Toast key={key} style={props} message={item}/>
      ))}
    </Container>
  );
};

export default ToastContainer;