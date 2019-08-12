import React from 'react';
import Profile from './profile';
import renderer from 'react-test-renderer';
import './profile.css'

const handleLogout = function() {
  console.log('gdgsdg');
};
const user = {
    "username":"freja.bear@netent.com",
    "role":"netentinternal"
};

test('should match snapshot with hidden options', () => {
  const component = renderer.create(
    <Profile user={user} onLogout={handleLogout()} />
  );
  const selectBox = component.root.findAll(
    element => element.props.className === 'ne-s-logout-btn'
  );
  expect(component.toJSON()).toMatchSnapshot();
  expect(selectBox).toHaveLength(1);
});
