import Loading from "@/components/loading";
import { Form } from "../components/form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="">
        <Loading />
      </section>
    </main>
  );
}
