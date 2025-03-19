package com.example.demo.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.Entities.Avfallspunkt;


@Repository
public interface AvfallspunktRepo extends JpaRepository<Avfallspunkt, Integer>{

  @Query("SELECT a FROM Avfallspunkt a JOIN a.avfallstyper avf WHERE avf.id = :id")
  List<Avfallspunkt> findByAvfallstype_Id(@Param("id") int id);
}
