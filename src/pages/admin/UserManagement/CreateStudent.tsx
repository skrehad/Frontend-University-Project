/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import {
  useGetAcademicDepartmentsQuery,
  useGetAllSemestersQuery,
} from "../../../redux/features/admin/academicManagement.api";

import PHDatePicker from "../../../components/form/PHDatePicker";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";

// const studentDummyData = {
//   password: "student123",
//   student: {
//     name: {
//       firstName: "I am ",
//       middleName: "Student",
//       lastName: "Number 1",
//     },
//     gender: "male",
//     dateOfBirth: "1990-01-01",
//     bloodGroup: "A+",

//     email: "student3@gmail.com",
//     contactNo: "1235678",
//     emergencyContactNo: "987-654-3210",
//     presentAddress: "123 Main St, Cityville",
//     permanentAddress: "456 Oak St, Townsville",

//     guardian: {
//       fatherName: "James Doe",
//       fatherOccupation: "Engineer",
//       fatherContactNo: "111-222-3333",
//       motherName: "Mary Doe",
//       motherOccupation: "Teacher",
//       motherContactNo: "444-555-6666",
//     },

//     localGuardian: {
//       name: "Alice Johnson",
//       occupation: "Doctor",
//       contactNo: "777-888-9999",
//       address: "789 Pine St, Villageton",
//     },

//     admissionSemester: "65bb60ebf71fdd1add63b1c0",
//     academicDepartment: "65b4acae3dc8d4f3ad83e416",
//   },
// };

//! This is only for development
//! Should be removed

const studentDefaultValues = {
  name: {
    firstName: "I am ",
    middleName: "Student",
    lastName: "Number 1",
  },
  gender: "male",

  bloodGroup: "A+",

  contactNo: "1235678",
  emergencyContactNo: "987-654-3210",
  presentAddress: "123 Main St, Cityville",
  permanentAddress: "456 Oak St, Townsville",

  guardian: {
    fatherName: "James Doe",
    fatherOccupation: "Engineer",
    fatherContactNo: "111-222-3333",
    motherName: "Mary Doe",
    motherOccupation: "Teacher",
    motherContactNo: "444-555-6666",
  },

  localGuardian: {
    name: "Alice Johnson",
    occupation: "Doctor",
    contactNo: "777-888-9999",
    address: "789 Pine St, Villageton",
  },

  admissionSemester: "65bb60ebf71fdd1add63b1c0",
  academicDepartment: "65b4acae3dc8d4f3ad83e416",
};

const CreateStudent = () => {
  const [addStudent, { data, error }] = useAddStudentMutation();

  console.log({ data, error });

  const { data: sData, isLoading: sIsLoading } =
    useGetAllSemestersQuery(undefined);

  const { data: dData, isLoading: dIsLoading } =
    useGetAcademicDepartmentsQuery(undefined);

  const semesterOptions = sData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const departmentOptions = dData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const studentData = {
        password: "student123",
        student: data,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(studentData));
      formData.append("file", data.image);

      await addStudent(formData).unwrap();
      toast.success("Student added successfully!");
    } catch (error: any) {
      const errors = error?.data?.errorSources || [
        "An unexpected error occurred",
      ];
      // console.log(errors.forEach(error(error.massage)));
      errors.forEach((error: { path: string; message: string }) => {
        toast.error(` ${error.path}: ${error.message}`); // Log only the error message
      });
    }

    //! This is for development
    //! Just for checking
    // console.log(Object.fromEntries(formData));
  };

  return (
    <Row justify="center">
      <Col span={24}>
        <PHForm onSubmit={onSubmit} defaultValues={studentDefaultValues}>
          <Divider>Personal Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="name.firstName"
                label="First Name"
                rules={{ required: "First name is required" }}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="name.middleName"
                label="Middle Name"
                rules={{ required: "Middle name is required" }}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="name.lastName"
                label="Last Name"
                rules={{ required: "Last name is required" }}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect options={genderOptions} name="gender" label="Gender" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHDatePicker name="dateOfBirth" label="Date of birth" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={bloodGroupOptions}
                name="bloodGroup"
                label="Blood group"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="image"
                rules={{
                  required: "Image is required", // Validation rule with an error message
                }}
                render={({
                  field: { onChange, value, ...field },
                  fieldState: { error },
                }) => (
                  <Form.Item
                    label="Picture"
                    validateStatus={error ? "error" : ""}
                    help={error?.message}
                  >
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>
          <Divider>Contact Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="email"
                label="Email"
                rules={{ required: "Email is required" }}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="contactNo"
                label="Contact"
                rules={{ required: "Contact No is required" }}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact"
                rules={{ required: "Emergency Contact is required" }}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="presentAddress"
                label="Present Address"
                rules={{ required: "Present Address is required" }}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
                rules={{ required: "Permanent Address is required" }}
              />
            </Col>
          </Row>
          <Divider>Guardian</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherName"
                label="Father Name"
                rules={{ required: "Father name is required" }}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherOccupation"
                label="Father Occupation"
                rules={{ required: "Father Occupation is required" }}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherContactNo"
                label="Father ContactNo"
                rules={{ required: "Father ContactNo is required" }}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherName"
                label="Mother Name"
                rules={{ required: "Mother name is required" }}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherOccupation"
                label="Mother Occupation"
                rules={{ required: "Mother Occupation is required" }}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherContactNo"
                label="Mother ContactNo"
                rules={{ required: "Mother ContactNo is required" }}
              />
            </Col>
          </Row>
          <Divider>Local Guardian</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.name"
                label="Name"
                rules={{ required: "Mother name is required" }}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.occupation"
                label="Occupation"
                rules={{ required: "localGuardian Occupation is required" }}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.contactNo"
                label="Contact No."
                rules={{ required: "localGuardian Contact No. is required" }}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.address"
                label="Address"
                rules={{ required: "localGuardian Address name is required" }}
              />
            </Col>
          </Row>
          <Divider>Academic Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={semesterOptions || []}
                disabled={sIsLoading}
                name="admissionSemester"
                label="Admission Semester"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={departmentOptions || []}
                disabled={dIsLoading}
                name="academicDepartment"
                label="Admission Department"
              />
            </Col>
          </Row>

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;
