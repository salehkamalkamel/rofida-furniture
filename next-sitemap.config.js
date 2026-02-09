/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://rofida-furniture.vercel.app",
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
