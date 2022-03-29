const GROBAL = {
  BASE_SERVER: {
    // URL: "http://ec2-54-151-246-18.ap-southeast-1.compute.amazonaws.com:7001/",
    // URL_IMG:
    //   "http://ec2-54-151-246-18.ap-southeast-1.compute.amazonaws.com:7001/",
    // URL_UPLOAD:
    //   "http://ec2-54-151-246-18.ap-southeast-1.compute.amazonaws.com:7001/file-upload/uploadFile/",
    // URL_DELETE:
    //   "http://ec2-54-151-246-18.ap-southeast-1.compute.amazonaws.com:7001/file-upload/deleteFlie/",

    URL_EXPORT: "http://localhost/export/",
    URL_IO: "ws://localhost:7001/",

    URL: "http://localhost:7001/",
    URL_IMG: "http://localhost:7001/",
    URL_UPLOAD: "http://localhost:7001/file-upload/uploadFile/",
    URL_DELETE: "http://localhost:7001/file-upload/deleteFlie/",
    URL_SCOKET_IO: "http://localhost:7001/",
  },

  ACCESS_TOKEN: {
    "x-access-token": localStorage.getItem("x-access-token"),
  },
  LINE_TOKEN: "CFoMqbCB1Xpu6xw2BmVQl1r9wBUT1CS0fVbPSm1uGLP",
};

export default GROBAL;
