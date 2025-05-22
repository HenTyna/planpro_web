import LandingPageContrainer from "@/components/ui/landing/LandingPageContrainer";
import LandingLayout from "@/components/ui/layout/LandingLayout";
export default function LandingPage() {
  return (
    <>
      <LandingPageContrainer />
    </>
  );
}
LandingPage.getLayout = (page: any) => <LandingLayout>{page}</LandingLayout>;
