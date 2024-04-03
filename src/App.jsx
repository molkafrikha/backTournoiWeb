import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/login';
import ForgotPassword from './components/forgotpassword';
import CreateNewPassword from './components/createNewPassword';
import Register from './components/register';
import Dashboard from './components/dashboard';

import AdminHome from './components/admin/acceuilAdmin';
import AllUsers from './components/admin/allusers';
import { Provider } from 'react-redux'; // Importez Provider depuis react-redux
import store from './store';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

 // Assurez-vous d'importer votre store Redux correctement
 const isAdmin = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return userInfo && userInfo.role === 'admin';
};

// Composant pour protéger la route de l'administrateur

function App() {
  return (
    <Provider store={store}> {/* Enveloppez votre application dans le Provider et passez-y le store */}
      <Router>
        <div>
          {/* Définissez vos routes */}
          <Route path="/Admin" component={AdminHome} />
          <Route path="/Admin/allusers" component={AllUsers} />
          <Route path="/register" component={Register}/>
          <Route path="/" component={Login} />
          <Route path="/dash" component={Dashboard} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/createNewPassword/:token" component={CreateNewPassword}/>
          
        </div>
      </Router>
    </Provider>
  );
}

export default App;
