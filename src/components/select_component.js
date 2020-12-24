import React from "react";
import {
	FormControl,
	InputLabel,
	Select,
} from "@material-ui/core";

export default function SelectComponent(props) {
	var { className, label, name, value, options, handleChange } = { ...props }
	return (
		<FormControl variant="outlined" className={className}>
			<InputLabel
				style={{ fontWeight: "600" }}
				htmlFor="outlined-genre-native-simple"
			>
				{label}
			</InputLabel>
			<Select
				native
				value={value}
				color="primary"
				onChange={e => handleChange(e.target.value)}
				label={label}
				inputProps={{
					name: name,
					id: "outlined-genre-native-simple",
				}}
			>
				<option key="default" value=" ">Any {name}</option>
				{options.map((option, index) => {
					return (
						<option key={index} value={option.id}>
							{option.label}
						</option>
					);
				})}
			</Select>
		</FormControl>
	)
}