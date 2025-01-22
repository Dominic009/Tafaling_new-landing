/** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       'images.unsplash.com',
//       'unsplash.com',
//       'plus.unsplash.com',
//       'videos.pexels.com',
//       '99.237.86.169',
//       '127.0.0.1',
//     ],
//   },
// };

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "unsplash.com",
      },
      {
        protocol: "https",
        hostname: "videos.pexels.com",
      },
      {
        protocol: "http",
        hostname: "99.237.86.169",
        port: "7070",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
      },
      {
        protocol: "http",
        hostname: "devapi.tafaling.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
