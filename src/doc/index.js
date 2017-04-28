import * as React from 'react';
import { render } from 'react-dom';
import { Button } from 'antd';
import ReDemo from '../index';
import './index.scss';

const docgen = require('!!docgen-loader!../index');
const propTypes = docgen[0]['props'];

const doc = `
### 用来展示react组件的组件
#### 功能列表
- 文档：设置 doc 属性描述当前demo，支持markdown语法
- 代码：设置 code 属性展示当前demo源码，支持代码高亮
- 属性列表：设置 propTypes 属性展示当前组件所有属性用法，兼容[react-docgen](https://github.com/reactjs/react-docgen)
`

const code = `
import ReDemo from 'redemo';
<ReDemo
  className="my-demo"
  title="react demo component"
  propTypes={propTypes}
  doc={doc}
  code={code}
>
  <Button>Hello World</Button>
</ReDemo>
`

const demo = (
  <ReDemo
    className="my-demo"
    title="react demo component"
    propTypes={propTypes}
    doc={doc}
    code={code}
  >
    <Button>react component instance</Button>
  </ReDemo>
)

render(demo, window.document.getElementById('app'));