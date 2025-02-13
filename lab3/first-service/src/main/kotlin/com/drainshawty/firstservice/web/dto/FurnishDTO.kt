package com.drainshawty.firstservice.web.dto

import com.drainshawty.firstservice.storage.furnish.Furnish
import jakarta.xml.bind.annotation.XmlEnum
import jakarta.xml.bind.annotation.XmlEnumValue

@XmlEnum
enum class FurnishDTO {

    @XmlEnumValue("designer")
    DESIGNER,

    @XmlEnumValue("none")
    NONE,

    @XmlEnumValue("fine")
    FINE;

    fun toFurnish(): Furnish {
        return when (this) {
            DESIGNER -> Furnish.DESIGNER
            NONE -> Furnish.NONE
            FINE -> Furnish.FINE
        }
    }
}


