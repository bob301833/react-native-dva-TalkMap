import React from 'react';
import { Text, ScrollView } from 'react-native';
import { InputItem, List, Button, WhiteSpace, WingBlank, ActivityIndicator, Card } from 'antd-mobile';
import { connect } from 'dva';

const LoginForm = ({ dispatch, auth }) => {
  const { email, password, error, loading } = auth;

  const renderButton = () => {
    if (loading) {
      return <ActivityIndicator size="small" text="loading" />;
    }

    return (
      <WingBlank>
        <Button
          onClick={() => dispatch({
            type: 'auth/loginUser',
            payload: { email, password }
          })}
          type="ghost"
          >
          Login
        </Button>
      </WingBlank>
    );
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      >
      <Card>
        <InputItem
          clear
          autoCorrect={false}
          placeholder="email@gmail.com"
          onChange={(text) => dispatch({
            type: 'auth/emailChanged',
            payload: text,
          })}
          value={email}
          >信箱</InputItem>
        <InputItem
          clear
          type="password"
          placeholder="password"
          onChange={(text) => dispatch({
            type: 'auth/passwordChanged',
            payload: text,
          })}
          value={password}
          >密碼</InputItem>
        <Text style={styles.errorTextStyle}>
          {error}
        </Text>

        {renderButton()}

      </Card>
    </ScrollView>

  );
};

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(LoginForm);
