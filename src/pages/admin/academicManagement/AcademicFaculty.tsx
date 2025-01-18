import { useState } from "react";
import { TAcademicFaculty, TQueryParam } from "../../../types";
import { useGetAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";
import { Button, Input, Table, TableColumnsType } from "antd";

export type TTableData = Pick<TAcademicFaculty, "name">;

const AcademicFaculty = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const {
    data: academicFaculty,
    isLoading,
    isFetching,
  } = useGetAcademicFacultiesQuery(params);

  console.log({ academicFaculty, isLoading, isFetching });

  const tableData = academicFaculty?.data?.map(({ _id, name }) => ({
    key: _id,
    name,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: " Academic Faculty Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Action",
      key: "x",
      render: (record) => (
        <div>
          <Button onClick={() => handleUpdate(record.key)}>Update</Button>
        </div>
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

export default AcademicFaculty;
