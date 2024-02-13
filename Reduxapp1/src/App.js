import React from "react";
import { connect } from "react-redux";
import { getUsers, getUsersSuccess } from "./actions";
import "./style.css";
// npm install react-redux
//   npm install redux
  //npm install redux-thunk 
   
class App extends React.Component {
  handleLoadUsersClick = () => {
    this.props.onLoadUsersClick();
    //fetch api
    fetch("https://api.github.com/users")
   //fetch("http://localhost:3030/users")
   //fetch("http://localhost:8085/booking/getAllTickets")
      .then(response => response.json())
      .then(json => this.props.onLoadUsersComplete(json));
  };
  render() {
    return (   //register onClick event to funciton to load data
      <div className="App">
        <h1>React- Redux, reading data from json file</h1>
       
      
        <p>               
          <button onClick={this.handleLoadUsersClick}>Load users</button>
        </p>
        <hr />
        <h3>Users</h3>
        {this.props.loading ? <p>loading...</p> : null}
        {!this.props.loading && this.props.users ? (
          <ul>
            {this.props.users.map(user => (
              <li key={user.id}>
               <b>{user.url}  | {user.site_admin} | { user.type }</b>  
          {/*     <b>{user.firstName}  | {user.email }</b>  */}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }
}        //loading state to props
const mapStateToProps = state => ({
  users: state.users,
  loading: state.isLoading
});
const mapDispatchToProps = dispatch => {
  return {
    onLoadUsersClick: () => {
      dispatch(getUsers());     //dispatching action
    },
    onLoadUsersComplete: users => {
      dispatch(getUsersSuccess(users));  //dispatching action
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
