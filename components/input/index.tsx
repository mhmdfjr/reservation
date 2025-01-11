import clsx from "clsx";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

interface InputProps {
  label: string;
  placeholder?: string;
  type: "text" | "password" | "number" | "textarea" | "select";
  value: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  name: string;
  onFocus?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onBlur?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  options?: string[];
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  type,
  value,
  onFocus,
  onBlur,
  onChange,
  name,
  options = [],
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="block text-body text-basic-black dark:text-basic-white mb-2"
      >
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          className={clsx(
            "border",
            "p-2",
            "rounded-md",
            "w-full",
            "focus:outline-none"
          )}
        />
      ) : type === "select" ? (
        <select
          id={name}
          name={name}
          value={value}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          className={clsx(
            "border p-2 bg-basic-white dark:bg-basic-black text-basic-black dark:text-basic-white rounded-md w-full focus:outline-none"
          )}
        >
          <option value="" disabled>
            {placeholder || "Select an option"}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <div className="relative">
          <input
            type={type === "password" && isPasswordVisible ? "text" : type}
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={onChange}
            className={clsx(
              "border bg-basic-white dark:bg-basic-black text-basic-black dark:text-basic-white p-2 rounded-md w-full focus:outline-none"
            )}
          />
          {type === "password" && (
            <span
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            >
              {isPasswordVisible ? (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  className="text-xl  text-gray-medium-light dark:text-gray-medium"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEye}
                  className="text-xl text-gray-medium-light dark:text-gray-medium"
                />
              )}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
