// @flow

import * as React from 'react';
import classNames from 'classnames';
import getUnhandledProps from './utils/getUnhandledProps';
import prefix, { globalKey } from './utils/prefix';

type Props = {
  classPrefix?: string,
  value: string,
  onSelect?: (value: any, event: SyntheticEvent<*>) => void,
  onKeyDown?: (event: SyntheticKeyboardEvent<*>) => void,
  focus?: boolean,
  title?: string,
  className?: string,
  children?: React.Node,
  renderItem?: (itemValue: string) => React.Node
};

class AutoCompleteItem extends React.Component<Props> {

  static defaultProps = {
    classPrefix: `${globalKey}auto-complete-item`
  };

  handleClick = (event: SyntheticEvent<*>) => {
    const { value, onSelect } = this.props;
    onSelect && onSelect(value, event);
  }

  render() {
    const {
      onKeyDown,
      focus,
      children,
      className,
      classPrefix,
      renderItem,
      value,
      ...rest
    } = this.props;

    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, {
      [addPrefix('focus')]: focus
    });

    const unhandled = getUnhandledProps(AutoCompleteItem, rest);

    return (
      <li
        {...unhandled}
        className={className}
        role="menuitem"
      >
        <a
          className={classes}
          tabIndex={-1}
          role="presentation"
          onKeyDown={onKeyDown}
          onClick={this.handleClick}
        >
          {renderItem ? renderItem(value) : children}
        </a>
      </li>
    );
  }
}

export default AutoCompleteItem;