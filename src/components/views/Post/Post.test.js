import React from 'react';
import { shallow } from 'enzyme';
import { PostComponent } from './Post';

const mockProps = {
  post:
    { id: '1', title: 'test', content: 'test' },
  match: { params: { id: '1' }},
  user: {
    id: '1',
    logged: false,
  },
};

describe('Component Post', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostComponent {...mockProps} />);
    expect(component).toBeTruthy();
  });
});
