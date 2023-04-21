import {
  Component,
  Element,
  // Event,
  // EventEmitter,
  h,
  Prop,
  State,
  // State,
  // Watch,
} from "@stencil/core";
import { IcDateFormat, IcDisabledDateTypes } from "./ic-date-input.types";
import { IcInformationStatusOrEmpty } from "../../interface";
import { isEmptyString } from "../../utils/helpers";
// import { IcValueEventDetail } from "../../interface";

@Component({
  tag: "ic-date-input",
  styleUrl: "ic-date-input.css",
  shadow: {
    // CHECK THAT THIS IS WORKING
    delegatesFocus: true,
  },
})
export class DateInput {
  @Element() el: HTMLIcDateInputElement;

  private dayInputEl: HTMLInputElement;
  private monthInputEl: HTMLInputElement;
  private yearInputEl: HTMLInputElement;

  private preventDayInput: boolean;
  private preventMonthInput: boolean;
  private preventYearInput: boolean;

  private selectedDate: Date;

  /**
   * The label for the date input.
   */
  @Prop() label!: string;

  /**
   * The value of the date input - in ISO 8601 date string format (`yyyy-mm-dd`). // OR DATE OBJECT
   */
  @Prop() value?: string = "";

  /**
   * The helper text that will be displayed for additional field guidance. This will default to the `dateDisplayFormat` value.
   */
  @Prop({ mutable: true }) helperText?: string;

  /**
   * The format in which the date will be displayed.
   */
  @Prop() dateDisplayFormat?: IcDateFormat = "DD/MM/YYYY";

  /**
   * The validation state - e.g. 'error' | 'warning' | 'success'. This will override the built-in date validation.
   */
  @Prop({ mutable: true }) validationStatus?: IcInformationStatusOrEmpty = "";

  /**
   * The text to display as the validation message. This will override the built-in date validation.
   */
  @Prop({ mutable: true }) validationText?: string = "";

  @Prop() disabledDates?: IcDisabledDateTypes;

  @State() day: string;
  @State() month: string;
  @State() year: string;

  // /**
  //  * Emitted when the value has changed. The emitted value is in ISO 8601 date string format (`yyyy-mm-dd`).
  //  */
  // @Event() icChange: EventEmitter<IcValueEventDetail>;

  // FUNCTIONALITY FOR PASTING DATE INTO DATE INPUT?

  // Prevent non-number characters normally allowed in <input type="number"> (e.g. full stop)
  private onlyAllowNumbers = (event: KeyboardEvent) => {
    const key = event.key;

    if (key.length === 1 && !(key >= "0" && key <= "9")) {
      event.preventDefault();
    }
  };

  private handleDayInput = (event: InputEvent) => {
    // Prevent auto-formatting each time a character is deleted
    if (event.inputType !== "deleteContentBackward") {
      if (
        this.dayInputEl.value.length === 1 &&
        +this.dayInputEl.value >= 4 &&
        +this.dayInputEl.value <= 9
      ) {
        this.dayInputEl.value = `0${event.data}`;
        this.monthInputEl.focus();
        this.day = this.dayInputEl.value;
      }

      if (this.dayInputEl.value.length === 2) {
        if (+this.dayInputEl.value === 0) {
          this.dayInputEl.value = "01";
        }
        this.monthInputEl.focus();
        this.day = this.dayInputEl.value;
        this.preventDayInput = true;
      }
      // else {
      //   this.day = null;
      //   this.preventDayInput = false;
      // }
    }

    if (this.dayInputEl.value.length === 2) {
      this.preventDayInput = true;
    } else {
      this.preventDayInput = false;
      this.day = null;
    }
  };

  private handleDayKeyDown = (event: KeyboardEvent) => {
    // CHANGE TO ALLOW PASTING WITH SAME NUMBER OF CHARACTERS E.G. REPLACING "03" WITH "12"
    // Prevent over 2 characters (but allow replacement of characters by highlighting)
    if (
      event.key >= "0" &&
      event.key <= "9" &&
      this.preventDayInput &&
      !window.getSelection().toString()
    ) {
      event.preventDefault();
    }

    if (
      this.dayInputEl.value.length === 1 &&
      (event.key === "/" || event.key === "-")
    ) {
      this.monthInputEl.focus();
    }

    this.onlyAllowNumbers(event);
  };

