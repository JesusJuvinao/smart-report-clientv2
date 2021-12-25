import React, { useCallback, useEffect, useRef } from "react";

export const Checkbox = ({
  id,
  label,
  checked,
  onChange,
  indeterminate = false,
  disabled = false,
  hideLabel = false,
  className = "",
  ...restProps
}) => {

  const inputEl = useRef(null);

  const syncIndeterminateState = useCallback(() => {
    if (inputEl && inputEl.current) {
      inputEl.current.indeterminate = indeterminate;
    }
  }, [inputEl, indeterminate]);

  useEffect(() => {
    syncIndeterminateState();
  }, [indeterminate, syncIndeterminateState]);

  const handleChange = event => {
    if (indeterminate) {
      syncIndeterminateState();
    }
    onChange(event, id);
  };

  const disabledStyles = { color: "red" };

  return (
    <div id={id} {...restProps} style={disabled ? disabledStyles : {}}>
      <label>
        <input
          type="checkbox"
          disabled={disabled}
          checked={checked}
          onChange={handleChange}
          ref={inputEl}
        />
        <span>{label}</span>
      </label>
    </div>
  );
};
