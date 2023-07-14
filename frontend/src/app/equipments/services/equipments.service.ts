import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { DataService } from 'src/app/data.service'
import { Equipment } from '../models/equipment.model'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class EquipmentService extends DataService<Result, Equipment> {
    protected override url: string = 'http://localhost:3000/api/equipments/'
    constructor(http: HttpClient) {
        super(http)
    }

    override getAll(page?: number, limit?: number): Observable<Result> {
        const params = new HttpParams()
        if (page && limit) {
            const options = {
                params: params.set('page', page).set('limit', limit)
            }
            return this.http.get<Result>(this.url, options)
        }
        return this.http.get<Result>(this.url)
    }
}

interface Result {
    status: string
    results?: number
    data: {
        equipments: Equipment[]
        equipment: Equipment
    }
}
