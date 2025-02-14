package com.drainshawty.firstservice.web.responses

import jakarta.xml.bind.annotation.XmlAccessType
import jakarta.xml.bind.annotation.XmlAccessorType
import jakarta.xml.bind.annotation.XmlElement
import jakarta.xml.bind.annotation.XmlRootElement

@XmlRootElement(name = "AverageTimeResponse")
@XmlAccessorType(XmlAccessType.FIELD)
data class AverageTimeResponse(
    @XmlElement(name = "averageTime")
    var averageTime: Double
)
