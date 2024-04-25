import { Metadata } from "next";

export const metadataHelper = ({
  title,
  description,
  keywords,
}: {
  title: string;
  description: string;
  keywords?: string;
}): Metadata => {
  return {
    title: `${title} - Stonk-db`,
    description,
    keywords,
  };
};

export const metadataTitleHelper = (title: string): string =>
  `${title} - Stonk-db`;
