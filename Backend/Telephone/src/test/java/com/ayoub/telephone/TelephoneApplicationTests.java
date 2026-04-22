package com.ayoub.telephone;

import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.ayoub.telephone.entities.Statut;
import com.ayoub.telephone.entities.Telephone;
import com.ayoub.telephone.repos.TelephoneRepository;

@SpringBootTest
class TelephoneApplicationTests {

    @Autowired
    private TelephoneRepository telephoneRepository;

    @Test
    public void testCreateTelephone() {
        Telephone tel = new Telephone(
            "samsung A52",          
            "Bonne qualité",     
            1400.0,               
            new Date(),           
            "samsung@gmail.com" 
            
        );

        telephoneRepository.save(tel);
        System.out.println("Téléphone sauvegardé : " + tel);
    }
    @Test 
    public void testFindTelephone() {
    	Telephone T = telephoneRepository.findById(1l).get();
    	System.out.println(T);
    	
    }
    @Test
    public void testUpdateTelephone()
    {
    Telephone T = telephoneRepository.findById(1L).get();
    T.setPrixTel(1000.0);
    telephoneRepository.save(T);
    }
    @Test
    public void testDeleteTelephone()
    {
    telephoneRepository.deleteById(1L);;
    }

    @Test
    public void testListerTousTelephone()
    {
    List<Telephone> tels = telephoneRepository.findAll();
    for (Telephone T : tels)
    {
    System.out.println(T);
    }
    }
    @Test 
    public void testFindTelephoneByNom() {
    List<Telephone>	tels = telephoneRepository.findByNomTel(	
    		"Oppo A50");
    for (Telephone T :tels) {
    	  System.out.println(T);
    	
    }
    	
    	
    }
    @Test 
    public void testFindTelephoneByNomContains() {
    List<Telephone>	tels = telephoneRepository.findByNomTelContains(	
    		"A");
    for (Telephone T :tels) {
    	  System.out.println(T);
    	
    }
    	
    	
    }
    @Test 
    public void testFindTelephoneByNomPrix() {
    List<Telephone>	tels = telephoneRepository.findByNomPrix(	
    		"samsung A50",1500.0
    		);
    for (Telephone T :tels) {
    	  System.out.println(T);
    	
    }
    	
    	
    }
    @Test
    public void testfindByStatut()
    {
    Statut sat = new Statut();
    sat.setIdSat(2L);
    List<Telephone> tels = telephoneRepository.findByStatut(sat);
    for (Telephone T : tels)
    {
    System.out.println(T);
    }
    }
    @Test
    public void findByStatutIdSat()
    {
    List<Telephone> tels = telephoneRepository.findByStatutIdSat(1L);
    for (Telephone T : tels)
    {
    System.out.println(T);
    }
     }
    
    @Test
    public void testfindByOrderByNomTelAsc() {
        List<Telephone> tels = telephoneRepository.findByOrderByNomTelAsc();
        for (Telephone T : tels) {
            System.out.println(T);
        }
    }
    @Test
    public void testTrierTelephoneNomsPrix()
    {
    List<Telephone> tels = telephoneRepository.trierTelephoneNomsPrix();
    for (Telephone T : tels)
    {
    System.out.println(T);
    }
    }



    
    
}
