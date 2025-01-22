package com.drainshawty.firstservice.storage.house

import com.drainshawty.firstservice.annotation.Open
import com.drainshawty.firstservice.web.dto.HouseDTO
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID

@Open
class HouseEntity(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<HouseEntity>(HouseTable)

    var name by HouseTable.name
    var year by HouseTable.year
    var numberOfFlatsOnFloor by HouseTable.numberOfFlatsOnFloor

    fun toDTO(): HouseDTO {
        return HouseDTO(
            name = this.name,
            year = this.year,
            numberOfFlatsOnFloor = this.numberOfFlatsOnFloor
        )
    }
}