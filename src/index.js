require('highlight.js/styles/arduino-light.css')
import React, { Component, PropTypes } from 'react';
import { copyToClipboard, selectElementContents } from './util';
import classnames from 'classnames';
import Highlight from 'react-highlight';
import Markdown from 'react-remarkable';
import 'antd/lib/style/index.css';
import message from 'antd/lib/message';
import 'antd/lib/message/style/index.css';
import Button from 'antd/lib/button';
import Table from 'antd/lib/table';
import 'antd/lib/table/style/index.css';
import './index.scss';

const PropTypesTableColumns = [
  {
    title: 'name',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: 'description',
    dataIndex: 'description',
    key: 'description',
  }, {
    title: 'type',
    dataIndex: 'type',
    key: 'type',
  }, {
    title: 'required',
    dataIndex: 'required',
    key: 'required',
  }, {
    title: 'defaultValue',
    dataIndex: 'defaultValue',
    key: 'defaultValue',
  }
];

export default class Redemo extends Component {

  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    /**
     * 展示demo实例
     */
    children: PropTypes.any,
    /**
     * demo源码
     */
    code: PropTypes.string,
    /**
     * 这个demo的名称
     */
    title: PropTypes.string,
    /**
     * 对demo的说明，支持markdown语法
     */
    doc: PropTypes.string,
    /**
     * 组件的propTypes属性列表，兼容 react-docgen 格式
     */
    propTypes: PropTypes.object,
  }

  static defaultProps = {}

  state = {
    /**
     * 是否显示源码
     */
    codeVisible: false,
    /**
     * 是否显示属性列表
     */
    propTypeVisible: false,
  }

  /**
   * 切换是否显示源代码
   */
  toggleCode = () => {
    this.setState({
      codeVisible: !this.state.codeVisible
    })
  }

  /**
   * 切换是否显示属性列表
   */
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
      const dataSource = [];
      Object.keys(propTypes).forEach(propName => {
        const propInfo = propTypes[propName] || {};
        const one = {
          key: propName,
          name: propName,
          description: propInfo.description,
          type: (propInfo.type || {}).name,
          required: propInfo.required,
          defaultValue: (propInfo.defaultValue || {}).value,
        }
        dataSource.push(one);
      })
      return (
        <Table
          className="re-demo-proptypes"
          columns={PropTypesTableColumns}
          dataSource={dataSource}
          pagination={false}
          size="small"
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
              title="propTypes"
              onClick={this.togglePropTypes}
            /> : null}
            {code ? <Button
              type={codeVisible ? 'primary' : ''}
              shape="circle"
              icon="code-o"
              size="small"
              title="code"
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