import React from 'react';
import { shallow } from 'enzyme';
import { NavBarComponent } from './NavBar';

describe('Component NavBar', () => {
  it('should render without crashing', () => {
    const component = shallow(<NavBarComponent />);
    expect(component).toBeTruthy();
  });
});
