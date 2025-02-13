package com.drainshawty.firstservice.storage.flat


import com.drainshawty.firstservice.storage.coordinates.CoordinatesTable
import com.drainshawty.firstservice.storage.furnish.Furnish
import com.drainshawty.firstservice.storage.house.HouseTable
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.kotlin.datetime.CurrentDateTime
import org.jetbrains.exposed.sql.kotlin.datetime.datetime

object FlatTable : IntIdTable("flat") {
    val name = varchar("name", 255)
    val coordinatesId = reference("coordinates_id", CoordinatesTable.id)
    val creationDate = datetime("creation_date").defaultExpression(CurrentDateTime)
    val area = long("area").check { it greater 0 }
    val numberOfRooms = integer("number_of_rooms").check { it greater 0 }
    val timeToMetroByTransport = long("time_to_metro").check { it greater 0 }
    val timeToMetroByWalk = integer("time_to_metro_walk").check { it greater 0 }
    val centralHeating = bool("central_heating").nullable()
    val furnish = enumerationByName("furnish", 50, Furnish::class)
    val houseId = reference("house_id", HouseTable.id)
    val price = integer("price").check { it greater 0 }
}



