package com.example.demo.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entities.Bruker;

@Repository
public interface BrukerRepo extends JpaRepository<Bruker, Integer> {
  Bruker findByBrukernavn(String brukernavn);
  List<Bruker> findByDelerstatTrue();
}
