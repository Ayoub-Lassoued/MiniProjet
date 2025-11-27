package com.ayoub.telephone.restControllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.ayoub.telephone.entities.Telephone;
import com.ayoub.telephone.service.TelephoneService;

@CrossOrigin // يسمح للـ Angular بالوصول
@RestController
@RequestMapping("/api") // رابط أبسط وواضح: http://localhost:8080/api/telephones
public class TelephoneRESTController {

    @Autowired
    private TelephoneService telephoneService;

    // جلب كل التليفونات
    @GetMapping
    public List<Telephone> getAllTelephone() {
        return telephoneService.getAllTelephone();
    }

    // جلب تليفون بالـ id
    @GetMapping("/{id}")
    public Telephone getTelephoneById(@PathVariable("id") Long id) {
        return telephoneService.getTelephone(id);
    }

   
    @PostMapping
    public Telephone createTelephone(@RequestBody Telephone telephone) {
        return telephoneService.saveTelephone(telephone);
    }

    // تعديل تليفون موجود
    @PutMapping
    public Telephone updateTelephone(@RequestBody Telephone telephone) {
        return telephoneService.updateTelephone(telephone);
    }

    // حذف تليفون بالـ id
    @DeleteMapping("/{id}")
    public void deleteTelephone(@PathVariable("id") Long id) {
        telephoneService.deleteTelephoneById(id);
    }

    // البحث عن تليفونات بالاسم
    @GetMapping("/search/{name}")
    public List<Telephone> searchTelephones(@PathVariable("name") String name) {
        return telephoneService.findByNomTel(name);
    }
 // جلب كل التليفونات حسب statut
    @GetMapping("/telephones/statuts/{idSat}")
    public List<Telephone> getTelephonesByStatut(@PathVariable Long idSat) {
        return telephoneService.findByStatutIdSat(idSat);
    }

   
}
