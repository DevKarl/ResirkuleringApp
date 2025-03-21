package com.example.demo.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.Entities.AvfallsType;

@Repository
public interface AvfallsTypeRepo extends JpaRepository<AvfallsType, Integer> {
  @Query("SELECT at FROM AvfallsType at JOIN at.avfallspunktAvfallstyper atav WHERE atav.avfallspunkt.id = :avfallsPunktId")
  List<AvfallsType> findAvfallsTyperByAvfallsPunktId(@Param("avfallsPunktId") int avfallsPunktId);
}
