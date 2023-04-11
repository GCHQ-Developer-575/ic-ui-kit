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
import { IcDateFormat } from "./ic-date-input.types";
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

  // private inputEl: HTMLIcTextFieldElement;

  /**
   * The label for the date input.
   */
  @Prop() label!: string;

  /**
   * The value of the date input - in ISO 8601 date string format (`yyyy-mm-dd`). OR DATE OBJECT
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

  @State() day: string;
  @State() month: string;
  @State() year: string;

  // /**
  //  * Emitted when the value has changed. The emitted value is in ISO 8601 date string format (`yyyy-mm-dd`).
  //  */
  // @Event() icChange: EventEmitter<IcValueEventDetail>;

  // private handleKeyDown = (event: KeyboardEvent) => {
  //   // Prevent characters other than numbers, '/' or '-' being entered
  //   if (/[^0-9\/]/.test(event.key) && !(event.key === "Backspace")) {
  //     event.preventDefault();
  //     return;
  //   }
  // }

  private handleDayBlur = (event: Event) => {
    console.log(event);

    if (this.dayInputEl.value.length === 1) {
      if (+this.dayInputEl.value === 0) {
        this.dayInputEl.value = "01";
      } else {
        this.dayInputEl.value = `0${this.dayInputEl.value}`;
      }
    }
  }

  private handleDayInput = (event: InputEvent) => {
    const inputValue = this.dayInputEl.value;

    if (event.inputType !== "deleteContentBackward") {
      if (inputValue.length === 1 && +inputValue >= 4 && +inputValue <= 9) {
        this.dayInputEl.value = `0${event.data}`;
        this.monthInputEl.focus();
      }
  
      if (inputValue.length == 2) {
        if (+this.dayInputEl.value === 0) {
          this.dayInputEl.value = "01";
        }
        this.monthInputEl.focus();
      }
    }
  }

  componentWillLoad() {
    if (!this.helperText) {
      this.helperText = this.dateDisplayFormat;
    };

    console.log(this.dayInputEl);
    console.log(this.yearInputEl);
  }

  // AUTOMATIC MOVING TO NEXT SECTION OF DATE IF FOLLOWING:
  // 1st character of day is 4 - 9
  // 1st character of month is 2 - 9

  // type="date" - calendar is shown when you press space - DISABLE THIS (.showPicker()?)

  render() {
    const { label, helperText } = this;

    return (
        <ic-input-container>
          <ic-input-label
            label={label}
            helperText={helperText}
          ></ic-input-label>
          <ic-input-component-container>
            <input class="day-input" ref={(el) => this.dayInputEl = el} type="number" placeholder="DD" min={1} max={31} onInput={this.handleDayInput} onBlur={this.handleDayBlur}></input>
            /
            <input class="month-input" ref={(el) => this.monthInputEl = el} type="number" placeholder="MM" min={1} max={12}></input>
            /
            <input class="year-input" ref={(el) => this.yearInputEl = el} type="number" placeholder="YYYY"></input>
          </ic-input-component-container>
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