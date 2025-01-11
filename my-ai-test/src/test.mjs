import fs from 'node:fs';

const res = {
  name: 'getCode',
  arguments: '{\n' +
    `  "Table.tsx": "import React from 'react';\\nimport './style.less';\\n\\ninterface User {\\nname: string;\\nage: number;\\nemail: string;\\n}\\n\\ninterface TableProps {\\nusers: User[];\\n}\\n\\nconst Table: React.FC<TableProps> = ({ users }) => {\\nreturn (\\n<div className='table'>\\n<div className='table-row table-header'>\\n<div className='table-cell'>Name</div>\\n<div className='table-cell'>Age</div>\\n<div className='table-cell'>Email</div>\\n</div>\\n{users.map((user, index) => (\\n<div key={index} className='table-row'>\\n<div className='table-cell'>{user.name}</div>\\n<div className='table-cell'>{user.age}</div>\\n<div className='table-cell'>{user.email}</div>\\n</div>\\n))}\\n</div>\\n);\\n};\\n\\nexport default Table;",\n` +
    `  "index.ts": "export { default } from './Table';",\n` +
    '  "style.less": ".table {\\nwidth: 100%;\\ndisplay: flex;\\nflex-direction: column;\\n}\\n\\n.table-header {\\nfont-weight: bold;\\n}\\n\\n.table-row {\\ndisplay: flex;\\n}\\n\\n.table-cell {\\nflex: 1;\\npadding: 10px;\\nborder: 1px solid #ccc;\\n}",\n' +
    '  "types.ts": "export interface User {\\nname: string;\\nage: number;\\nemail: string;\\n}\\n\\nexport interface TableProps {\\nusers: User[];\\n}\\n\\nexport type { TableProps };"\n' +
    '}'
}

const codes = JSON.parse(res.arguments);

fs.mkdirSync('./Table');
fs.writeFileSync('./Table/index.ts', codes['index.ts']);
fs.writeFileSync('./Table/interface.ts', codes['types.ts']);
fs.writeFileSync('./Table/UserTable.tsx', codes['Table.tsx']);
fs.writeFileSync('./Table/style.less', codes['style.less']);