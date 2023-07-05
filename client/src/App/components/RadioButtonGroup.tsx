import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

interface props {
  options: any[];
  onChange: (event: any) => void;
  selectedValue: string;
}
const RadioButtonGroup = ({ options, onChange, selectedValue }: props) => {
  return (
    <FormControl>
      <RadioGroup onChange={onChange} value={selectedValue}>
        {options.map(({ value, label }) => (
          <FormControlLabel
            key={value}
            value={value}
            control={<Radio />}
            label={label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtonGroup;
