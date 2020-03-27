import React from 'react';
import { shallow } from 'enzyme';
import { UserPostsComponent } from './UserPosts';

const mockProps = {
  posts: [
    { id: '1', title: 'test', content: 'test' },
    { id: '2', title: 'test2', content: 'test 2' },
  ],
  user: {
    id: '1',
    logged: false,
  },
};

describe('Component UserPosts', () => {
  it('should render without crashing', () => {
    const component = shallow(<UserPostsComponent {...mockProps} />);
    expect(component).toBeTruthy();
  });
});
