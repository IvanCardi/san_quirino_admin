import { getOffice } from "@/lib/http/getOffice";
import { PageProps } from "@/lib/pageProps";
import { OfficeForm } from "./office-form";

export default async function Ufficio(props: PageProps) {
  const id = (await props.params).id;
  const office = await getOffice(id);

  return (
    <div className="p-10">
      <OfficeForm office={office} />
    </div>
  );
}
