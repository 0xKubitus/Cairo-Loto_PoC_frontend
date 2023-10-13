"use client";

import { Container, Center, Flex } from "@chakra-ui/react";
import type { FC, ReactNode } from "react";

import Navbar from "@/components/layout/navbar";
import InfoBanner from "@/components/layout/info-banner/index";
import Footer from "@/components/layout/footer";

interface Props {
  children: ReactNode;
}
const BaseLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />

      <InfoBanner />

      <main>
        <Container minH="89vh" minW="full" bg="green.100">
          {children}
        </Container>
      </main>

      <Footer />
    </>
  );
};

export default BaseLayout;
