import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Highlight from 'react-highlight';
import 'highlight.js/styles/arduino-light.css';
import Markdown from 'react-remarkable';
import 'antd/lib/style/index.css';
import message from 'antd/lib/message';
import 'antd/lib/message/style/index.css';
import Button from 'antd/lib/button';
import Table from 'antd/lib/table';
import 'antd/lib/table/style/index.css';
import Tag from 'antd/lib/tag';
import 'antd/lib/tag/style/index.css';
import Tooltip from 'antd/lib/tooltip';
import 'antd/lib/tooltip/style/index.css';
import './index.scss';

/**
 * react component used to demonstrate react component
 */
export default class Redemo extends Component {

  static propTypes = {
    /**
     * component instance
     */
    children: PropTypes.any.isRequired,
    /**
     * this demo's name
     */
    title: PropTypes.any.isRequired,
    /**
     * demo source code
     * - if it's void will not display
     */
    code: PropTypes.string,
    /**
     * explanation to this demo
     * - support markdown
     * - if it's void will not display
     */
    doc: PropTypes.string,
    /**
     * component's propTypes prop，load from [react-docgen](https://github.com/reactjs/react-docgen)
     * - support markdown
     * - if it's void will not display
     */
    propTypes: PropTypes.object,
    /**
     * whether show source code
     */
    codeVisible: PropTypes.bool,
    /**
     * whether show propTypes
     */
    propTypeVisible: PropTypes.bool,
    /**
     * append className to Redemo
     */
    className: PropTypes.string,
    /**
     * set style for Redemo
     */
    style: PropTypes.object,
  }

  static defaultProps = {
    codeVisible: false,
    propTypeVisible: false,
  }

  static propTypesTableColumns = [
    {
      title: 'name',
      key: 'name',
      render: (_, record) => {
        const { propName, required } = record;
        return (
          <span className={classnames({ 're-demo-proptypes-required': required })}
                title={required ? 'required prop' : null}>{propName}</span>
        )
      }
    }, {
      title: 'type',
      key: 'type',
      render: (_, record) => {
        const { type } = record;
        return (
          <PropTypeValueTag type={type}/>
        )
      }
    }, {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
      render: (_, record) => {
        const { description } = record;
        if (typeof description === 'string' && description.length > 0) {
          return <Markdown>{description}</Markdown>;
        }
        return '-';
      }
    }, {
      title: 'defaultValue',
      dataIndex: 'defaultValue',
      key: 'defaultValue',
      render: (_, record) => {
        const { defaultValue, type } = record;
        let { value } = defaultValue || {};
        if (value === undefined) {
          return '-';
        }
        if (['object', 'shape'].indexOf(type.name) >= 0) {
          return (
            <Tooltip placement="right" overlayClassName="redemo-prop-type-tag-tooltip" title={
              <ObjectView object={value}/>
            }>
              <Tag color="blue">object</Tag>
            </Tooltip>
          )
        }
        return value;
      }
    }
  ];

  state = {
    /**
     * whether show source code
     */
    codeVisible: this.props.codeVisible,
    /**
     * whether show propTypes
     */
    propTypeVisible: this.props.propTypeVisible,
  }

  componentWillReceiveProps(nextProps) {
    const { codeVisible, propTypeVisible } = this.props;
    if (nextProps.codeVisible !== codeVisible) {
      this.toggleCode();
    }
    if (nextProps.propTypeVisible !== propTypeVisible) {
      this.togglePropTypes();
    }
  }

  toggleCode = () => {
    this.setState({
      codeVisible: !this.state.codeVisible
    })
  }

  togglePropTypes = () => {
    this.setState({
      propTypeVisible: !this.state.propTypeVisible
    })
  }

  copyCode = () => {
    const { code } = this.props;
    try {
      copyToClipboard(code);
      message.success('copy successful');
    } catch (err) {
      message.error(`copy failed, you browser don't support copy`);
      selectElementContents(this.refs['code']);
    }
  }

  renderPropTypeTable = () => {
    const { propTypes } = this.props;
    const { propTypeVisible } = this.state;
    if (propTypes && propTypeVisible) {
      const dataSource = Object.keys(propTypes).map(propName => Object.assign({ propName }, propTypes[propName]));
      return (
        <Table
          rowKey="propName"
          className="re-demo-proptypes"
          columns={Redemo.propTypesTableColumns}
          dataSource={dataSource}
          pagination={false}
          size="small"
          locale={{}}
        />
      )
    }
    return null;
  }

