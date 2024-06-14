import { OrganizationList } from "@clerk/nextjs";

export default function CreateOrganizationPage() {
  return (
    <OrganizationList
      hidePersonal
      afterSelectOrganizationUrl={"/servers/:id"}
      afterCreateOrganizationUrl={"/servers/:id"}
    />
  );
}