import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Typography, Space, message } from 'antd';
import { FireOutlined, FireFilled, LikeFilled, LikeOutlined } from '@ant-design/icons';

import { ToggleIcon } from 'components/common/toggleIcon';
import { InfluencerBadge } from 'components/common';
import { StyledTitle, StyledCol } from './fuq-card.styled';
const { Title } = Typography;

export type FuqCardProps = {
  title: string;
  text: string;
  id?: string;
};

export const FuqCard: React.FC<FuqCardProps> = ({ text, title, id }) => {
  let history = useHistory();
  function likeHandler(value: boolean) {
    const messagePayload = {
      content: value ? 'Like has landed!' : 'Like has been deleted',
    };

    message[value ? 'success' : 'info'](messagePayload);
  }

  function influenceHandler() {
    // TODO: what should be made if a user cancels existing influenced FUQ?
    history.push(`/create/${id}`);
  }

  async function fuqPressed() {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(`${window.location.href.replace(/fuq\/.*/g, '')}fuq/${id}`);

      message.info({
        content: "FUQ's url copied to clipboard",
      });
    }
  }

  const likesCount = 10;
  const influenceCount = 160;
  const influencer = undefined;

  return (
    <StyledCol>
      <Row justify="center">
        <InfluencerBadge url={influencer && `/fuq/${influencer}`} />
      </Row>
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
          <ToggleIcon
            onClick={likeHandler}
            IconFrom={LikeOutlined}
            IconTo={LikeFilled}
            counter={likesCount}
            overflow={9000}
          />

          <ToggleIcon
            onClick={influenceHandler}
            IconFrom={FireOutlined}
            IconTo={FireFilled}
            counter={influenceCount}
            overflow={9000}
          />
          {/* Todo share button which opens a share dialog or something kek */}
        </Space>
      </Row>
    </StyledCol>
  );
};
