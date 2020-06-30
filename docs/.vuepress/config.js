module.exports = {
  base: "/genesis-docs-en/",
  title: "Vue Genesis",
  description:
    "Vue SSR-based micro frontend, micro service, and lightweight solution",
  themeConfig: {
    repo: "fmfe/genesis",
    repoLabel: "Github",
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide/" },
      {
        text: "Core library",
        items: [
          { text: "genesis-core", link: "/core/" },
          { text: "genesis-compiler", link: "/compiler/" },
          { text: "genesis-app", link: "/app/" },
          { text: "genesis-remote", link: "/remote/" },
        ],
      },
      { text: "Official blog", link: "/blog/followme5.0" },
      {
        text: "Languages",
        items: [
          { text: "English", link: "https://anish2690.github.io/genesis-docs-en/", target: '_self', rel: '' },
          { text: "简体中文", link: "https://fmfe.github.io/genesis-docs/guide/", target: '_self', rel: '' },
        ],
      },
    ],
    sidebar: [
      "/",
      {
        title: "Guide",
        path: "/guide/",
        collapsable: false,
        children: ["/guide/introduce", "/guide/"],
      },
      {
        title: "Advanced",
        path: "/guide/",
        collapsable: false,
        children: [
          "/guide/renderer",
          "/guide/micro",
          "/guide/meta",
          "/guide/webpack",
          "/guide/babel",
          "/guide/postcss",
        ],
      },
      {
        title: "Official blog",
        path: "/blog/",
        collapsable: false,
        children: ["/blog/followme5.0", "/blog/2020-05-25", "/blog/2020-06-18"],
      },
    ],
  },
};
