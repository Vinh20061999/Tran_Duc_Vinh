import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./Component/Sidebar";
import Providers from "./Component/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "App Panasonic",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body className={inter.className}>
        <main>
          <Sidebar />
          {/* <Providers> */}
          {children}
          {/* </Providers> */}


        </main>

      </body>
    </html>
  );
}
