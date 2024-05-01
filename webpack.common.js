const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: {
    app: path.resolve(__dirname, "src/scripts/index.js"),
    detail: path.resolve(__dirname, "src/scripts/detail.js"),
    favorites: path.resolve(__dirname, "src/scripts/favorites.js"),
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
    splitChunks: {
      chunks: "all",
      minSize: 20000,
      maxSize: 70000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: "~",
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          process.env.NODE_ENV !== "production"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                outputStyle: "compressed",
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "src/templates/index.html"),
      chunks: ["app"],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/templates/detail.html"),
      filename: "detail.html",
      chunks: ["detail"],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/templates/favorites.html"),
      filename: "favorites.html",
      chunks: ["favorites"],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/public"),
          to: path.resolve(__dirname, "dist"),
        },
      ],
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: new RegExp("https://restaurant-api.dicoding.dev"),
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "api-cache",
            expiration: {
              maxEntries: 100,
            },
          },
        },
        {
          urlPattern: new RegExp("https://restaurant-api.dicoding.dev/detail"),
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "restaurant-detail-cache",
            expiration: {
              maxEntries: 50,
            },
          },
        },
        {
          urlPattern: /\.(?:js|css|scss|html)$/,
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "static-resources",
          },
        },
        {
          urlPattern: new RegExp("detail.html"),
          handler: "NetworkFirst",
          options: {
            cacheName: "detail-page-cache",
            expiration: {
              maxEntries: 5,
            },
          },
        },
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
          handler: "CacheFirst",
          options: {
            cacheName: "images-cache",
            expiration: {
              maxEntries: 50,
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    }),
    new WebpackPwaManifest({
      name: "SavorSpot",
      short_name: "SavorSpot",
      description: "Discover Great Dining Experience",
      background_color: "transparent",
      theme_color: "#ffffff",
      crossorigin: "use-credentials",
      publicPath: "./",
      icons: [
        {
          src: path.resolve(__dirname, "src/public/images/icon/restaurant.png"),
          sizes: [48, 72, 96, 144, 192, 256, 384, 512],
        },
        {
          src: path.resolve(__dirname, "src/public/images/icon/restaurant.png"),
          size: "1024x1024",
        },
        {
          src: path.resolve(__dirname, "src/public/images/icon/restaurant.png"),
          size: "1024x1024",
          purpose: "maskable",
        },
      ],
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false,
    }),
    new ImageminWebpWebpackPlugin({
      config: [
        {
          test: /\.(jpe?g|png)/,
          options: {
            quality: 70,
          },
        },
      ],
      overrideExtension: true,
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
};
