import "./globals.css";
import {CssBaseline} from "@mui/material";
import {Box} from "@mui/system";
import Bar from "@/Components/Toolbar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html>
      <body>
      <Bar/>
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
