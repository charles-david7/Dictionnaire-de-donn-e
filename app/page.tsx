"use client";
import { usePathname, useRouter} from "next/navigation";
import {useEffect} from "react";
import {CircularProgress} from "@mui/material";

export default function Home() {
  const path = usePathname()
  const router = useRouter()

  useEffect(() => {
    router.push("/Card")
  }, [path]);

  return (
      <CircularProgress size={20} sx={{justifyContent: 'center'}}/>
  );
}
