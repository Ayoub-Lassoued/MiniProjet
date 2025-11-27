package com.ayoub.telephone.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ayoub.telephone.entities.Statut;
import com.ayoub.telephone.entities.Telephone;
import com.ayoub.telephone.repos.TelephoneRepository;
@Service
public class TelephoneServiceempl implements TelephoneService{
	@Autowired
	TelephoneRepository telephoneRepository ;
	public Telephone saveTelephone(Telephone T) {
		return telephoneRepository.save(T);
	}

	@Override
	public Telephone updateTelephone(Telephone T) {
		return telephoneRepository.save(T);
	}

	@Override
	public void deleteTelephone(Telephone T) {
		telephoneRepository.delete(T);
		
	}

	@Override
	public void deleteTelephoneById(long id) {
		telephoneRepository.deleteById(id);
	}

	@Override
	public Telephone getTelephone(long id) {
		return telephoneRepository.findById(id).get();
	}

	@Override
	public List<Telephone> getAllTelephone() {
	
		return telephoneRepository.findAll();
	}

	@Override
	public List<Telephone> findByNomPrix(String nom, Double prix) {
		return telephoneRepository.findByNomPrix(nom, prix);
	}

	

	@Override
	public List<Telephone> findByStatutIdSat(Long id) {
		// TODO Auto-generated method stub
		return telephoneRepository.findByStatutIdSat(id);
	}

	@Override
	public List<Telephone> findByOrderByNomTelAsc() {
		// TODO Auto-generated method stub
		return telephoneRepository.findByOrderByNomTelAsc();
	}

	@Override
	public List<Telephone> trierTelephoneNomsPrix() {
		// TODO Auto-generated method stub
		return telephoneRepository.trierTelephoneNomsPrix();
	}

	@Override
	public List<Telephone> findByNomTel(String nom) {
		// TODO Auto-generated method stub
		return telephoneRepository.findByNomTel(nom);
	}

	@Override
	public List<Telephone> findByNomTelContains(String nom) {
		// TODO Auto-generated method stub
		return telephoneRepository.findByNomTelContains(nom);
	}
	@Override
	public List<Telephone> findByStatut(Statut statut){
		return telephoneRepository.findByStatut(statut);
		
	}

	
}







