"use client";

import { Container, Center, Flex } from "@chakra-ui/react";
import type { FC, ReactNode } from "react";

import Navbar from "@/components/layout/navbar";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

interface Props {
  children: ReactNode;
}
const BaseLayout: FC<Props> = ({ children }) => {
  return (
    <>
      {/* <Container minW="full"> */}
      <Navbar />

      <Header />

      <main>
        <Container h="91.5vh" minW="full" bg="green.100">
          {children}
        </Container>
      </main>

      <Footer />
      {/* </Container> */}
    </>
  );
};

export default BaseLayout;
