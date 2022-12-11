package com.eugercek.procrest.controller;

import com.eugercek.procrest.data.entity.ProcessEntity;
import com.eugercek.procrest.service.ProcessService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("/procs")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProcessController {

    private final ProcessService svc;

    @GetMapping("")
    public Set<ProcessEntity> getAll() {
        return svc.generateCurrent();
    }
}
