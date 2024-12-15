const blessed = require("blessed");
const contrib = require("blessed-contrib");

const screen = blessed.screen({
    fullUnicode: true,
});

const tree = contrib.tree({ fg: "green" });

//allow control the table with the keyboard
tree.focus();

// 选中的时候会触发 select 事件，传入节点信息
tree.on("select", (node) => {
    if (node.myCustomProperty) console.log(node.myCustomProperty);
    console.log(node.name);
});

// tree.setData({
//   extended: true,
//   children: {
//     Fruit: {
//       children: {
//         Banana: {},
//         Apple: {},
//         Cherry: {},
//         Exotics: {
//           children: {
//             Mango: {},
//             Papaya: {},
//             Kiwi: {
//               name: "Kiwi (not the bird!)",
//               myCustomProperty: "hairy fruit",
//             },
//           },
//         },
//         Pear: {},
//       },
//     },
//     Vegetables: { children: { Peas: {}, Lettuce: {}, Pepper: {} } },
//   },
// });

tree.setData({
    extended: true,
    children: {
        src: {
            children:
            {
                'aaa.ts': {},
                'bbb.ts': {},
                'ccc.ts': {},
                components: {
                    children: {
                        'xxx.tsx': {},
                        'yyy.tsx': {},
                        'zzz.tsx': {
                            name: 'zzz.tsx',
                            myCustomProperty: "自定义属性"
                        }
                    }
                }
            }
        },
        dist: {
            children: {
                'aaa.png': {},
                'bbb.js': {},
                'ccc.js': {}
            }
        }
    }
})

screen.append(tree);

screen.key(["escape", "C-c", "q"], () => {
    screen.destroy();
});

screen.render();
