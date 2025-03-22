package com.example.demo.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.Entities.Avfallspunkt;


@Repository
public interface AvfallspunktRepo extends JpaRepository<Avfallspunkt, Integer>{

  @Query("SELECT ap FROM Avfallspunkt ap JOIN ap.avfallspunktAvfallstyper apas WHERE apas.avfallstype.id = :avfallstypeId")
    List<Avfallspunkt> findAvfallspunkterByAvfallstype_id(@Param("avfallstypeId") int avfallstypeId);

}

