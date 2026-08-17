import {
  Amiri,
  Crimson_Text,
  IBM_Plex_Sans_Arabic,
  Inter,
} from "next/font/google";

/*
 * Latin pair measured from the reference (design-inventory §3).
 * Arabic pair is the audit's recommendation — PENDING CLIENT APPROVAL
 * (design-inventory §17 #1). Swapping it means editing this file only.
 */

export const crimson = Crimson_Text({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-crimson",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const amiri = Amiri({
  weight: ["400"],
  subsets: ["arabic", "latin"],
  variable: "--font-amiri",
  display: "swap",
});

export const plexArabic = IBM_Plex_Sans_Arabic({
  weight: ["400", "500", "600"],
  subsets: ["arabic", "latin"],
  variable: "--font-plex-arabic",
  display: "swap",
});

export const fontVariables = [
  crimson.variable,
  inter.variable,
  amiri.variable,
  plexArabic.variable,
].join(" ");
