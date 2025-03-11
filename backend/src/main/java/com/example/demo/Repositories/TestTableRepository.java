package com.example.demo.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entities.TestTable;

public interface TestTableRepository extends JpaRepository<TestTable, Integer> {
}