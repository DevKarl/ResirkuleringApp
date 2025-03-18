package com.example.demo.Controllers;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entities.TestTable;
import com.example.demo.Repositories.TestTableRepository;


@RestController
@RequestMapping("/api")
public class Controller {

    @Autowired
    private TestTableRepository testTableRepository;

    @GetMapping("/testdata")
    public List<TestTable> getTestData() {
        return testTableRepository.findAll();
    }
    @PostMapping("/login")
    public String postLogin(@RequestBody String entity) {
        return entity;
    }
}
