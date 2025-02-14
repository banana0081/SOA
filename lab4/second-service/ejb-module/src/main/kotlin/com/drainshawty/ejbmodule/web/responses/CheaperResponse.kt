package com.drainshawty.ejbmodule.web.responses

import jakarta.xml.bind.annotation.XmlAccessType
import jakarta.xml.bind.annotation.XmlAccessorType
import jakarta.xml.bind.annotation.XmlElement
import jakarta.xml.bind.annotation.XmlRootElement

@XmlRootElement(name = "Flat")
@XmlAccessorType(XmlAccessType.FIELD)
data class CheaperResponse(
    @XmlElement(name = "id")
    val id: Int? = null,

    @XmlElement(name = "name")
    val name: String? = null,

    @XmlElement(name = "price")
    val price: Int? = null
)
