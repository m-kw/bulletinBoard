import React from 'react';
import { shallow } from 'enzyme';
import { PostComponent } from './Post';

const mockProps = {
  posts: [
    { id: '1', title: 'test', content: 'test' },
    { id: '2', title: 'test2', content: 'test 2' },
  ],
  match: { params: { id: '1' }},
};

describe('Component Post', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostComponent {...mockProps} />);
    expect(component).toBeTruthy();
  });
});