  renderCode = () => {
    const { code } = this.props;
    const { codeVisible } = this.state;
    if (code && codeVisible) {
      return (
        <div ref="code" className="re-demo-code" style={{ display: codeVisible ? '' : 'none' }}>
          <Button
            className="re-demo-code-copy"
            shape="circle"
            icon="copy"
            size="small"
            title="copy code"
            onClick={this.copyCode}
          />
          <Highlight>{code}</Highlight>
        </div>
      )
    }
    return null;
  }

  render() {
    const { className, style, children, code, title, doc, propTypes } = this.props;
    const { propTypeVisible, codeVisible } = this.state;
    return (
      <div className={classnames('re-demo', className)} style={style}>
        <div className="re-demo-run">{children}</div>
        <div className="re-demo-md">
          <span className="re-demo-md-title">{title}</span>
          <span className="re-demo-md-toolbar">
            {propTypes ? <Button
              type={propTypeVisible ? 'primary' : ''}
              shape="circle"
              icon="exception"
              size="small"
              title="component prop types"
              onClick={this.togglePropTypes}
            /> : null}
            {code ? <Button
              type={codeVisible ? 'primary' : ''}
              shape="circle"
              icon="code-o"
              size="small"
              title="demo source code"
              onClick={this.toggleCode}
            /> : null}
          </span>
          <Markdown>{doc}</Markdown>
        </div>
        {this.renderPropTypeTable()}
        {this.renderCode()}
      </div>
    )
  }
}

class PropTypeValueTag extends Component {

  static propTypes = {
    type: PropTypes.object
  }

  static defaultProps = {
    type: {}
  }

  render() {
    const { type } = this.props;
    const { name, value } = type;
    if (value !== undefined) {
      return (
        <Tooltip placement="right" overlayClassName="redemo-prop-type-tag-tooltip" title={
          <ObjectView object={value}/>
        }>
          <Tag color="blue">{name}</Tag>
        </Tooltip>
      )
    } else {
      return <Tag style={{ cursor: 'default' }}>{name}</Tag>
    }
  }
}

class ObjectView extends Component {
  static propTypes = {
    object: PropTypes.any
  }

  static defaultProps = {
    object: {}
  }

  render() {
    const { object } = this.props;
    let code = object;
    if (typeof object === 'object') {
      code = JSON.stringify(code, null, 4);
    }
    return (
      <Highlight>{code}</Highlight>
    )
  }
}

/**
 * Copies a string to the clipboard. Must be called from within an
 * event handler such as click. May return false if it failed, but
 * this is not always possible. Browser support for Chrome 43+,
 * Firefox 42+, Safari 10+, Edge and IE 10+.
 * IE: The clipboard feature may be disabled by an administrator. By
 * default a prompt is shown the first time the clipboard is
 * used (per session).
 * @param text
 * @returns {boolean}
 */
function copyToClipboard(text) {
  if (window.clipboardData && window.clipboardData.setData) {
    // IE specific code path to prevent textarea being shown while dialog is visible.
    return clipboardData.setData('Text', text);

  } else { //noinspection JSUnresolvedVariable,JSUnresolvedFunction
    if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
      let textarea = document.createElement('textarea');
      textarea.textContent = text;
      textarea.style.position = 'fixed';  // Prevent scrolling to bottom of page in MS Edge.
      document.body.appendChild(textarea);
      textarea.select();
      try {
        return document.execCommand('copy');  // Security exception may be thrown by some browsers.
      } catch (err) {
        throw err;
      } finally {
        document.body.removeChild(textarea);
      }
    }
  }
}

/**
 * If you want to select all the content of an element (contenteditable or not) in Chrome, here's how.
 * This will also work in Firefox, Safari 3+, Opera 9+ (possibly earlier versions too) and IE 9.
 * You can also create selections down to the character level.
 * The APIs you need are DOM Range (current spec is DOM Level 2, see also MDN) and Selection,
 * which is being specified as part of a new Range spec (MDN docs).
 * @param el
 * http://stackoverflow.com/questions/6139107/programmatically-select-text-in-a-contenteditable-html-element
 */
function selectElementContents(el) {
  let range = document.createRange();
  range.selectNodeContents(el);
  let sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}