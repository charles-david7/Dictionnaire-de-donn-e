import "./globals.css";
import {CssBaseline} from "@mui/material";
import {Box} from "@mui/system";

import React from "react";


export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html>
      <body>

      <CssBaseline/>
      <Box
          sx={{
            height: "100vh",

          }}
      >
        {children}
      </Box>
      </body>
      </html>
  );
}
