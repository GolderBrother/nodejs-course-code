import fs from 'node:fs';

const res = {
  name: 'getCode',
  arguments: '{\n' +
    `  "Table.tsx": "import { defineComponent } from 'vue'\\n\\nexport default defineComponent({\\n  name: 'Table',\\n  props: ['data'],\\n  setup(props) {\\n    return () => (\\n      <div class='table'>\\n        {props.data.map((item) => (\\n          <div class='row'>\\n            <div class='col'>{item.name}</div>\\n            <div class='col'>{item.age}</div>\\n            <div class='col'>{item.email}</div>\\n          </div>\\n        ))}\\n      </div>\\n    )\\n  },\\n})\\n",\n` +
    `  "index.ts": "import withInstall from 'tdesign-vue-next/lib/utils/withInstall'\\nimport _Table from './Table'\\n\\nimport './style'\\n\\nexport const Table = withInstall(_Table)\\nexport default Table",\n` +
    '  "style.less": ".table {\\n  display: flex;\\n  flex-direction: column;\\n  width: 100%;\\n}\\n\\n.row {\\n  display: flex;\\n  justify-content: space-between;\\n  padding: 10px;\\n  border-bottom: 1px solid #ddd;\\n}\\n\\n.col {\\n  flex: 1;\\n  text-align: center;\\n}",\n' +
    '  "types.ts": "type TableProps = { data: Array<{name: string; age: number; email: string;}> }\\nexport type { TableProps };\\n"\n' +
    '}'
}

const codes = JSON.parse(res.arguments);

fs.mkdirSync('./Table');
fs.writeFileSync('./Table/index.ts', codes['index.ts']);
fs.writeFileSync('./Table/types.ts', codes['types.ts']);
fs.writeFileSync('./Table/Table.tsx', codes['Table.tsx']);
fs.writeFileSync('./Table/style.less', codes['style.less']);