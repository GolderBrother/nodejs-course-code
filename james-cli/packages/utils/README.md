# @james-cli/utils

我们创建了 utils 包，封装了 versionUtils、NpmPakcage。

versionUtils 是用来获取 npm 包的版本号的，通过 resitry + 包名 的 url 返回的 json 里的 dist-tags、versions 等获取版本号。

NpmPackage 封装了 npminstall 的安装逻辑，实现了 install、update、exists、getPackageJSON 等方法。

之后通过 changeset 把它发布到了 npm 仓库。