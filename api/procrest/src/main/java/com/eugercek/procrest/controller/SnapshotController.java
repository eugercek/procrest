package com.eugercek.procrest.controller;

import com.eugercek.procrest.data.entity.SnapshotEntity;
import com.eugercek.procrest.service.SnapshotService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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
        try {
            return svc.getById(id);
        } catch (Exception e) {

            // Spring captures this and returns somehow, good old magic
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "entity not found"
            );
        }
    }

    @PostMapping("")
    public SnapshotEntity newSnapshot(@RequestBody SnapshotEntity snapshot) {
        return svc.newSnapshot(snapshot.getName(), snapshot.getDescription());
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable int id) {
        try {
            svc.deleteSnapshot(id);
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "entity not found"
            );
        }
    }
}
