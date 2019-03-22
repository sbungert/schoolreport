//@flow

import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import NavButtonCircular from './NavButtonCircular';
import type { Props } from './NavButtonCircular';

describe('<NavButtonCircular />', () => {
  const props: Props = { action: 'test', className: '', to: '/classes' };

  test('Renders without crashing', () => {
    const wrapper = shallow(
      <MemoryRouter>
        <NavButtonCircular {...props} />
      </MemoryRouter>
    );
    expect(wrapper).toHaveLength(1);
  });

  test('Handles className property', () => {
    const cn1Wrapper = mount(
      <MemoryRouter>
        <NavButtonCircular {...props} to="/classes" />
      </MemoryRouter>
    );
    const cn2Wrapper = mount(
      <MemoryRouter>
        <NavButtonCircular {...props} className="/TestClass" to="/classes" />
      </MemoryRouter>
    );

    expect(cn1Wrapper.find('a').hasClass('TestClass')).toEqual(false);
    expect(cn2Wrapper.find('a').hasClass('TestClass')).toEqual(true);
  });
});
