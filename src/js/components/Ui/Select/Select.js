//@flow

import * as React from 'react';
import ReactSelect from 'react-select';
import classNames from 'classnames';
import type { SelectOption } from '../../../types/ui';
import { UI_ERROR_CLASS } from '../../../constants/ui';
import './Select.css';

export type Props = {
  className: string,
  disabled: boolean,
  id?: string,
  isValid: boolean,
  name?: string,
  onChange: (option: any) => void,
  options: SelectOption[],
  title?: string,
  value?: string,
};

class Select extends React.PureComponent<Props> {
  static defaultProps = {
    className: '',
    disabled: false,
    isValid: true,
    options: [],
  };

  props: Props;

  render() {
    const { className, disabled, id, isValid, name, onChange, options, title, value } = this.props;

    return (
      <ReactSelect
        className={classNames('Select', {
          [className]: !!className,
          [UI_ERROR_CLASS]: !isValid,
        })}
        classNamePrefix="Select__"
        disabled={disabled}
        id={id}
        name={name}
        onChange={onChange}
        options={options}
        searchable={options.length > 10}
        title={title}
        value={options.find((opt: SelectOption) => {
          return opt.value === value;
        })}
      />
    );
  }
}

export default Select;
