package com.drainshawty.firstservice.storage.house

import com.drainshawty.firstservice.web.dto.HouseDTO
import jakarta.enterprise.context.ApplicationScoped
import org.jetbrains.exposed.sql.transactions.transaction
import org.springframework.stereotype.Repository

@Repository
class HouseRepository {

    fun addHouse(houseDTO: HouseDTO): HouseEntity {
        return transaction {
            HouseEntity.new {
                this.name = houseDTO.name
                this.year = houseDTO.year
                this.numberOfFlatsOnFloor = houseDTO.numberOfFlatsOnFloor
            }
        }
    }
}