  private handleDayFocus = () => {
    this.dayInputEl.select();
  };

  private handleDayBlur = () => {
    if (this.dayInputEl.value.length === 1) {
      if (+this.dayInputEl.value === 0) {
        this.dayInputEl.value = "01";
      } else {
        this.dayInputEl.value = `0${this.dayInputEl.value}`;
      }
    }
  };

  private handleMonthInput = (event: InputEvent) => {
    // Prevent auto-formatting each time a character is deleted
    if (event.inputType !== "deleteContentBackward") {
      if (
        this.monthInputEl.value.length === 1 &&
        +this.monthInputEl.value >= 2 &&
        +this.monthInputEl.value <= 9
      ) {
        this.monthInputEl.value = `0${event.data}`;
        this.yearInputEl.focus();
        this.month = this.monthInputEl.value;
      }

      if (this.monthInputEl.value.length === 2) {
        if (+this.monthInputEl.value === 0) {
          this.monthInputEl.value = "01";
        }
        this.yearInputEl.focus();
        this.month = this.monthInputEl.value;
        this.preventMonthInput = true;
      }
      // else {
      //   this.month = null;
      //   this.preventMonthInput = false;
      // }
    }

    if (this.monthInputEl.value.length === 2) {
      this.preventMonthInput = true;
    } else {
      this.preventMonthInput = false;
      this.month = null;
    }
  };

  private handleMonthKeyDown = (event: KeyboardEvent) => {
    // CHANGE TO ALLOW PASTING WITH SAME NUMBER OF CHARACTERS E.G. REPLACING "03" WITH "12"
    // Prevent over 2 characters (but allow replacement of characters by highlighting)
    if (
      event.key >= "0" &&
      event.key <= "9" &&
      this.preventMonthInput &&
      !window.getSelection().toString()
    ) {
      event.preventDefault();
    }

    if (
      this.monthInputEl.value.length === 1 &&
      (event.key === "/" || event.key === "-")
    ) {
      this.yearInputEl.focus();
    }

    this.onlyAllowNumbers(event);
  };

  private handleMonthFocus = () => {
    this.monthInputEl.select();
  };

  private handleMonthBlur = () => {
    if (this.monthInputEl.value.length === 1) {
      if (+this.monthInputEl.value === 0) {
        this.monthInputEl.value = "01";
      } else {
        this.monthInputEl.value = `0${this.monthInputEl.value}`;
      }
    }
  };

  private handleYearInput = () => {
    if (this.yearInputEl.value.length === 4) {
      this.year = this.yearInputEl.value;
      this.preventYearInput = true;
    } else {
      this.year = null;
      this.preventYearInput = false;
    }
  };

  private handleYearKeyDown = (event: KeyboardEvent) => {
    // CHANGE TO ALLOW PASTING WITH SAME NUMBER OF CHARACTERS E.G. REPLACING "03" WITH "12"
    // Prevent over 4 characters (but allow replacement of characters by highlighting)
    if (
      event.key >= "0" &&
      event.key <= "9" &&
      this.preventYearInput &&
      !window.getSelection().toString()
    ) {
      event.preventDefault();
    }

    if (event.key === "/" || event.key === "-") {
      if (this.yearInputEl.value.length === 1) {
        this.yearInputEl.value = `200${this.yearInputEl.value}`;
      } else if (this.yearInputEl.value.length === 2) {
        this.yearInputEl.value = `20${this.yearInputEl.value}`;
      } else if (this.yearInputEl.value.length === 3) {
        this.yearInputEl.value = `2${this.yearInputEl.value}`;
      }
    }

    this.onlyAllowNumbers(event);
  };

  private handleYearBlur = () => {
    if (this.yearInputEl.value.length === 1) {
      this.yearInputEl.value = `200${this.yearInputEl.value}`;
    } else if (this.yearInputEl.value.length === 2) {
      this.yearInputEl.value = `20${this.yearInputEl.value}`;
    } else if (this.yearInputEl.value.length === 3) {
      this.yearInputEl.value = `2${this.yearInputEl.value}`;
    }

    this.year = this.yearInputEl.value;
  };

