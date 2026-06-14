import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { TabSkeleton } from "@/components/products/skeleton";
import { ProductsTab } from "@/components/products/tab";
import { Suspense } from "react";

const Page = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Header />
      <div className="mx-3">
        <Suspense fallback={<TabSkeleton />}>
          <ProductsTab />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}

export default Page;