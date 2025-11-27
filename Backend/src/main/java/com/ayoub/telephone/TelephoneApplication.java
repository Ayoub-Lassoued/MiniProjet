package com.ayoub.telephone;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import com.ayoub.telephone.entities.Statut;
import com.ayoub.telephone.entities.Telephone;



@SpringBootApplication
public class TelephoneApplication implements CommandLineRunner {

    @Autowired
    private RepositoryRestConfiguration repositoryRestConfiguration;

    public static void main(String[] args) {
        SpringApplication.run(TelephoneApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        // عرض الـ IDs لكل من Telephone و Statut
        repositoryRestConfiguration.exposeIdsFor(Telephone.class, Statut.class);
    }
}
