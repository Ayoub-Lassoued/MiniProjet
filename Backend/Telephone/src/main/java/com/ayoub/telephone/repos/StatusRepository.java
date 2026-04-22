package com.ayoub.telephone.repos;
import org.springframework.data.jpa.repository.JpaRepository;


import org.springframework.web.bind.annotation.CrossOrigin;

import com.ayoub.telephone.entities.Statut;


@CrossOrigin("*")

public interface StatusRepository extends JpaRepository<Statut, Long> {


}

