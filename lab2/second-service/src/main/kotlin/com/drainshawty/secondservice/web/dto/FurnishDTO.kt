package com.drainshawty.secondservice.web.dto

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
}


