const nextConfig = {
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );
    
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: /\.js$/,
        resourceQuery: { not: /url/ },
        use: ["@svgr/webpack"],
      }
    );
    

    fileLoaderRule.exclude = /\.svg$/i;
    return config;
  },
};
module.exports = nextConfig;
