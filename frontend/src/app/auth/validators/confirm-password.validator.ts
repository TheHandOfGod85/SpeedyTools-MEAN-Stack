import { AbstractControl, ValidationErrors } from '@angular/forms'

export const matchPassword = (
    control: AbstractControl
): ValidationErrors | null => {
    let password = control.get('password')
    let passwordConfirm = control.get('passwordConfirm')

    if (
        password &&
        passwordConfirm &&
        password?.value != passwordConfirm?.value
    ) {
        return { passwordMismatch: true }
    }

    return null
}
