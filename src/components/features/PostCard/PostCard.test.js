import React from 'react';
import { shallow } from 'enzyme';
import { PostCardComponent } from './PostCard';

const mockProps = {
  data: {
    id: '1',
    title: 'test title',
    content: 'text content',
  },
};

describe('Component PostCard', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostCardComponent {...mockProps} />);
    expect(component).toBeTruthy();
  });
});
