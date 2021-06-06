import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Switch,
  TouchableOpacity
} from 'react-native';
import MultiSelect from 'react-native-multiple-select';

const items = [{
  id: '92iijs7yta',
  name: 'Ondo',
}, {
  id: 'a0s0a8ssbsd',
  name: 'Ogun',
}, {
  id: '16hbajsabsd',
  name: 'Calabar',
}, {
  id: 'nahs75a5sg',
  name: 'Lagos',
}, {
  id: '667atsas',
  name: 'Maiduguri',
}, {
  id: 'hsyasajs',
  name: 'Anambra',
}, {
  id: 'djsjudksjd',
  name: 'Benue',
}, {
  id: 'sdhyaysdj',
  name: 'Kaduna',
}, {
  id: 'suudydjsjd',
  name: 'Abuja',
}];

const onSelectedItemsChange = (selectedItems) => {
  // do something with selectedItems
  console.log('Selected Items: ', selectedItems);
};



const SettingsScreen = () => (
  <View style={styles.container}>
  <Switch 
    onValueChange={isSwitchOn => this.setState({isSwitchOn})}
    value={this.state.isSwitchOn} 
  />
  <TouchableOpacity style={styles.buttonCalculate} onPress={this.showCalculation}>
    <Text style={styles.title}> Calculate </Text>
  </TouchableOpacity>
    <Text style={styles.welcome}>
      MultiSelect Sample
    </Text>
    <MultiSelect
      single
      items={items}
      uniqueKey="id"
      onSelectedItemsChange={onSelectedItemsChange}
      selectedItems={[]}
      selectText="Pick Items"
      searchInputPlaceholderText="Search Items..."
      tagRemoveIconColor="#CCC"
      tagBorderColor="#CCC"
      tagTextColor="#CCC"
      selectedItemTextColor="#CCC"
      selectedItemIconColor="#CCC"
      itemTextColor="#000"
      searchInputStyle={{ color: '#CCC' }}
      submitButtonColor="#CCC"
      submitButtonText="Submit"
    />
  </View>

);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 30,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default SettingsScreen;