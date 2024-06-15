import { InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { forwardRef } from "react";
import SearchIcon from "/assets/svgs/search.svg";

type SearchFieldProps = Pick<TextFieldProps, "onChange">;

const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  ({ onChange }, ref) => {
    return (
      <div className="flex items-center">
        <TextField
          variant="outlined"
          placeholder="Search animations"
          fullWidth
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              width: "300px",
              borderRadius: 3,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img className="w-4" src={SearchIcon} alt="search" />
              </InputAdornment>
            ),
            inputRef: ref,
            autoComplete: "off",
          }}
          onChange={onChange}
        />
      </div>
    );
  }
);

export default SearchField;
