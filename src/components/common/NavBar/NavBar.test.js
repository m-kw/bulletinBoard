import React from 'react';
import { shallow } from 'enzyme';
import { NavBarComponent } from './NavBar';

const mockProps = {
  user: {
    id: '1',
    logged: false,
  },
};

describe('Component NavBar', () => {
  it('should render without crashing', () => {
    const component = shallow(<NavBarComponent {...mockProps} />);
    expect(component).toBeTruthy();
  });
});
