import { default as React, useState } from 'react';
import classnames from 'classnames'

import * as Routes from '../routes';
import { useAuth } from '../services';
import { useHistory } from 'react-router-dom';

const SignIn = ({children}) => {
  const { signInLocal } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let history = useHistory();

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const user = await signInLocal(email, password);
    if (user) {
      history.push(Routes.BACKOFFICE_LANDING);
    }
  }
    return (
        <div className='row'>
            <div className={classnames('col-12', 'o-signinForm')}>
                <form className={classnames('m-signinForm')} onSubmit={(ev) => handleSubmit(ev)}>
                    <label htmlFor='email'>E-mail</label>
                    <input type='text' name='email' placeholder='email'></input>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' placeholder='password'></input>
                    <button type='submit'>Sign In</button>
                </form>
            </div>
        </div>
    )
}

export default SignIn;