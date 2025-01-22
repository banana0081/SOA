package com.drainshawty.firstservice.web.responses

import jakarta.xml.bind.annotation.XmlAccessType
import jakarta.xml.bind.annotation.XmlAccessorType
import jakarta.xml.bind.annotation.XmlElement
import jakarta.xml.bind.annotation.XmlRootElement

@XmlRootElement(name = "TotalRoomsResponse")
@XmlAccessorType(XmlAccessType.FIELD)
data class TotalRoomsResponse(
    @XmlElement(name = "totalRooms")
    var totalRooms: Int = 0
)