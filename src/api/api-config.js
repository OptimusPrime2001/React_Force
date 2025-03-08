const env = process.env.NODE_ENV || "development";

const apiEnvironment = {
  development: {
        api: "http://rezkin.ddns.net/",
        paht_api: "https://pahtsonla-api.cgis.asia/",
        media_url: "https://vidsto-api.uro-solution.info/",
        domainAdminSide: "http://localhost:3000",
        domainUserSide: "http://localhost:3000",
        domainName: "",

  },
    production: {
      api: "http://rezkin.ddns.net/",
      paht_api: "https://pahtsonla-api.cgis.asia/",
      media_url: "http://rezkin.ddns.net/",
      domainAdminSide: "http://rezkin.uro-solution.info",
      domainUserSide: "http://rezkin.uro-solution.info",
      domainName: "",
  }
};

export default apiEnvironment[env];
