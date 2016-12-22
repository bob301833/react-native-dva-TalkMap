import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { InputItem, Button, Card } from 'antd-mobile';
import { connect } from 'dva';
import _ from 'lodash';
import AutoScroll from 'react-native-auto-scroll';
import { getTalkList } from '../services/talk';

class talk extends Component {
  componentDidMount() {
    const { nowRoomId, dispatch } = this.props;

    getTalkList(nowRoomId, contentData => {
        dispatch({ type: 'talk/getTalkData', payload: contentData });
    });
  }

  onSubmit() {
    const { currentUser, message, nowRoomId, dispatch } = this.props;
    dispatch({
      type: 'talk/addMessage',
      payload: { nowRoomId, currentUser, message }
    });
  }

  renderContent() {
    const { selfMessageStyle, otherMessageStyle, ImageStyle } = styles;

    return (
      <View style={{ flex: 1 }} >
        <AutoScroll>
        {
          _.map(this.props.contents, (content, key) => {
            const isSelf = content.uid === this.props.currentUser.uid;
            const messageStyle = isSelf ? selfMessageStyle : otherMessageStyle;
            const uri = this.props.data[content.uid].picture;
            return (
              <View style={messageStyle} key={key}>
                  {
                    !isSelf && <Image
                    style={ImageStyle}
                    source={{ uri }}
                    />
                  }
                <Text>{content.message}</Text>
              </View>
            );
          })
        }
        </AutoScroll>
      </View>
    );
  }

  render() {
    const { message, dispatch } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 12 }}>
          {this.renderContent()}
        </View>
        <Card style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 8 }}>
              <InputItem
                controlled
                autoCorrect={false}
                onChange={(text) => dispatch({
                  type: 'talk/messageChanged',
                  payload: text,
                })}
                value={message}
                placeholder="message"
              />
            </View>
            <View style={{ flex: 2, justifyContent: 'center' }}>
              <Button
                size="small"
                type="ghost"
                onClick={this.onSubmit.bind(this)}
              >
                submit
              </Button>
            </View>
          </View>
        </Card>
      </View>
    );
  }
}

const styles = {
  selfMessageStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  otherMessageStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  ImageStyle: {
    width: 30,
    height: 30
  }
};
const mapStateToProps = (state) => {
  const { data } = state.user;
  const currentUser = state.auth.user;
  const { message, nowRoomId, contents } = state.talk;
  return { data, currentUser, message, nowRoomId, contents };
};

export default connect(mapStateToProps)(talk);
