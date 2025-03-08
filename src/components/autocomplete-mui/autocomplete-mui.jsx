import React from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@mui/lab/Autocomplete";

const AutocompleteMui = (props) => {
    const { listData, value, handleChange, name } = props;
    return (
        <Autocomplete
            options={listData}
            getOptionLabel={(option) =>
                typeof option === "string" ? option : option?.name ? option.name : option?.fullName ?option.fullName: 'Chưa đặt tên'
            }
            value={value}
            onChange={(event, newValue) => {
                handleChange(newValue);
            }}
            disableClearable={true}
            renderInput={(params) => (
                <TextField
                    {...params}
                    name={name}
                    variant="outlined"
                    size="small"
                />
            )}
        />
    )
}

export default AutocompleteMui;