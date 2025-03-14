package com.example.demo.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Avfall {
  

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  private String strekKode;

}
