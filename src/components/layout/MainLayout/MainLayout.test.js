import React from 'react';
import { shallow } from 'enzyme';
import { MainLayoutComponent } from './MainLayout';

const mockProps = {
  fetchPublished: () => console.log('fetch'),
};

describe('Component MainLayout', () => {
  it('should render without crashing', () => {
    const component = shallow(<MainLayoutComponent {...mockProps} />);
    expect(component).toBeTruthy();
  });
});
