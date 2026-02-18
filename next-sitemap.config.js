/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://rofida-furniture.com",
  generateRobotsTxt: true,
  trailingSlash: false,
  sitemapSize: 5000,
  changefreq: "weekly",
  priority: 0.7,

  exclude: [
    "/auth/*",
    "/forbidden",

    "/account/*",
    "/api/*",
    "/_not-found",
    "/dashboard/*",
  ],

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
