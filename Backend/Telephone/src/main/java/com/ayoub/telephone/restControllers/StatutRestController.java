package com.ayoub.telephone.restControllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.ayoub.telephone.entities.Statut;
import com.ayoub.telephone.repos.StatusRepository;

@CrossOrigin(origins = "*")

@RestController
@RequestMapping("/api/statuts")
public class StatutRestController {

    @Autowired
    private StatusRepository statutRepository;

    // Ajoutez "/all" ici pour correspondre à Angular
    @GetMapping("/all")
    public List<Statut> getAllStatut() {
        return statutRepository.findAll();
    }

    @GetMapping("/getbyid/{id}")
    public Statut getById(@PathVariable("id") Long id) {
        return statutRepository.findById(id).orElse(null);
    }
    @PostMapping("/addstatut") // Harmonisation avec l'autre controller
    public Statut createStatut(@RequestBody Statut statut) {
        return statutRepository.save(statut);
    }
}
