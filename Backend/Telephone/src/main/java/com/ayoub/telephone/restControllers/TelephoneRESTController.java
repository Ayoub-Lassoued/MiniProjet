package com.ayoub.telephone.restControllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.ayoub.telephone.entities.Telephone;
import com.ayoub.telephone.service.TelephoneService;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class TelephoneRESTController {

    @Autowired
    private TelephoneService telephoneService;

    // GET ALL
    @RequestMapping(path = "all", method = RequestMethod.GET)
    public List<Telephone> getAllTelephones() {
        return telephoneService.getAllTelephone();
    }

    // GET BY ID
    @RequestMapping(value = "/getbyid/{id}", method = RequestMethod.GET)
    public Telephone getTelephoneById(@PathVariable("id") Long id) {
        return telephoneService.getTelephone(id);
    }

    // ADD
    @PostMapping("/addtel")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Telephone createTelephone(@RequestBody Telephone telephone) {
        return telephoneService.saveTelephone(telephone);
    }

    // UPDATE
    @PutMapping("/updatetel")
    public Telephone updateTelephone(@RequestBody Telephone telephone) {
        return telephoneService.updateTelephone(telephone);
    }

    // DELETE
    @DeleteMapping("/deltel/{id}")
    public void deleteTelephone(@PathVariable("id") Long id) {
        telephoneService.deleteTelephoneById(id);
    }

    // SEARCH BY NAME
    @GetMapping("/search/{name}")
    public List<Telephone> searchTelephones(@PathVariable String name) {
        return telephoneService.findByNomTel(name);
    }

    // BY STATUT
    @GetMapping("/telStats/{idSat}")
    public List<Telephone> getTelephonesByStatut(@PathVariable("idSat") Long idSat) {
        return telephoneService.findByStatutIdSat(idSat);
    }
}