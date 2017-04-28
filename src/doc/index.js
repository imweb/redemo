import * as React from 'react';
import { render } from 'react-dom';
import { Button } from 'antd';
import ReDemo from '../index';
import './index.scss';

const docgen = require('!!docgen-loader!../index');
const propTypes = docgen[0]['props'];

const doc = `
### react component used to demonstrate react component
#### structure
- in top section is demo instance to play 
- circle button in right are toggle for **component propTypes** and **demo source code**
- propTypes table show all prop's info for this component
- in bottom is source code for this demo
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
    title="Redemo demo"
    propTypes={propTypes}
    doc={doc}
    code={code}
    codeVisible
    propTypeVisible
  >
    <Button>demo component instance</Button>
  </ReDemo>
)

render(demo, window.document.getElementById('app'));