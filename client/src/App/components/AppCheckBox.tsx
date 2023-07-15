import { FormControlLabel, Checkbox } from "@mui/material";
import { UseControllerProps, useController } from "react-hook-form";

interface props extends UseControllerProps {
  label: string;
  disabled: boolean;
}
const AppCheckBox = (props: props) => {
  const { field } = useController({ ...props, defaultValue: false });

  return (
    <FormControlLabel
      control={
        <Checkbox
          {...field}
          checked={field.value}
          color="secondary"
          disabled={props.disabled}
        />
      }
      label={props.label}
    />
  );
};

export default AppCheckBox;
