"use client";

import { Container, Center, Flex } from "@chakra-ui/react";
import type { FC, ReactNode } from "react";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

interface Props {
  children: ReactNode;
}
const BaseLayout: FC<Props> = ({ children }) => {
  return (
    <Container minW="full">
      <Navbar />

      <main>
        <Container h="93.5vh" minW="full" bg="green.100">
          {children}
        </Container>
      </main>

      <Footer />
    </Container>
  );
};

export default BaseLayout;
