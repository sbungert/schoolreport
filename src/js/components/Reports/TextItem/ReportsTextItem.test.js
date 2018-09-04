// @flow

import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReportsTextItem from './ReportsTextItem';
import pupilDefault, { PupilFactory } from '../../../types/pupil';
import textDefault, { TextFactory } from '../../../types/text';

configure({ adapter: new Adapter() });

describe('<ReportsTextItem />', () => {
  const props = {
    activePupil: PupilFactory({...pupilDefault, firstname: 'Dr', lastname: 'Who'}, Date.now(), 'cl1'),
    onClick: jest.fn(),
    onMove: jest.fn(),
    txt: TextFactory({...textDefault, bodytext: 'Red Dwarf', categories: [ 'c1' ] }, Date.now(), 'EN'),
    canDrop: false,
    connectDragSource: jest.fn(),
    connectDropTarget: jest.fn(),
    isDragging: false,
    isOver: false,
  };
  const OriginalReportsTextItem = ReportsTextItem.DecoratedComponent;

  test('Renders without crashing', () => {
    const wrapper = shallow(<ReportsTextItem {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test.skip('isDragging sets the correct class', () => {
    const wrapper = shallow(<ReportsTextItem.DecoratedComponent {...props} isDragging={true} />);
    //expect(wrapper.find('li')).toHaveLength(1);
  });
});