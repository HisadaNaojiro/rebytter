import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import LoginForm from '../components/LoginForm';
import { login } from '../redux/actions/auth';


class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      route: 'Login',
      email: '',
      password: ''
    };
    this.userLogin = this.userLogin.bind(this);
  }

  userLogin(e){
    this.props.onLogin(this.state.email , this.state.password);
    e.preventDefault();
  }

  toggleRoute(e){
    let alt = (this.state.route === 'Login') ? 'Login' : 'Signup';
    this.setState({route : alt});
    e.preventDefault();
  }  

  render() {
    let alt = (this.state.route === 'Login') ? 'Login' : 'Signup';
    
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>{alt}</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <LoginForm {...this.props} onPress={this.userLogin}/>
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = (state , ownProps) =>{
  return {
    isLoggedIn: state.auth.isLoggedIn
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    //onLogin: (username, password) => { dispatch(login(username, password)); },
    onLogin: (email , password) => dispatch(callLoginService(email , password)),
    onSignup: (email , password) => { dispatch(signup(email , password)); }
  }
}

export const callLoginService = (email , password) =>{
  //const query = `mutation signinUser($email: email){signinUser(email: email){token user{id}}}`
  //const variables = {email: {email : email , password: password}};
  const query = `mutation{signinUser(email: {email: "test@example.com",password: "test"}){token user{id}}}`;
  return dispatch => {
    dispatch(login(email , password));
    axios.post('http://10.0.2.2:3000/graphql',{query:query})
    .then(response =>{
      console.log(response);
      Actions.main();
    })
    .catch(error => {
      console.log(error);
    });
  }
}
export default connect(mapStateToProps , mapDispatchToProps)(Login);
