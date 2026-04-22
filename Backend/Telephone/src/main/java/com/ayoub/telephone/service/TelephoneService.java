package com.ayoub.telephone.service;

import java.util.List;



import com.ayoub.telephone.entities.Statut;
import com.ayoub.telephone.entities.Telephone;

public interface TelephoneService {
	Telephone saveTelephone(Telephone T);
	Telephone updateTelephone(Telephone T);
	void deleteTelephone(Telephone T);
	void deleteTelephoneById(long id);
	Telephone getTelephone(long id);
	 List<Telephone> findByNomPrix (String nom, Double prix);
	 List<Telephone> findByStatut(Statut statut);
	 List<Telephone>getAllTelephone();
	 List<Telephone> findByStatutIdSat(Long id);
	 List<Telephone> findByOrderByNomTelAsc();
	 List<Telephone> trierTelephoneNomsPrix ();
	
	 List<Telephone> findByNomTel(String nom);
	 List<Telephone> findByNomTelContains(String nom);
	 


}
