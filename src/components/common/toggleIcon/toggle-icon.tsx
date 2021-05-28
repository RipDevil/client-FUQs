import * as React from 'react';
import { Badge } from 'antd';

import { Icon as AntdIconType } from './toggle-icon.types'; // ugly? look inside
import { StyledSpan } from './toggle-icon.styled';

export type ToggleIconProps = {
  onClick: (value: boolean) => void;
  IconFrom: AntdIconType;
  IconTo: AntdIconType;
  counter?: number;
  overflow?: number;
  size?: 'default' | 'small';
  title?: string;
};

export const ToggleIcon: React.FC<ToggleIconProps> = (props) => {
  const { onClick, IconFrom, IconTo, counter, overflow, size, title } = props;
  const [trigger, setTrigger] = React.useState<number>(0);

  function clickHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const newValue = Math.abs(trigger - 1);
    setTrigger(newValue);
    onClick(Boolean(newValue));
  }

  return (
    <StyledSpan data-testid="icon-span" onClick={clickHandler}>
      <span>{trigger ? <IconTo /> : <IconFrom title={title || ''} />}</span>
      <Badge size={size || 'default'} count={(counter || 0) + trigger} overflowCount={overflow || 100000}></Badge>
    </StyledSpan>
  );
};
