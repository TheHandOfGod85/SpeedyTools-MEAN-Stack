import { AbstractControl, ValidationErrors } from '@angular/forms'

export const matchPassword = (
    control: AbstractControl
): ValidationErrors | null => {
    let password = control.get('password')
    let confirmPassword = control.get('confirmPassword')

    if (
        password &&
        confirmPassword &&
        password?.value != confirmPassword?.value
    ) {
        return { passwordMismatch: true }
    }

    return null
}
