import React from 'react';
import { shallow } from 'enzyme';
import { HomepageComponent } from './Homepage';

const mockProps = {
  posts: [
    { id: '1', title: 'test', content: 'test' },
    { id: '2', title :'test2', content: 'test 2' },
  ],
  user: {
    id: '1',
    logged: false,
  },
};

describe('Component Homepage', () => {
  it('should render without crashing', () => {
    const component = shallow(<HomepageComponent {...mockProps} />);
    expect(component).toBeTruthy();
  });
});
