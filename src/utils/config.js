export default {
  api: process.env.NODE_ENV === "production" ? "https://www.easy-mock.com/mock/5d03045ae490c733afb1fa64/ls" : "https://www.easy-mock.com/mock/5d03045ae490c733afb1fa64/ls",
  // api: process.env.NODE_ENV === "production" ? "https://www.easy-mock.com/mock/5d03045ae490c733afb1fa64/ls" : "/api/",
  reg: {
    phone: /^1[345678]{1}\d{9}$/,
  }
}  