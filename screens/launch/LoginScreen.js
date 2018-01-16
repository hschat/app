import React from 'react';
import {View, StyleSheet, Image, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import {
  FormInput, Button, Spinner, Container, Title, Icon, Input, Form,
  Text, Item, Label, Toast, Content
} from 'native-base'

const baseStyles = require('../../baseStyles');

const styles = StyleSheet.create({
  link: {
    fontSize: 15,
    color: '#00335C',
  },
  right: {
    marginTop: 15,
    alignSelf: 'flex-end',
  }
});

export default class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this.store = this.props.screenProps.store;
    this.state = {
      name: '',
      password: '',
      showToast: false,
    };
  }

  setName = (n) => {
    this.setState({name: n})
  };
  setPassword = (n) => {
    this.setState({password: n});
  };

  login = () => {
    this.store.authenticate({
      email: this.state.name,
      password: this.state.password,
      strategy: 'local'
    }).catch(error => {
      //console.error('Login error:', error);
      Alert.alert('Fehler', error.message);
    });
  };


  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Image style={baseStyles.backgroundImage} source={require('../../assets/img/bg.png')}/>
            <Form style={baseStyles.middle}>
              <Item last style={baseStyles.backgroundButtonInput}>
                <Label>E-mail</Label>
                <Input onChangeText={this.setName}
                       bordered
                       keyboardType='email-address'
                       returnKeyType='next'
                       autoCapitalize='none'
                />
              </Item>
              <Item last style={baseStyles.backgroundButtonInput}>
                <Label>Passwort</Label>
                <Input onChangeText={this.setPassword}
                       bordered
                       secureTextEntry={true}
                       returnKeyType='done'
                       autoCapitalize='none'
                />
              </Item>
              <Button onPress={this.login}
                      style={baseStyles.redButton}
                      underlayColor='#B71234'
                      iconRight
                      block>
                <Text style={baseStyles.redButtonText}>Beitreten</Text>
                <Icon ios='ios-log-in' android='md-log-in' size={20}/>
              </Button>
            </Form>
        </Container>
      </TouchableWithoutFeedback>
    )
  }
}
