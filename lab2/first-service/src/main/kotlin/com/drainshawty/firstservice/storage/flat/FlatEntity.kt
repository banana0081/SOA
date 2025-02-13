package com.drainshawty.firstservice.storage.flat

import com.drainshawty.firstservice.annotation.Open
import com.drainshawty.firstservice.storage.coordinates.CoordinatesEntity
import com.drainshawty.firstservice.storage.house.HouseEntity
import com.drainshawty.firstservice.web.dto.FlatDTO
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID

@Open
class FlatEntity(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<FlatEntity>(FlatTable)

    var name by FlatTable.name
    var coordinates by CoordinatesEntity referencedOn FlatTable.coordinatesId
    var creationDate by FlatTable.creationDate
    var area by FlatTable.area
    var numberOfRooms by FlatTable.numberOfRooms
    var timeToMetroByTransport by FlatTable.timeToMetroByTransport
    var timeToMetroByWalk by FlatTable.timeToMetroByWalk
    var centralHeating by FlatTable.centralHeating
    var furnish by FlatTable.furnish
    var house by HouseEntity referencedOn FlatTable.houseId
    var price by FlatTable.price

    fun toDTO(): FlatDTO {
        return FlatDTO(
            id = this.id.value,
            name = this.name,
            coordinates = this.coordinates.toDTO(),
            creationDate = this.creationDate.toString(),
            area = this.area,
            numberOfRooms = this.numberOfRooms,
            timeToMetroByTransport = this.timeToMetroByTransport,
            timeToMetroByWalk = this.timeToMetroByWalk,
            centralHeating = this.centralHeating == true,
            furnish = this.furnish.toFurnishDTO(),
            house = this.house.toDTO(),
            price = this.price
        )
    }
}









