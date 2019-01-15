import React from 'react';
import { shallow } from 'enzyme';
import pageBrowserPropsDefault from '../../../types/pageBrowser';
import PageBrowser, { PbBut, PbMore } from './PageBrowser';

describe('<PageBrowser />', () => {
  const props = { ...pageBrowserPropsDefault };

  test('Renders without crashing', () => {
    const wrapper = shallow(<PageBrowser {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test('Renders null if no items', () => {
    const wrapper = shallow(<PageBrowser {...props} itemCount={0} />);
    expect(wrapper.get(0)).toBeFalsy();
  });

  test('Handles the className property correctly', () => {
    const wrapper = shallow(<PageBrowser {...props} className="testclass" />);
    expect(wrapper.find('.testclass')).toHaveLength(1);
  });

  describe('renderLeft()', () => {
    const wrapper = shallow(<PageBrowser {...props} />);
    const instance = wrapper.instance();

    test('Returns null if first and prev are "false"', () => {
      expect(instance.renderLeft(false, false, 1)).toBeNull();
    });

    test('Renders a component if first is "true"', () => {
      const result = shallow(instance.renderLeft(true, false, 1));
      expect(result).toHaveLength(1);
      expect(result.find(PbBut)).toHaveLength(1);
    });

    test('Renders a component if prev is "true"', () => {
      const result = shallow(instance.renderLeft(false, true, 1));
      expect(result).toHaveLength(1);
      expect(result.find(PbBut)).toHaveLength(1);
    });

    test('Renders a component with 2 PbBut components if first and prev are "true"', () => {
      const result = shallow(instance.renderLeft(true, true, 1));
      expect(result).toHaveLength(1);
      expect(result.find(PbBut)).toHaveLength(2);
    });
  });

  describe('renderRight()', () => {
    const wrapper = shallow(<PageBrowser {...props} />);
    const instance = wrapper.instance();

    test('Returns null if next and last are "false"', () => {
      expect(instance.renderRight(false, false, 1, 3, 10)).toBeNull();
    });

    test('Renders a component if next is "true"', () => {
      const result = shallow(instance.renderRight(true, false, 1, 3, 10));
      expect(result).toHaveLength(1);
      expect(result.find(PbBut)).toHaveLength(1);
    });

    test('Renders a component if last is "true"', () => {
      const result = shallow(instance.renderRight(false, true, 1, 3, 10));
      expect(result).toHaveLength(1);
      expect(result.find(PbBut)).toHaveLength(1);
    });

    test('Renders a component with 2 PbBut components if next and last are "true"', () => {
      const result = shallow(instance.renderRight(true, true, 1, 3, 10));
      expect(result).toHaveLength(1);
      expect(result.find(PbBut)).toHaveLength(2);
    });
  });

  describe('renderCentre()', () => {
    const wrapper = shallow(<PageBrowser {...props} />);
    const instance = wrapper.instance();

    test('Renders and element', () => {
      const result = shallow(instance.renderCentre(1, 3, 5, 100));
      expect(result).toHaveLength(1);
    });
  });

  describe('handleClick()', () => {
    const handleClickProps = { ...props, itemCount: 60 };

    test('Calls onChange with the correct value for "first"', () => {
      const mockOnChange = jest.fn();
      const wrapper = shallow(<PageBrowser {...handleClickProps} onChange={mockOnChange} />);
      const instance = wrapper.instance();
      instance.handleClick({ currentTarget: { dataset: { action: 'first' } } });
      expect(mockOnChange).toHaveBeenCalledTimes(1);
      expect(mockOnChange).toHaveBeenCalledWith(1);
    });

    test('Calls onChange with the correct value for "prev" if curPage = 1', () => {
      const mockOnChange = jest.fn();
      const wrapper = shallow(<PageBrowser {...handleClickProps} onChange={mockOnChange} />);
      const instance = wrapper.instance();
      instance.handleClick({ currentTarget: { dataset: { action: 'prev' } } });
      expect(mockOnChange).toHaveBeenCalledTimes(1);
      expect(mockOnChange).toHaveBeenCalledWith(1);
    });

    test('Calls onChange with the correct value for "prev" if curPage = 3', () => {
      const mockOnChange = jest.fn();
      const wrapper = shallow(<PageBrowser {...handleClickProps} curPage={3} onChange={mockOnChange} />);
      const instance = wrapper.instance();
      instance.handleClick({ currentTarget: { dataset: { action: 'prev' } } });
      expect(mockOnChange).toHaveBeenCalledTimes(1);
      expect(mockOnChange).toHaveBeenCalledWith(2);
    });

    test('Calls onChange with the correct value for "next" if curPage = totalPages', () => {
      const mockOnChange = jest.fn();
      const wrapper = shallow(<PageBrowser {...handleClickProps} curPage={3} onChange={mockOnChange} />);
      const instance = wrapper.instance();
      instance.handleClick({ currentTarget: { dataset: { action: 'next' } } });
      expect(mockOnChange).toHaveBeenCalledTimes(1);
      expect(mockOnChange).toHaveBeenCalledWith(3);
    });

    test('Calls onChange with the correct value for "next" if curPage < totalPages', () => {
      const mockOnChange = jest.fn();
      const wrapper = shallow(<PageBrowser {...handleClickProps} curPage={1} onChange={mockOnChange} />);
      const instance = wrapper.instance();
      instance.handleClick({ currentTarget: { dataset: { action: 'next' } } });
      expect(mockOnChange).toHaveBeenCalledTimes(1);
      expect(mockOnChange).toHaveBeenCalledWith(2);
    });

    test('Calls onChange with the correct value for "last"', () => {
      const mockOnChange = jest.fn();
      const wrapper = shallow(<PageBrowser {...handleClickProps} curPage={1} onChange={mockOnChange} />);
      const instance = wrapper.instance();
      instance.handleClick({ currentTarget: { dataset: { action: 'last' } } });
      expect(mockOnChange).toHaveBeenCalledTimes(1);
      expect(mockOnChange).toHaveBeenCalledWith(3);
    });

    test('Calls onChange with the correct value for a page', () => {
      const mockOnChange = jest.fn();
      const wrapper = shallow(<PageBrowser {...handleClickProps} curPage={3} onChange={mockOnChange} />);
      const instance = wrapper.instance();
      instance.handleClick({ currentTarget: { dataset: { action: '2' } } });
      expect(mockOnChange).toHaveBeenCalledTimes(1);
      expect(mockOnChange).toHaveBeenCalledWith(2);
    });
  });
});

describe('PbBut():', () => {
  const props = {
    disabled: false,
    label: '1',
    page: false,
    selected: false,
    title: '1',
    onClick: jest.fn(),
    type: '1',
  };

  test('Renders a PbBut SFC', () => {
    const wrapper = shallow(<PbBut {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  describe('page property:', () => {
    test('Renders without page class if "false"', () => {
      const wrapper = shallow(<PbBut {...props} />);
      expect(wrapper.find('.PageBrowser__btn--page')).toHaveLength(0);
    });

    test('Renders with page class if "true"', () => {
      const wrapper = shallow(<PbBut {...props} page />);
      expect(wrapper.find('.PageBrowser__btn--page')).toHaveLength(1);
    });
  });

  describe('selected property:', () => {
    test('Renders without selected class if "false"', () => {
      const wrapper = shallow(<PbBut {...props} />);
      expect(wrapper.find('.PageBrowser__btn--selected')).toHaveLength(0);
    });

    test('Renders with page selected if "true"', () => {
      const wrapper = shallow(<PbBut {...props} selected />);
      expect(wrapper.find('.PageBrowser__btn--selected')).toHaveLength(1);
    });
  });
});

describe('PbMore():', () => {
  test('Renders a PbMore SFC', () => {
    const wrapper = shallow(<PbMore hidden={false} />);
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('.PageBrowser__more--hidden')).toHaveLength(0);
  });

  test('Renders a hidden PbMore SFC', () => {
    const wrapper = shallow(<PbMore hidden={true} />);
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('.PageBrowser__more--hidden')).toHaveLength(1);
  });
});
