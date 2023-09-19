import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";

const Question = ({ id, index, label, control, errors }) => {
  return (
    <>
      <Grid item xs={4} sm={8} md={6}>
        <Typography
          variant="body1"
          textAlign="left"
        >{`${id}. ${label}`}</Typography>
      </Grid>
      <Grid item xs={4} sm={8} md={6}>
        <FormControl component="fieldset">
          <Controller
            rules={{ required: true }}
            control={control}
            defaultValue={id}
            name={`survey.${index}.id`}
            render={({ field }) => <input type="hidden" {...field} />}
          />
          <Controller
            rules={{ required: true }}
            control={control}
            defaultValue={null}
            name={`survey.${index}.respuesta`}
            render={({ field }) => (
              <RadioGroup row {...field}>
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="1"
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="2"
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label="3"
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  value="4"
                  control={<Radio />}
                  label="4"
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  value="5"
                  control={<Radio />}
                  label="5"
                  labelPlacement="bottom"
                />
              </RadioGroup>
            )}
          />
          {errors?.survey?.[index] && (
            <Typography variant="body2" color="red">
              Este campo es requerido.
            </Typography>
          )}
        </FormControl>
      </Grid>
    </>
  );
};

export default Question;
