import MaxWidthWrapper from "@/components/max-width-wrapper";
import Client from "./client";

const CookPage = async () => {
  return (
    <MaxWidthWrapper>
      <p>cookie from page header</p>

      <Client />
    </MaxWidthWrapper>
  );
};

export default CookPage;
