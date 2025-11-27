package com.ayoub.telephone.restControllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.ayoub.telephone.entities.Statut;
import com.ayoub.telephone.repos.StatusRepository;

@CrossOrigin(origins = "*")
  // يسمح للـ Angular بالتواصل
@RestController
@RequestMapping("/api/statuts")  // URL نهائي
public class StatutRestController {

    @Autowired
    private StatusRepository statutRepository;

    // جلب كل الـ statuts
    @GetMapping
    public List<Statut> getAllStatut() {
        return statutRepository.findAll();
    }

    // جلب statut بالـ id
    @GetMapping("/{id}")
    public Statut getById(@PathVariable("id") Long id) {
        return statutRepository.findById(id).orElse(null); // لو مش موجود يرجع null
    }
    @PostMapping
    public Statut createStatut(@RequestBody Statut statut) {
        return statutRepository.save(statut);
    }

}
