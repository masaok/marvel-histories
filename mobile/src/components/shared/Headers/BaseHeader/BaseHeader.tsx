/**
 * BaseHeader
 */

import * as React from 'react';

import styles from './BaseHeader.styles';
import { Header, HeaderProps } from 'react-native-elements';

export interface Props extends HeaderProps {}

interface State {}

export default class BaseHeader extends React.Component<Props, State> {
  render() {
    return <Header placement='right' {...this.props} />;
  }
}
