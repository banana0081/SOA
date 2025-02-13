package com.drainshawty.firstservice.storage.coordinates

import com.drainshawty.firstservice.annotation.Open
import com.drainshawty.firstservice.web.dto.CoordinatesDTO
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID

@Open
class CoordinatesEntity(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<CoordinatesEntity>(CoordinatesTable)

    var x by CoordinatesTable.x
    var y by CoordinatesTable.y

    fun toDTO(): CoordinatesDTO {
        return CoordinatesDTO(
            x = this.x,
            y = this.y
        )
    }
}