package com.eugercek.procrest.controller;

import com.eugercek.procrest.data.entity.SnapshotEntity;
import com.eugercek.procrest.service.SnapshotService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/snapshots")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SnapshotController {

    private final SnapshotService svc;

    @GetMapping("")
    public List<SnapshotEntity> getAll() {
        return svc.getAll();
    }

    @GetMapping("/{id}")
    public SnapshotEntity getById(@PathVariable int id) {
        return svc.getById(id);
    }

    @PostMapping("")
    public SnapshotEntity newSnapshot(@RequestBody SnapshotEntity snapshot) {
        return svc.newSnapshot(snapshot.getName(), snapshot.getDescription());
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable int id) {
        svc.deleteSnapshot(id);
    }
}
