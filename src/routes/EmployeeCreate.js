import React, { Component } from 'react';
import { Text, Picker } from 'react-native';
import EmployeeForm from '../components/EmployeeForm';
import { Button, WhiteSpace, Card } from 'antd-mobile';
import { connect } from 'dva';

class EmployeeCreate extends Component {

  componentWillMount() {
    this.props.dispatch({ type: 'employeeform/employeeClear' });
  }

  onButtonPress() {
    const { name, phone, shift } = this.props;
    this.props.dispatch({
      type: 'employeeform/employeeCreate',
      payload: { name, phone, shift }
    });
  }

  render() {
    return (
      <Card>
        <EmployeeForm />
        <WhiteSpace />
        <Button type="ghost" onClick={this.onButtonPress.bind(this)} >
          Create
            </Button>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeform;

  return { name, phone, shift };
};

export default connect(mapStateToProps)(EmployeeCreate);
