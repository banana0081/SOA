package com.drainshawty.firstservice.storage.furnish

import com.drainshawty.firstservice.web.dto.FurnishDTO

enum class Furnish {
    DESIGNER, NONE, FINE;

    fun toFurnishDTO(): FurnishDTO {
        return when (this) {
            DESIGNER -> FurnishDTO.DESIGNER
            NONE -> FurnishDTO.NONE
            FINE -> FurnishDTO.FINE
        }
    }
}



