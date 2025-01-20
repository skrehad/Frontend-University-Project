import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  rules?: { required: string };
  disabled?: boolean;
};

const PHInput = ({ type, name, label, rules, disabled }: TInputProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label={label}
            validateStatus={error ? "error" : ""}
            help={error?.message} // Display error message
          >
            <Input
              {...field}
              type={type}
              id={name}
              size="large"
              disabled={disabled}
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHInput;
