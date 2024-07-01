// components/formInput.jsx
import React from "react";
import PropTypes from "prop-types"; // Import PropTypes for prop validation
import { Controller } from "react-hook-form";

const Input = React.forwardRef(
  (
    {
      control,
      name,
      rootContainerStyles = '',
      containerStyles = '',
      inputContainerStyles = '',
      label = "",
      prependComponent,
      appendComponent,
      ...props
    },
    ref
  ) => {
    const {
      className,
      placeholder,
      security,
      type,
      autoComplete,
      maxLength,
      disabled,
    } = props;

    return (
      <Controller
        control={control}
        name={name}
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => (
          <div className={rootContainerStyles}>
            {/* Label */}
            {label && <p>{label}</p>}

            {/* Inputs */}
            <div style={{ marginTop: 12, ...containerStyles }}>
              <div
                className={`flex flex-row items-center h-12 rounded-md px-6 ${inputContainerStyles}`}
              >
                {prependComponent}
                <input
                  ref={ref}
                  className={`flex-1 py-0 text-lg outline-none bg-transparent ${className}`}
                  placeholder={placeholder}
                  value={value}
                  name={name}
                  id={name}
                  onChange={onChange}
                  security={security ? 'true' : 'false'}
                  type={type}
                  autoComplete={autoComplete}
                  maxLength={maxLength}
                  disabled={disabled}
                  onBlur={onBlur}
                />
                {appendComponent}
              </div>
            </div>

            {/* Error Renders */}
            {error && (
              <p style={{ marginTop: 4, color: "red" }}>{error.message}</p>
            )}
          </div>
        )}
      />
    );
  }
);

Input.displayName = "Input";

// Define prop types for validation
Input.propTypes = {
  control: PropTypes.object.isRequired, // The control object from react-hook-form
  name: PropTypes.string.isRequired, // The name of the form field
  rootContainerStyles: PropTypes.string, // Style object for the root container
  containerStyles: PropTypes.string, // Style object for the container
  inputContainerStyles: PropTypes.string, // Style object for the input container
  label: PropTypes.string, // Label for the input
  prependComponent: PropTypes.node, // Component to be rendered before the input
  appendComponent: PropTypes.node, // Component to be rendered after the input
  className: PropTypes.string, // Style object for the input element
  placeholder: PropTypes.string, // Placeholder text for the input
  security: PropTypes.string, // Custom security prop
  type: PropTypes.string, // Input type (e.g., text, password)
  autoComplete: PropTypes.string, // AutoComplete attribute for the input
  maxLength: PropTypes.number, // Maximum length for the input
  disabled: PropTypes.bool, // Whether the input is disabled
};

export default Input;
