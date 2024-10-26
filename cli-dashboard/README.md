# 手写 cli 系统监控仪表盘

用前面学的 blessed、blessed-contrib 来实现了 cli 里的系统监控仪表盘。

布局用的 Grid 组件，折线图、环形进度条、Table 等都是 blessed-contrib 的组件。

要注意的就是图表不断右移的效果是在每次重新渲染的时候，在前面 shift 一个元素，在后面 push 一个元素，这样就达到了不断右移的效果。很多你看到的图表都是这么做的。

当你需要在 cli 里展示仪表盘的时候，就可以用 blessed-contrib 来做。