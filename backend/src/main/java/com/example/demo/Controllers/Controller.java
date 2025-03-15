package com.example.demo.Controllers;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.demo.Entities.TestTable;
import com.example.demo.Repositories.TestTableRepository;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api") // <-- må settes på alle controllers 
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
