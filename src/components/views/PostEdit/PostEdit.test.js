import React from 'react';
import { shallow } from 'enzyme';
import { PostEditComponent } from './PostEdit';

const mockProps = {
  posts: [
    { id: '1', title: 'test', content: 'test' },
    { id: '2', title: 'test2', content: 'test 2' },
  ],
  match: { params: { id: '1' } },
};

describe('Component PostEdit', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostEditComponent {...mockProps} />);
    expect(component).toBeTruthy();
  });
});
