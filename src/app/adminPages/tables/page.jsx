import Breadcrumb from "../../../components/adminComponents/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../../components/adminComponents/Layouts/DefaultLayout";
import TableOne from "../../../components/adminComponents/Tables/TableOne";
import Instractor from "../../../components/adminComponents/Tables/Instractor";

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />
      <div className="flex flex-col gap-10">
        {/* <TableOne /> */}
        <Instractor/>
        {/* <TableTwo />
        <TableThree /> */}
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
