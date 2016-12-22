import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'dva';
import _ from 'lodash';
import { ListView } from 'antd-mobile';

class talkList extends Component {

  componentWillMount() {
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    //nextProps are the next set of props that this componentWillMount
    //Will be rendered with
    //this.props is still the old set of Props
    this.createDataSource(nextProps);
  }
  createDataSource({ rooms }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(rooms);
  }
  onRowPress(roomId) {
    this.props.dispatch({
      type: 'talk/goToRoom',
      payload: { roomId }
    });
  }
  render() {
     const separator = (sectionID, rowID) => (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
          borderStyle: 'solid',
          borderTopWidth: 1,
          borderTopColor: '#ECECED',
          borderBottomWidth: 1,
          borderBottomColor: '#ECECED',
        }}
      />
    );
    const row = (room, k, roomId) => {
      const { contents, users } = room;
      const other = _.reduce(users, (total, user) => {
        if (user !== this.props.currentUser) {
          return user;
        }
      }, '');
      const message = _.map(contents, (content) => {
        return content.message;
      });
      const last = message.length - 1;
      const username = this.props.data[other].username;
      return (
        <TouchableWithoutFeedback onPress={() => this.onRowPress(roomId)}>
          <View>
            <Text style={styles.titleStyle}>
              {username}
            </Text>
            <Text style={styles.contentStyle}>
              {message[last]}
            </Text>

          </View>
        </TouchableWithoutFeedback>
      );
    };
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={row}
        renderSeparator={separator}
      />
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  },
  contentStyle: {
    fontSize: 15,
    paddingLeft: 15
  }
};

const mapStateToProps = (state) => {
  const { room } = state.talk;
  const currentUser = state.auth.user;
  const { data } = state.user;
  const rooms = _.reduce(room, (result, r, k) => {
    if (_.includes(r.users, currentUser.uid)) {
      result[k] = r;
      return result;
    }
  }, {});
  return { rooms, currentUser, data };
};

export default connect(mapStateToProps)(talkList);
