import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import LenisProvider from "@/components/LenisProvider";

// Polices locales
// const titleRegular = localFont({
//     src: '../../public/assets/fonts/title-bold.woff2',
//     variable: '--font-title-regular',
//     display: 'swap',
// });

const titleRegular = localFont({
    src: '../public/assets/fonts/title-bold.woff2',
    variable: '--font-title-regular',
    display: 'swap',
});

const humane = localFont({
    src: '../public/assets/fonts/Humane.woff2',
    variable: '--font-humane',
    display: 'swap',
});

const titleBold = localFont({
    src: '../public/assets/fonts/title-regular.woff2',
    variable: '--font-title-bold',
    display: 'swap',
});

const textFont = localFont({
    src: '../public/assets/fonts/DM-Sans-regular.woff2',
    variable: '--font-text',
    display: 'swap',
});

const italicBold = localFont({
    src: '../public/assets/fonts/italic-bold.woff2',
    variable: '--font-italic-bold',
    display: 'swap',
});

export const metadata: Metadata = {
    title: "QR Menu",
    description: "Le menu digital pour les restaurants de Dakar",
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html
            lang="fr"
            className={cn(
                "h-full antialiased",
                titleRegular.variable,
                humane.variable,
                titleBold.variable,
                textFont.variable,
                italicBold.variable
            )}
        >
            <body className="min-h-full flex flex-col font-text">
                <LenisProvider>
                    {children}
                </LenisProvider>
            </body>
        </html>
    );
}