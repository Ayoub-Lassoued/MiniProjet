package com.ayoub.telephone.entities;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
@Entity
public class Telephone {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long idtel ;
	private String nomTel ;
	private String desTel ;
	private Double prixTel ;
	private Date dateCreation ;
	private String emailtel ;
	@ManyToOne
	@JsonIgnoreProperties("telephones")
	private Statut statut ;
	
	
	
	
	
	public Telephone() {
		super();
	
	}
	
	
	
	public Telephone( String nomTel, String desTel, Double prixTel, Date dateCreation, String emailtel) {
		super();
	
		this.nomTel = nomTel;
		this.desTel = desTel;
		this.prixTel = prixTel;
		this.dateCreation = dateCreation;
		this.emailtel = emailtel;
	}



	public long getIdtel() {
		return idtel;
	}
	public void setIdtel(long idtel) {
		this.idtel = idtel;
	}
	public String getNomTel() {
		return nomTel;
	}
	public void setNomTel(String nomTel) {
		this.nomTel = nomTel;
	}
	public String getDesTel() {
		return desTel;
	}
	public void setDesTel(String desTel) {
		this.desTel = desTel;
	}
	public Double getPrixTel() {
		return prixTel;
	}
	public void setPrixTel(Double prixTel) {
		this.prixTel = prixTel;
	}
	public Date getDateCreation() {
		return dateCreation;
	}
	public void setDateCreation(Date dateCreation) {
		this.dateCreation = dateCreation;
	}
	public String getEmailtel() {
		return emailtel;
	}
	public void setEmailtel(String emailtel) {
		this.emailtel = emailtel;
	}



	@Override
	public String toString() {
		return "Telephone [idtel=" + idtel + ", nomTel=" + nomTel + ", desTel=" + desTel + ", prixTel=" + prixTel
				+ ", dateCreation=" + dateCreation + ", emailtel=" + emailtel + "]";
	}



	public Statut getStatut() {
		return statut;
	}



	public void setStatut(Statut statut) {
		this.statut = statut;
	}
	
	
	
	

}



