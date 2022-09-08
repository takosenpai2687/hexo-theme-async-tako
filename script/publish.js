const fs = require('fs')
const path = require('path')

if (process.env.RELEASE_VERSION) {
    const version = process.env.RELEASE_VERSION.replace(/[Vv]/g, '')
    console.log('当前版本：', version);
    const pkg = require('../package/hexo-theme-async/package.json')
    pkg.version = version
    fs.writeFileSync(path.resolve('../package/hexo-theme-async/package.json'), JSON.stringify(pkg, null, 4), 'utf-8')
}
