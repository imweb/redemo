import * as React from 'react';
import { render } from 'react-dom';

import Button from 'antd/lib/button';
import 'antd/lib/button/style/index.css';

import ReDemo from '../index';
import './index.scss';

const docgen = require('!!docgen-loader!../index');

const doc = `
### react component used to demonstrate react component
- in top section is demo instance to play 
- circle button in right are toggle for **component propTypes** and **demo source code**
- propTypes table show all prop's info for this component
- in bottom is source code for this demo
- red prop name means it's required
`

const code = `
import ReDemo from 'redemo';

<ReDemo
  className="my-demo"
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
    docgen={docgen}
    doc={doc}
    code={code}
    codeVisible
    propTypeVisible
  >
    <Button>demo component instance</Button>
  </ReDemo>
)

render(demo, window.document.getElementById('app'));