"use client";

import { Container, Center, Flex } from "@chakra-ui/react";
import type { FC, ReactNode } from "react";

import Navbar from "@/components/layout/navbar";
// import InfoBannerOld from "@/components/layout/info-banner/info-banner";
import InfoBanner from "@/components/layout/info-banner/index";
import Footer from "@/components/layout/footer";

interface Props {
  children: ReactNode;
}
const BaseLayout: FC<Props> = ({ children }) => {
  return (
    <>
      {/* <Container minW="full"> */}
      <Navbar />

      {/* <InfoBannerOld /> */}
      <InfoBanner />

      <main>
        <Container minH="89vh" minW="full" bg="green.100">
          {children}
        </Container>
      </main>

      <Footer />
      {/* </Container> */}
    </>
  );
};

export default BaseLayout;
