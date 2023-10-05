"use client";

import { Container, Grid, GridItem } from "@chakra-ui/react";
import type { FC, ReactNode } from "react";

import Header from "@/components/layout/header";
// import Footer from "@/lib/shared/components/layout/footer";

interface Props {
  children: ReactNode;
}
const BaseLayout: FC<Props> = ({ children }) => {
  return (
    <main>
      <Header />
      <Container>{children}</Container>
    </main>
  );
};

export default BaseLayout;
