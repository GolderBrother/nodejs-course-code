# cli-progress

ANSI 控制字符，实现了一个命令行的进度条。

它的核心就是 save 上次的光标位置(`cursorSavePosition`)，下次更新进度的时候 `restore` 就好了(`cursorRestorePosition`)。

用 `ansi-escapes` 包的 `saveCursorPosition` 和 `restoreCursorPosition`。

此外还要隐藏光标，用 `cursorHidden、cursorShow` 来控制。

最后，我们用自己写的 `ProgressBar` 结合 `chromium` 的下载实际测了一遍，没啥问题。