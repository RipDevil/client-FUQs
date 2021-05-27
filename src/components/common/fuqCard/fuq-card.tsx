import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Typography, Space, message } from 'antd';
import { FireOutlined, FireFilled, LikeFilled, LikeOutlined } from '@ant-design/icons';

import { ToggleIcon } from 'components/common/toggleIcon';
import { StyledTitle, StyledCol } from './fuq-card.styled';
const { Title } = Typography;

export interface FuqCardProps {
  title: string;
  text: string;
  url: string;
}

export const FuqCard: React.FC<FuqCardProps> = ({ text, title, url }) => {
  let history = useHistory();
  function likeHandler(value: boolean) {
    const messagePayload = {
      content: value ? 'Like has landed!' : 'Like has been deleted',
    };

    message[value ? 'success' : 'info'](messagePayload);
  }

  function influenceHandler(value: boolean) {
    // TODO: what should be made if a user cancels existing influenced FUQ?
    history.push('/');
  }

  async function fuqPressed() {
    navigator.clipboard.writeText(url);

    message.info({
      content: "FUQ's url copied to clipboard",
    });
  }

  const likesCount = 1817;
  const influenceCount = 100;

  return (
    <StyledCol>
      <Row justify="center">
        <StyledTitle onClick={fuqPressed} title={title} type="danger" ellipsis={true}>
          {title}
        </StyledTitle>
      </Row>
      <Row justify="center">
        <Title title={text} level={3} ellipsis={{ rows: 4 }}>
          {text}
        </Title>
      </Row>
      <Row justify="center">
        <Space>
          <ToggleIcon onClick={likeHandler} IconFrom={LikeOutlined} IconTo={LikeFilled} counter={likesCount} />

          <ToggleIcon onClick={influenceHandler} IconFrom={FireOutlined} IconTo={FireFilled} counter={influenceCount} />
          {/* Todo share button which opens a share dialog or something kek */}
        </Space>
      </Row>
    </StyledCol>
  );
};
