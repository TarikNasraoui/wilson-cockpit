// React
import { ChangeEvent, forwardRef, InputHTMLAttributes, useState } from "react";

// Libs
import classnames from "classnames";

// Components
import { HUDListItem } from "../HUDListItem";

// Helper
import { waitMs } from "../../pages/Cockpit/helper";

// Error
import { FetchError } from "../../errors/FetchError";

// Styles
import styles from "./HUDAutoComplete.module.css";

interface HUDAutoCompleteProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "defaultValue"
  > {
  error?: string;
  fetchOptions: (
    searchTerm?: string,
    options?: RequestInit,
  ) => Promise<AutoCompleteOptionType[] | undefined>;
  label: string;
  onChange?: (selectedOption: AutoCompleteOptionType) => void;
  defaultValue?: AutoCompleteOptionType;
}

export type AutoCompleteOptionType = {
  label: string;
  value: string;
};

type AutoCompleteOptionsStateType = {
  isLoading: boolean;
  data?: AutoCompleteOptionType[] | null;
  error?: FetchError | null;
  isVisible: boolean;
};

export const HUDAutoComplete = forwardRef<
  HTMLInputElement | null,
  HUDAutoCompleteProps
>(function HUDInputComponent(
  {
    className,
    defaultValue,
    error = null,
    fetchOptions,
    label,
    name,
    onChange,
    placeholder,
    required = false,
    style,
    type = "text",
  },
  ref,
) {
  const componentClassNames = classnames(styles.hudautocomplete, className);
  const inputClassNames = classnames(styles.hudautocompleteHtmlInput, {
    [styles.hudautocompleteHtmlInputError]: error !== null,
  });
  const labelClassNames = classnames(styles.hudautocompleteLabel, {
    [styles.hudautocompleteLabelError]: error !== null,
  });
  const barClassNames = classnames(styles.hudautocompleteBar, {
    [styles.hudautocompleteBarError]: error !== null,
  });
  const optionsClassNames = classnames(styles.hudautocompleteOptions, {
    [styles.hudautocompleteOptionsError]: error !== null,
  });

  const [options, setOptions] = useState<AutoCompleteOptionsStateType>({
    isLoading: false,
    data: [],
    isVisible: false,
  });

  const [autoCompleteState, setAutoCompleteState] =
    useState<AutoCompleteOptionType>({
      label: defaultValue?.label || "",
      value: defaultValue?.value || "",
    });

  const handleOptionOnClick = (selectedOption: AutoCompleteOptionType) => {
    setAutoCompleteState(selectedOption);
    if (onChange) {
      onChange(selectedOption);
    }
  };
  const handleInputOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;

    if (searchTerm.trim().length < 1) {
      setAutoCompleteState({ label: "", value: "" });
      return;
    }

    const searchedList = await fetchOptions(searchTerm);
    setAutoCompleteState({ ...autoCompleteState, label: searchTerm });

    setOptions({
      isLoading: false,
      data: searchedList,
      error: null,
      isVisible: true,
    });
  };

  const handleVisibleOnFocus = () => {
    setOptions({ ...options, isVisible: true });
  };

  const handleNotVisibleOnBlur = async () => {
    await waitMs(100);
    setOptions({ ...options, isVisible: false });
  };

  return (
    <div className={componentClassNames} style={style}>
      <input
        name={`${name}_value`}
        id={`${name}_value`}
        value={autoCompleteState.label}
        ref={ref}
        type="hidden"
      />
      <input
        id={name}
        name={name}
        ref={ref}
        type={type}
        required={required}
        className={inputClassNames}
        placeholder={placeholder}
        value={autoCompleteState.label}
        onChange={handleInputOnChange}
        onFocus={handleVisibleOnFocus}
        onBlur={handleNotVisibleOnBlur}
      />
      <label htmlFor={name} className={labelClassNames}>
        {label}
      </label>
      <i className={barClassNames}></i>
      {error && <div className={styles.hudautocompleteError}>{error}</div>}
      {options.isVisible && (
        <div className={optionsClassNames}>
          {options.data?.map(({ label, value }: AutoCompleteOptionType) => (
            <HUDListItem
              key={`${value}`}
              hasBorder
              onClick={() => handleOptionOnClick({ label, value })}
            >
              {label}
            </HUDListItem>
          ))}
        </div>
      )}
    </div>
  );
});
