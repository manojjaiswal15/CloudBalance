export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOGIN_FAIL = 'LOGIN_FAIL';

const users = [
  { id: 1, email: 'manoj@gmail.com', password: '1234', role: 'admin' },
  {id:2 , email: 'readonly@gmail.com',password:'1234', role:'readonly'},
  {id:2 , email: 'customer@gmail.com',password:'1234', role:'customer'}
];

export const login = (email, password) => {
  const found = users.find(u => u.email === email && u.password === password);

  if (found) {
    return {
      type: LOGIN,
      payload: { 
        user: {
          email: found.email,
          role: found.role
        }
      }
    };
  }

  return {
    type: LOGIN_FAIL,
    payload: "Invalid User"
  };
};

export const logout = () => ({ type: LOGOUT });

