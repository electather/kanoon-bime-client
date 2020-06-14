const {
  override,
  fixBabelImports,
  useBabelRc,
  addWebpackAlias,
} = require('customize-cra');

module.exports = override(
  useBabelRc(),
  addWebpackAlias({ moment: 'antd-jalali-moment' }),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
);
