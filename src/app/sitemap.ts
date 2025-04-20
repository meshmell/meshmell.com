const sitemap = () => {
  const staticRoutes = [
    {
      url: "https://www.yurimell.com",
      lastModified: new Date().toISOString(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://www.yurimell.com/en",
      lastModified: new Date().toISOString(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://www.yurimell.com/ja",
      lastModified: new Date().toISOString(),
      changeFrequency: "yearly",
      priority: 1,
    },
  ];

  return [...staticRoutes];
};

export default sitemap;
