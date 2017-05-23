import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Remarkable from 'remarkable';

/**
 * React markdown component base on remarkable
 */
export class Remd extends Component {

  static propTypes = {
    /**
     * append className to Redemo
     */
    className: PropTypes.string,
    /**
     * set style for Redemo
     */
    style: PropTypes.object,
    /**
     * options pass to remarkable's constructor
     */
    remarkableOptions: PropTypes.object,
    /**
     * markdown source
     */
    children: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    const { remarkableOptions, children } = this.props;
    const mdRender = new Remarkable(remarkableOptions);
    this.mdRender = mdRender;
    this.state = {
      mdHTML: mdRender.render(children),
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { mdHTML } = this.state;
    const { className, style } = this.props;
    return nextState.mdHTML !== mdHTML || nextProps.className !== className || nextProps.style !== style;
  }

  componentWillReceiveProps(nextProps) {
    const { remarkableOptions, children } = this.props;
    if (nextProps.remarkableOptions !== remarkableOptions) {
      this.mdRender = new Remarkable(nextProps.remarkableOptions);
    }
    if (nextProps.remarkableOptions !== remarkableOptions || nextProps.children !== children) {
      this.setState({
        mdHTML: this.mdRender.render(nextProps.children)
      });
    }
  }

  render() {
    const { className, style } = this.props;
    const { mdHTML } = this.state;
    return (
      <div className={className} style={style} dangerouslySetInnerHTML={{ __html: mdHTML }}/>
    )
  }
}