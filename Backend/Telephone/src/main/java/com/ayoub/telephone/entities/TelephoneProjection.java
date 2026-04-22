package com.ayoub.telephone.entities;

import org.springframework.data.rest.core.config.Projection;

@Projection(name="nomtel",types= {Telephone.class})
public interface TelephoneProjection {
	public String getNomTel();
}
