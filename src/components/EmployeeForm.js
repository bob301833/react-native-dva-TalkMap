import React from 'react';
import { Text, Picker } from 'react-native';
import { connect } from 'dva';
import { InputItem, List, WhiteSpace } from 'antd-mobile';

const EmployeeForm = ({ dispatch, name, phone, shift }) => {
  return (
      <List>
          <InputItem
            clear
            value={name}
            onChange={value => {
                dispatch({ type: 'employeeform/employeeUpdate', payload: { prop: 'name', value } });
            }}
            placeholder="Jane"
          >姓名</InputItem>
          <InputItem
            clear
            value={phone}
            onChange={value => {
              dispatch({ type: 'employeeform/employeeUpdate', payload: { prop: 'phone', value } });
            }}
            placeholder="555-555-5555"
          >電話</InputItem>
          <WhiteSpace />
          <Text style={styles.pickerTextStyle}>Shift</Text>
          <Picker
            selectedValue={shift}
            onValueChange={value => {
              dispatch({ type: 'employeeform/employeeUpdate', payload: { prop: 'shift', value } });
            }}
          >
            <Picker.Item label="Monday" value="Monday" />
            <Picker.Item label="Tuesday" value="Tuesday" />
            <Picker.Item label="Wednesday" value="Wednesday" />
            <Picker.Item label="Thursday" value="Thursday" />
            <Picker.Item label="Friday" value="Friday" />
            <Picker.Item label="Saturday" value="Saturday" />
            <Picker.Item label="Sunday" value="Sunday" />
          </Picker>
      </List>
  );
};

const styles = {
  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeform;

  return { name, phone, shift };
};


export default connect(mapStateToProps)(EmployeeForm);
