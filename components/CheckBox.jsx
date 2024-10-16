import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

const Checkboxs = ({ label, checked, onChange }) => {
  return (
    <TouchableOpacity onPress={onChange} style={styles.checkboxContainer}>
      <View style={[styles.checkbox, checked && styles.checkedCheckbox]}>
        {checked && <Text style={styles.checkmark}>✔️</Text>}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    left: 15,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkedCheckbox: {
    backgroundColor: 'white',
  },
  checkmark: {
    color: 'white',
    fontSize: 11,
  },
  label: {
    top: 80,
    alignSelf: 'center',
    backgroundColor: 'white',
    fontSize: 11,
    width: 200,
    height: 200,
  },
});

export default Checkboxs;
