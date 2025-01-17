import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { toast } from "sonner";
import { useAddAdminMutation } from "../../../redux/features/admin/userManagement.api";

const CreateAdmin = () => {
  const [addAdmin, { data, error }] = useAddAdminMutation();

  console.log({ data, error });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const adminData = {
        password: "faculty123",
        faculty: data,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(adminData));
      formData.append("file", data.image);

      await addAdmin(formData).unwrap();
      toast.success("Faculty Created successfully!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        <PHForm onSubmit={onSubmit}>
          <Divider>Personal Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="designation"
                label="Designation"
                rules={{ required: "Designation is required" }}
              />
            </Col>
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

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateAdmin;
