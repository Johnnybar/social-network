import React from 'react';

export default function Logout() {
  return (<form action='/logOut' method='post'>
    <button id='log-out-btn' type='submit'>
      Log Out
    </button>
  </form>)

}
