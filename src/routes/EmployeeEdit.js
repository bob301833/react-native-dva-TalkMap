import _ from 'lodash';
import React, { Component } from 'react';
import { Button, WhiteSpace, WingBlank, List, Modal, Flex } from 'antd-mobile';
import { connect } from 'dva';
import Communications from 'react-native-communications';
import EmployeeForm from '../components/EmployeeForm';

class EmployeeEdit extends Component {
  componentWillMount() {
    _.each(this.props.employee, (value, prop) => {
      this.props.dispatch({ type: 'employeeform/employeeUpdate', payload: { prop, value } });
    });
  }
  onButtonPress() {
    const { name, phone, shift } = this.props;
    this.props.dispatch({
      type: 'employeeform/employeeSave',
      payload: { name, phone, shift, uid: this.props.employee.uid }
    });
    //this.props.employeeSave({ name, phone, shift, uid: this.props.employee.uid });
  }

  onTextPress() {
    const { phone, shift } = this.props;

    Communications.text(phone, `Your upcoming shift is on ${shift}`);
  }
   onAccept() {
    const { uid } = this.props.employee;
    this.props.dispatch({ type: 'employeeform/employeeDelete', payload: uid });
  }

    onDecline() {
      //this.setState({ showModal: false });
      this.props.dispatch({ type: 'employeeform/hideModal' });
    }


  render() {
      return (
        <List>
          <EmployeeForm />
          <WhiteSpace />
          <WingBlank>
            <Button type="ghost" onClick={this.onButtonPress.bind(this)}>
              Save Changes
            </Button>
          </WingBlank>
          <WhiteSpace />
          <WingBlank>
            <Button type="ghost" onClick={this.onTextPress.bind(this)}>
              Text Schedule
            </Button>
          </WingBlank>
          <WhiteSpace />
          <WingBlank>

            <Button type="ghost" onClick={() => this.props.dispatch({ type: 'employeeform/showModal' })}>
              Fire Employee
            </Button>
          </WingBlank>
          <WhiteSpace />
          <Modal
          style={{ height: 100, width: 350 }}
          title="Are you sure you want to delete this?"
          transparent
          visible={this.props.modalVisible}
          >
          <WingBlank>
            <WhiteSpace size="sm" />
            <Flex>
              <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
                <Button type="ghost" inline onClick={this.onAccept.bind(this)}>Yes</Button>
              </Flex.Item>
              <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
                <Button type="ghost" inline onClick={this.onDecline.bind(this)}>No</Button>
              </Flex.Item>
            </Flex>
          </WingBlank>
        </Modal>
        </List>

      );
  }
}

const mapStateToProps = (state) => {
  const { name, phone, shift, modalVisible } = state.employeeform;

  return { name, phone, shift, modalVisible };
};

export default connect(mapStateToProps)(EmployeeEdit);
