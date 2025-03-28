package com.example.demo.Repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entities.Resirkuleringslogg;


@Repository
public interface LoggRepo extends JpaRepository<Resirkuleringslogg, Integer>{
  //getAlleLoggerForBrukerMedId

  List<Resirkuleringslogg> findByBruker_id(int id);

  void save(int bruker_id, int avfall_id, int avfallspunkt_id, LocalDate tidspunktkastet);
}
