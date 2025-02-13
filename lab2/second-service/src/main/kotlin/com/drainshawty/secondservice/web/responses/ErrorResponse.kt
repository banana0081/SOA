package com.drainshawty.secondservice.web.responses

import jakarta.xml.bind.annotation.XmlAccessType
import jakarta.xml.bind.annotation.XmlAccessorType
import jakarta.xml.bind.annotation.XmlElement
import jakarta.xml.bind.annotation.XmlRootElement

@XmlRootElement(name = "Error")
@XmlAccessorType(XmlAccessType.FIELD)
data class ErrorResponse(
    @XmlElement(name = "error")
    val code: Int? = null,
    @XmlElement
    var message: String? = null,
)