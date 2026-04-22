package com.ayoub.telephone.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.ayoub.telephone.entities.Statut;
import com.ayoub.telephone.entities.Telephone;
@RepositoryRestResource(path = "api")
public interface TelephoneRepository extends JpaRepository<Telephone,Long> {
	
	 List<Telephone> findByNomTel(String nom);
	 List<Telephone> findByNomTelContains(String nom);
	 @Query("select T from Telephone T where T.nomTel like %?1 and T.prixTel > ?2")
	 List<Telephone> findByNomPrix (String nom, Double prix);
	 @Query("SELECT t FROM Telephone t WHERE t.statut=?1")
	 List<Telephone> findByStatut(Statut statut );
	 List<Telephone> findByStatutIdSat(Long id);
	 List<Telephone> findByOrderByNomTelAsc();
	 @Query("select T from Telephone T order by T.nomTel ASC, T.prixTel DESC")
	 List<Telephone> trierTelephoneNomsPrix ();

}
