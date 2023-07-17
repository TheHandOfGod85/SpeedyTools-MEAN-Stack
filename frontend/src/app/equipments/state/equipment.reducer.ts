import { Equipment } from '../models/equipment.model'
import { createReducer, on } from '@ngrx/store'
import { EquipmentApiActions, EquipmentPageActions } from './actions'

export interface EquipmentState {
    currentEquipmentId: string | null
    equipment: Equipment | null
    equipments: Equipment[]
    error: string
    isLoading: boolean
    count: number
}

const initialState: EquipmentState = {
    currentEquipmentId: null,
    equipments: [],
    equipment: null,
    error: '',
    isLoading: false,
    count: 0
}

export const equipmentReducer = createReducer<EquipmentState>(
    initialState,
    on(EquipmentPageActions.loadEquipments, (state, action): EquipmentState => {
        return {
            ...state,
            isLoading: true
        }
    }),
    on(
        EquipmentApiActions.loadEquipmentsSuccess,
        (state, action): EquipmentState => {
            return {
                ...state,
                equipments: action.equipments,
                error: '',
                isLoading: false,
                count: action.count
            }
        }
    ),
    on(
        EquipmentApiActions.loadEquipmentsFailure,
        (state, action): EquipmentState => {
            return {
                ...state,
                equipments: [],
                error: action.error,
                isLoading: false
            }
        }
    ),
    on(
        EquipmentApiActions.loadEquipmentSuccess,
        (state, action): EquipmentState => {
            return {
                ...state,
                equipment: action.equipment,
                isLoading: false
            }
        }
    ),
    on(
        EquipmentApiActions.loadEquipmentFailure,
        (state, action): EquipmentState => {
            return {
                ...state,
                equipment: null,
                error: action.error
            }
        }
    ),
    on(
        EquipmentPageActions.setCurrentEquipmentId,
        (state, action): EquipmentState => {
            return {
                ...state,
                currentEquipmentId: action.id
            }
        }
    ),
    on(
        EquipmentPageActions.updateEquipment,
        (state, action): EquipmentState => {
            return {
                ...state,
                isLoading: true
            }
        }
    ),
    on(
        EquipmentApiActions.updateEquipmentSuccess,
        (state, action): EquipmentState => {
            const updatedEquipments = state.equipments.map((equip) =>
                action.equipment._id === equip._id ? action.equipment : equip
            )
            return {
                ...state,
                equipments: updatedEquipments,
                currentEquipmentId: null,
                error: '',
                isLoading: false
            }
        }
    ),
    on(
        EquipmentApiActions.updateEquipmentFailure,
        (state, action): EquipmentState => {
            return {
                ...state,
                error: action.error,
                isLoading: false
            }
        }
    ),
    on(
        EquipmentPageActions.deleteEquipment,
        (state, action): EquipmentState => {
            return {
                ...state,
                isLoading: true
            }
        }
    ),
    on(
        EquipmentApiActions.deleteEquipmentSuccess,
        (state, action): EquipmentState => {
            return {
                ...state,
                equipments: state.equipments.filter(
                    (equip) => equip._id !== action.id
                ),
                error: '',
                isLoading: false
            }
        }
    ),
    on(
        EquipmentApiActions.deleteEquipmentFailure,
        (state, action): EquipmentState => {
            return {
                ...state,
                error: action.error,
                isLoading: false
            }
        }
    ),
    on(
        EquipmentPageActions.craeteEquipment,
        (state, action): EquipmentState => {
            return {
                ...state,
                isLoading: true
            }
        }
    ),
    on(
        EquipmentApiActions.createEquipmentSuccess,
        (state, action): EquipmentState => {
            return {
                ...state,
                equipments: [...state.equipments, action.equipment],
                error: '',
                isLoading: false
            }
        }
    ),
    on(
        EquipmentApiActions.createEquipmentFailure,
        (state, action): EquipmentState => {
            return {
                ...state,
                error: action.error,
                isLoading: false
            }
        }
    )
)
