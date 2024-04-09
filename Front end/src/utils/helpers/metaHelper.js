export const setMetaData = (response, location) => {
  if (!response?.result) return; // Early exit if response or result is not available

  const updateMetaTag = (selector, attribute, content) => {
    const element = document.querySelector(selector);
    if (element && content) {
      element.setAttribute(attribute, content);
    }
  };

  const defaultTitle =
    (response?.result?.data[0]?.judul || "Hijaukan Bumi") +
    " - Bersama Lawan Hoax, Wujudkan Dunia yang Ramah Lingkungan";
  const { hostname } = window.location;

  if (location.pathname === "/") {
    document.title = defaultTitle;
    updateMetaTag('meta[name="title"]', "content", defaultTitle);
    updateMetaTag(
      'meta[name="description"]',
      "content",
      response?.result?.data[0]?.deskripsi_footer
    );
    updateMetaTag(
      'meta[name="keywords"]',
      "content",
      response?.result?.data[0]?.meta_keyword
    );
  } else if (
    location.pathname.includes("/beli/") ||
    location.pathname.includes("/blog")
  ) {
    // You can add more logic here if necessary
  } else {
    const judulHalaman = location.pathname
      .replace("/", "")
      .split("/")
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
      .join(" ");

    const pageTitle = response?.result?.data[0]?.judul + " - " + judulHalaman;
    document.title = pageTitle;
    updateMetaTag('meta[name="title"]', "content", pageTitle);
    updateMetaTag(
      'meta[name="description"]',
      "content",
      response?.result?.data[0]?.deskripsi_footer
    );
    updateMetaTag(
      'meta[name="keywords"]',
      "content",
      response?.result?.data[0]?.meta_keyword
    );
  }

  // Common meta tag updates
  updateMetaTag(
    'meta[name="author"]',
    "content",
    response?.result?.data[0]?.judul
  );

  const commonMetaUpdates = [
    ['meta[property="og:url"]', hostname],
    ['meta[property="og:title"]', response?.result?.data[0]?.judul],
    ['meta[property="og:description"]', response.result.deskripsi_singkat],
    ['meta[property="og:image"]', response.result.meta_image],
    ['meta[property="twitter:url"]', hostname],
    ['meta[property="twitter:title"]', response?.result?.data[0]?.judul],
    ['meta[property="twitter:description"]', response.result.deskripsi_singkat],
    ['meta[property="twitter:image"]', response.result.meta_image],
  ];

  commonMetaUpdates.forEach(([selector, content]) => {
    updateMetaTag(selector, "content", content);
  });

  const updateLinkHref = (selector, href) => {
    const element = document.querySelector(selector);
    if (element && href) {
      element.href = href;
    }
  };
};
