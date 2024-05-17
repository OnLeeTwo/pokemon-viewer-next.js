import Layout from "@/component/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NextNProgress from 'nextjs-progressbar';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <NextNProgress color='linear-gradient(90deg, #b656cb, #10a1a0)'/>
      <Component {...pageProps} />
    </Layout>
  );
}