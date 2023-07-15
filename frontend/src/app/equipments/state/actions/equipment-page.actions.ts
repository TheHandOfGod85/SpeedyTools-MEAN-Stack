import { createAction, props } from '@ngrx/store'
import { Equipment } from '../../models/equipment.model'

export const loadEquipments = createAction(
    '[Equipment Page] Load',
    props<{ page: number | null; limit: number | null; name: string | null }>()
)

export const updateEquipment = createAction(
    '[Equipment Page] Update equipment',
    props<{
        id: string
        equipment: Equipment
        redirect: string
        message: string
    }>()
)

export const setCurrentEquipmentId = createAction(
    '[Equipment Page] Set Equipment ID',
    props<{ id: string }>()
)

export const deleteEquipment = createAction(
    '[Equipment API] Delete Equipment',
    props<{ id: string }>()
)
export const craeteEquipment = createAction(
    '[Equipment Page] Create Equipment',
    props<{ equipment: Equipment; redirect: string; message: string }>()
)
