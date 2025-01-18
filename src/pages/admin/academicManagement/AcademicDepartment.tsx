import { useState } from "react";
import { TAcademicDepartment, TQueryParam } from "../../../types";
import { useGetAcademicDepartmentsQuery } from "../../../redux/features/admin/academicManagement.api";
import { Button, Input, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

export type TTableData = Pick<TAcademicDepartment, "name" | "academicFaculty">;

const AcademicDepartment = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const {
    data: academicDepartment,
    isLoading,
    isFetching,
  } = useGetAcademicDepartmentsQuery(params);

  console.log({ academicDepartment, isLoading, isFetching });

  const tableData = academicDepartment?.data?.map(
    ({ _id, name, academicFaculty }) => ({
      key: _id,
      name,
      academicFaculty: academicFaculty.name,
    })
  );

  const columns: ColumnsType<{
    key: string;
    name: string;
    academicFaculty: string;
  }> = [
    {
      title: "Academic Department Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Academic Faculty Name",
      dataIndex: "academicFaculty",
      key: "academicFaculty",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button onClick={() => handleUpdate(record.key)}>Update</Button>
      ),
    },
  ];

  const handleSearch = (searchValue: string) => {
    const updatedParams: TQueryParam[] = searchValue
      ? [{ name: "name", value: searchValue }]
      : [];
    setParams(updatedParams);
  };

  const handleUpdate = (id: string) => {
    console.log(`Update clicked for ID: ${id}`);
  };

  return (
    <div>
      <Input.Search
        placeholder="Search by name"
        onSearch={handleSearch}
        allowClear
        style={{ marginBottom: 16 }}
      />
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        rowKey="key"
      />
    </div>
  );
};

export default AcademicDepartment;
