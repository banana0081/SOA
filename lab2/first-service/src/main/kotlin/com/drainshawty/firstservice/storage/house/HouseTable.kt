package com.drainshawty.firstservice.storage.house

import org.jetbrains.exposed.dao.id.IntIdTable

object HouseTable : IntIdTable("house") {
    val name = varchar("name", 255)
    val year = long("year").check { it greater 0 } // Обязательное поле
    val numberOfFlatsOnFloor = integer("number_of_flats_on_floor").check { it greater 0 }
}