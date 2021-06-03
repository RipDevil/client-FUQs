import * as React from 'react';
import { Row, Form, FormInstance, Button, Space, Input } from 'antd';
import { RollbackOutlined, CheckOutlined } from '@ant-design/icons';

import { StyledInputLarge, StyledTextArea, StyledCol, StyledRow } from './create-fuq-card.styled';
import { InfluencerBadge } from 'components/common';
import { text as textRules, title as titleRules } from './lib';

export type CreateFuqCardProps = {
  bordered?: boolean;
  onSubmit: (values: NewFuqFormTypes) => void;
  influencer?: string;
};

export type NewFuqFormTypes = {
  title: string;
  text: string;
};

export const CreateFuqCard: React.FC<CreateFuqCardProps> = ({ bordered = false, influencer, onSubmit }) => {
  const formRef = React.createRef<FormInstance<NewFuqFormTypes>>();
  const titleInputRef = React.createRef<Input>();

  React.useEffect(() => {
    titleInputRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function forceSubmit() {
    formRef.current?.submit();
  }

  function textNormalizeFunction(value: string) {
    return value.replace(/\n/g, '');
  }

  function resetFields() {
    formRef.current?.resetFields();
  }

  return (
    <StyledCol>
      <Row justify="center">
        <InfluencerBadge url={influencer && `/fuq/${influencer}`} />
      </Row>
      <Form onFinish={onSubmit} ref={formRef} component={false}>
        <Row justify="center">
          <Form.Item name="title" rules={titleRules} noStyle>
            <StyledInputLarge
              ref={titleInputRef}
              data-testid="title-input"
              onPressEnter={forceSubmit}
              bordered={bordered}
              maxLength={30}
              placeholder="Write a FUQ title here"
            />
          </Form.Item>
        </Row>
        <Row justify="center">
          <Form.Item name="text" rules={textRules} normalize={textNormalizeFunction} noStyle>
            <StyledTextArea
              data-testid="text-input"
              onPressEnter={forceSubmit}
              bordered={bordered}
              maxLength={200}
              autoSize={{ minRows: 1, maxRows: 4 }}
              placeholder="Write some hate messages here, my fren"
            />
          </Form.Item>
        </Row>
        <StyledRow justify="center">
          <Space>
            <Button
              data-testid="clear-form"
              onClick={resetFields}
              type="link"
              icon={<RollbackOutlined />}
              size="large"
              title="Clear fields"
            />
            <Button
              data-testid="submit-form"
              onClick={forceSubmit}
              type="link"
              icon={<CheckOutlined />}
              size="large"
              title="Create FUQ"
            />
          </Space>
        </StyledRow>
      </Form>
    </StyledCol>
  );
};
