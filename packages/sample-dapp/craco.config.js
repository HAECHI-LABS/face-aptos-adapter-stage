const CracoAlias = require('craco-alias');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.ignoreWarnings = [/Failed to parse source map/];
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
      };

      webpackConfig.plugins.push(
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
        })
      );

      // Minify with SWC not Terser
      webpackConfig.optimization.minimizer = webpackConfig.optimization.minimizer.filter(
        (plugin) => plugin.constructor.name !== 'TerserPlugin'
      );
      webpackConfig.optimization.minimizer.push(
        new TerserPlugin({
          minify: TerserPlugin.swcMinify,
          terserOptions: {
            compress: true,
            mangle: true,
          },
        })
      );

      return webpackConfig;
    },
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        tsConfigPath: './tsconfig.json',
      },
    },
  ],
};
