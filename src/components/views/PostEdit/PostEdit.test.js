import React from 'react';
import { shallow } from 'enzyme';
import { PostEditComponent } from './PostEdit';

const mockProps = {
  post: { _id: '1', title: 'test', content: 'test' },
};

describe('Component PostEdit', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostEditComponent {...mockProps} />);
    expect(component).toBeTruthy();
  });
});
