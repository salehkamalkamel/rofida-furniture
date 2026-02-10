/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.rofida-furniture.com",
  generateRobotsTxt: true,
  sitemapSize: 5000,

  exclude: ["/account/*", "/api/*", "/_not-found", "/dashboard/*"],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/account", "/api", "/dashboard"],
      },
    ],
  },
};