  private handleYearFocus = () => {
    this.yearInputEl.select();
  };

  private isSelectedDateDisabled = () => {
    const currentDate = new Date();

    let disabled = false;

    if (this.disabledDates) {
      if (
        ((this.disabledDates === "until-now" &&
          this.selectedDate < currentDate) ||
          (this.disabledDates === "from-now" &&
            this.selectedDate > currentDate)) &&
        this.selectedDate.getDate() !== currentDate.getDate()
      ) {
        disabled = true;
      }
    }

    return disabled;
  };

  private setValidationMessage = () => {
    const validationStatus = "error";

    let isValidDay = true;
    let isValidMonth = true;
    let isValidDate = true;
    let isDisabledDate = false;

    if (this.day) {
      if (+this.day > 31) {
        isValidDay = false;
      }
    } else {
      isValidDay = true;
    }

    if (this.month) {
      if (+this.month > 12) {
        isValidMonth = false;
      }
    } else {
      isValidMonth = true;
    }

    if (this.day && this.month && this.year) {
      this.selectedDate = new Date(+this.year, +this.month - 1, +this.day);
      isValidDate =
        !!+this.selectedDate && this.selectedDate.getDate() == +this.day;
      isDisabledDate = this.isSelectedDateDisabled();
    }

    if (!(isValidDay && isValidMonth && isValidDate)) {
      this.validationStatus = validationStatus;
      this.validationText = "Please enter a valid date.";
    } else if (isDisabledDate) {
      this.validationStatus = validationStatus;
      if (this.disabledDates === "until-now") {
        this.validationText =
          "Dates in the past are not allowed. Please select a date in the future.";
      } else {
        this.validationText =
          "Dates in the future are not allowed. Please select a date in the past.";
      }
    } else {
      this.validationStatus = "";
      this.validationText = "";
    }
  };

  componentWillLoad() {
    if (!this.helperText) {
      this.helperText = this.dateDisplayFormat;
    }
  }

  componentWillUpdate() {
    this.setValidationMessage();
  }

  render() {
    const { label, helperText } = this;

    return (
      <ic-input-container>
        <ic-input-label label={label} helperText={helperText}></ic-input-label>
        <ic-input-component-container>
          <input
            class="day-input"
            ref={(el) => (this.dayInputEl = el)}
            title=""
            type="number"
            placeholder="DD"
            min={1}
            max={31}
            onInput={this.handleDayInput}
            onKeyDown={this.handleDayKeyDown}
            onFocus={this.handleDayFocus}
            onBlur={this.handleDayBlur}
          ></input>
          /
          <input
            class="month-input"
            ref={(el) => (this.monthInputEl = el)}
            title=""
            type="number"
            placeholder="MM"
            min={1}
            max={12}
            onInput={this.handleMonthInput}
            onKeyDown={this.handleMonthKeyDown}
            onFocus={this.handleMonthFocus}
            onBlur={this.handleMonthBlur}
          ></input>
          /
          <input
            class="year-input"
            ref={(el) => (this.yearInputEl = el)}
            title=""
            type="number"
            placeholder="YYYY"
            min={0}
            max={9999}
            onInput={this.handleYearInput}
            onKeyDown={this.handleYearKeyDown}
            onFocus={this.handleYearFocus}
            onBlur={this.handleYearBlur}
          ></input>
        </ic-input-component-container>
        {(!isEmptyString(this.validationStatus) ||
          !isEmptyString(this.validationText)) && (
          <ic-input-validation
            status={this.validationStatus}
            message={this.validationText}
            // ariaLiveMode={messageAriaLive}
            // for={inputId}
          ></ic-input-validation>
        )}
      </ic-input-container>
    );
  }
}

// @State() valueIsoString: string = "";

// @Watch("value")
// watchValueHandler(): void {
//   this.setIsoString();
//   this.icChange.emit({ value: this.valueIsoString });
// }

// private handleInput = (event: CustomEvent) => {
//   this.setIsoString(event.detail.value);
//   // this.icChange.emit({ value: this.valueIsoString });
// }

// private setIsoString = (value: string) => {
//   this.valueIsoString = value ? new Date(value).toISOString() : "";
// }
