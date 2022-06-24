// integration of intl-tel-input with alpineJS form validation

// HTML:
//<div class="text-left relative">
//     <label
//            class="hidden"
//            for="field_{{ field.name }}-{{ uniqueFormId }}">
//            {{ field.label }}
//        </label>
//     <input 
//       type="tel" 
//        class="form-input form-input-intl" 
//        x-bind="input"
//        x-init="initPhone()"
//        x-ref="phone"
//        placeholder="{{ field.label }}" 
//        id="field_{{ field.name }}-{{ uniqueFormId }}"
//        name="field_{{ field.name }}-{{ uniqueFormId }}"
//        @blur="checkPhone()"
//        >
// </div>

// other imports
import * as countries from '../custom/iso-3166-countries.json';

export default () => ({
    fields: {},
    formError: '',
    noAccept: false,
    intlTelInputInstance: undefined,
    errorMap: ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"],
    isInternational: null,
    dialCode: '1',
    country: 'USA',

    submit(uniqueID, formPlainData) {
        // code for submit
    },

    initPhone() {
        this.intlTelInputInstance = window.intlTelInput(this.$refs.phone, {
            separateDialCode: true,
            formatOnDisplay: true,
            utilsScript: "/path/to/intlTelInput.utilities.js"
        });
    },

    checkPhone() {
        if (this.intlTelInputInstance.isValidNumber()) {
            this.isValid = true;
            this.errorMsg = '';
            const countryData = this.intlTelInputInstance.getSelectedCountryData();
            
            countryData.dialCode === '1' ? this.isInternational = false : this.isInternational = true;
            this.dialCode = countryData.dialCode;

            for (var country in countries.default){
                if (countries.default[country]['alpha-2'].toLowerCase() === countryData.iso2) {
                    this.country = countries.default[country]['alpha-3']
                } 
            }

        } else {
            this.isValid = false;
            this.isInternational = null;
            this.dialCode = '1';
            this.country = 'USA';
            var errorCode = this.intlTelInputInstance.getValidationError();
            this.errorMsg = this.errorMap[errorCode];
        }
    },

    addUtmData(data) {
        //
    },

    addFixedData(data) {
        let newData = {};
        if (this.noAccept === true) {
            newData = data.fixedNotAcceptData;
        } 
        if (this.isInternational === true) {
            newData = {
                ...newData,
                "is_international": true,
                "country": this.country
            }
        }
        if (data.hasOwnProperty("fixedData")) {
            newData = {
                ...newData,
                ...data.fixedData
            }
        }
        return newData;
    },

    async submitForm(data, fixed, endpoint, redirect) {
        const fullFormData = this.addUtmData(data);
        const fullFormWithFixed = {
            ...fullFormData,
            ...fixed
        }
        const fullFormDataNoEmpty = this.removeEmptyOrNull(fullFormWithFixed);

        const response = await fetch(endpoint, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(fullFormDataNoEmpty)
        });

        if (response.ok) {
            // code for response
        } else {
            this.formError = "There was an error submitting the form."
        }
    },

    validate(name, id, rules) {
        // validate fields
    },

    removeEmptyOrNull(obj) {
        Object.keys(obj).forEach(k =>
          (obj[k] && typeof obj[k] === 'object') && removeEmptyOrNull(obj[k]) ||
          (!obj[k] && obj[k] !== undefined) && delete obj[k]
        );
        return obj;
    },

    computeFieldId(uniqueID, fieldName) {
        return `field_${fieldName}-${uniqueID}`
    },

    controlledFields(field) {
        const fieldControl = field;
        if (fieldControl !== '' && fieldControl !== undefined) {
            if (typeof fieldControl === 'object') {
                fieldControl.forEach( f => {
                    this.showControlledFields(f);
                });
            } else {
                this.showControlledFields(fieldControl);
            }
        }
    },

    showControlledFields(field) {
        let controlledField = document.getElementById(field);
        if (this.$el.selectedOptions !== undefined && this.$el.selectedOptions[0].value !== '') {
            if (controlledField && this.$el.selectedOptions[0].value == controlledField.closest('.form-item-wrapper').dataset.requirements) {
                controlledField.closest('.form-item-wrapper').style.display = 'block';
            } else if (controlledField && this.$el.selectedOptions[0].value !== controlledField.closest('.form-item-wrapper').dataset.requirements) {
                controlledField.closest('.form-item-wrapper').style.display = 'none';
            }
        }
    },

    input: {
        [':class']() {
            if (this.isValid == null) {
                return false;
            } else {
                if (this.isValid == false) {
                    return 'error'
                } else if (this.isValid == true) {
                    return 'valid'
                }
            }
        },
        ['x-init']() {
            return this.$nextTick( () => {
                this.controlledFields(this.fieldControls);
            });                      
        },
        ['@change']() {
            this.controlledFields(this.fieldControls);
        }
    },

    message: {
        ['x-text']() {
            return this.errorMsg;
        }
    },

    formErrorMessage: {
        ['x-text']() {
            return this.formError;
        }
    }

});
