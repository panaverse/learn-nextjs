import ChakraWrapper from "../components/Chakra";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head></head>
      <body><ChakraWrapper>{children}</ChakraWrapper></body>
    </html>
  )
}
