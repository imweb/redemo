[![Npm Package](https://img.shields.io/npm/v/redemo.svg?style=flat-square)](https://www.npmjs.com/package/redemo)
[![Npm Downloads](http://img.shields.io/npm/dm/redemo.svg?style=flat-square)](https://www.npmjs.com/package/redemo)
[![Dependency Status](https://david-dm.org/gwuhaolin/redemo.svg?style=flat-square)](https://npmjs.org/package/redemo)

# react demo component
When you write a react component, you may need tell others how to use it by write some demos.
Redemo is used to help write demo for react component in a easy way, is't pretty and simple to use.

## install
```bash
npm i redemo
```
## feature
- doc: write doc in markdown for this demo
- code: show source code for this demo
- propTypes: auto list react component `propTypes` document form comment in your component source instead of write by yourself

## example
Let's write a demo for a `Button` component write by you

```js
import ReDemo from 'redemo';
import Button from './button';

// load propTypes by docgen-loader from button component source code
const docgen = require('!!docgen-loader!../button');
const propTypes = docgen[0]['props'];

// load source code by raw-loader from button component source code
const code = require('!!raw-loader!../button');

// write doc for this demo in markdown
const doc = `
### 用来展示react组件的组件
#### 功能列表
- 文档：设置 doc 属性描述当前demo，支持markdown语法
- 代码：设置 code 属性展示当前demo源码，支持代码高亮
- 属性列表：设置 propTypes 属性展示当前组件所有属性用法，兼容[react-docgen](https://github.com/reactjs/react-docgen)
`

<ReDemo
  className="my-demo"
  title="react demo component"
  propTypes={propTypes}
  doc={doc}
  code={code}
  defaultCodeVisible
  defaultPropTypeVisible
>
  <Button>demo component instance</Button>
</ReDemo>
```

## API
see `ReDemo`'s all props [here](https://gwuhaolin.github.io/redemo/)