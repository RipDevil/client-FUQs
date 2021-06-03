import * as React from 'react';
import { Button } from 'antd';

export const CustomPortalLink = React.forwardRef((props: any, ref: any) => (
  <Button type="link" ref={ref} size="small" {...props}></Button>
));
